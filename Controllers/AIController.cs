using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using cryptowatcherR.Misc;
using cryptowatcherR.ClassTransfer;
using Newtonsoft.Json;
using System.IO;
using Microsoft.ML;
using Microsoft.ML.Data;
using static CryptowatcherR.Misc.Prediction;

namespace cryptowatcherR.Controllers
{

    [Route("api/[controller]")]
    public class AIController : Controller
    {
        /// <summary>
        /// Check if AI model files exist for symbol
        /// </summary>
        /// <param name="symbol">The symbol name</param>
        /// <returns>The booleen value true / false</returns>
        [HttpGet("[action]/{symbol}")]
        public bool CheckModelExist(string symbol)
        {
            //l'un ou l'autre a tester sous MAC
            var rootFolder = Environment.CurrentDirectory + "\\AIModel\\";
            //var rootFolder = Directory.Exists(rootFolder + "\\AIModel\\" + symbol);

            return Directory.GetFiles(rootFolder, symbol + "*", SearchOption.AllDirectories).Length > 0 ? true : false;
        }

        [HttpGet("[action]/{symbol}")]
        public List<PredictionTransfer> GetPrediction(string symbol)
        {
            List<PredictionTransfer> predictionList = new List<PredictionTransfer>();

            //1 - List models available for symbol
            var rootFolder = Environment.CurrentDirectory + "/AIModel/";
            var modelPathList = Directory.GetFiles(rootFolder, symbol + "*", SearchOption.AllDirectories);

            if (modelPathList.Length == 0)
                return predictionList;

            //2 - Get Last data from Binance API
            BinanceMarketController bmC = new BinanceMarketController();
            CoinTickerTransfer coinTicker = bmC.GetCoinLastValue(symbol);

            //3 - Iterate throw model and fire prediction
            foreach (var modelPath in modelPathList)
            {
                PredictionTransfer prediction = new PredictionTransfer();
                var fromIndex = Path.GetFileName(modelPath).IndexOf("_") + 1;
                var toIndex = Path.GetFileName(modelPath).Length - fromIndex - 4;

                prediction.ModelName = Path.GetFileName(modelPath).Substring(fromIndex, toIndex);
                prediction.FuturPrice = Math.Round(CalculatePrediction(coinTicker, modelPath).Change, 2);
                predictionList.Add(prediction);
            }

            return predictionList;
        }

        private CoinPrediction CalculatePrediction(CoinTickerTransfer coinTicker, string modelPath)
        {
            MLContext mlContext = new MLContext();

            // STEP 5: We load the model 
            ITransformer loadedModel;
            using (var stream = new FileStream(modelPath, FileMode.Open, FileAccess.Read, FileShare.Read))
            {
                loadedModel = mlContext.Model.Load(stream);
            }

            var predictionFunction = mlContext.Model.CreatePredictionEngine<CoinData, CoinPrediction>(loadedModel);
            CoinPrediction result = predictionFunction.Predict(new CoinData
            {
                Volume = (float)coinTicker.Volume,
                Open = (float)coinTicker.OpenPrice,
                RSI = (float)coinTicker.RSI,
                MACDHist = (float)coinTicker.MACDHist,
            });

            return result;
        }
    }
}