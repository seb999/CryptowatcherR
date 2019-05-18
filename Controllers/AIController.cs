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
            SymbolTransfer coinTicker = bmC.GetSymbol(symbol);

            //3 - Iterate throw model and fire prediction
            foreach (var modelPath in modelPathList)
            {
                PredictionTransfer prediction = new PredictionTransfer();
                
                var fromIndex = Path.GetFileName(modelPath).IndexOf("-") + 1;
                var toIndex = Path.GetFileName(modelPath).Length - fromIndex - 4;
                prediction.ModelName = Path.GetFileName(modelPath).Substring(fromIndex, toIndex);
                
                prediction.FuturPrice = Math.Round(CalculatePrediction(coinTicker, modelPath).FuturePrice, 2);
                predictionList.Add(prediction);
            }

            return predictionList;
        }

        private CoinPrediction CalculatePrediction(SymbolTransfer coin, string modelPath)
        {
            //Load model
            ITransformer loadedModel = LoadModel(modelPath);

            //Predict future price
            return PredictFuturePrice(coin, loadedModel);
        }

        /// <summary>
        ///  Calculate prediction with default Model (Fast tree for home page)
        /// </summary>
        /// <param name="coinList">The list of coinTicketTransfer</param>
        /// <returns>void</returns>
        internal static void CalculatePredictionDefaultModel(ref List<SymbolTransfer> coinList)
        {
            foreach (var coin in coinList)
            {
                if (CheckModelExist(coin.Symbol) != true) continue;

                string modelPath = "AIModel/" + coin.Symbol + "-Fast Tree.zip";

                //Load model
                ITransformer loadedModel = LoadModel(modelPath);

                //Predict future price
                coin.FuturePrice = PredictFuturePrice(coin, loadedModel).FuturePrice;
            }
        }

        private static bool CheckModelExist(string symbol)
        {
            var rootFolder = Environment.CurrentDirectory + "/AIModel/";
            return Directory.GetFiles(rootFolder, symbol + "*", SearchOption.AllDirectories).Length > 0 ? true : false;
        }

        private static ITransformer LoadModel(string modelPath)
        {
            MLContext mlContext = new MLContext();

            ITransformer loadedModel;
            using (var stream = new FileStream(modelPath, FileMode.Open, FileAccess.Read, FileShare.Read))
            {
                loadedModel = mlContext.Model.Load(stream);
            }
            return loadedModel;
        }

        private static CoinPrediction PredictFuturePrice(SymbolTransfer coin, ITransformer model)
        {
            MLContext mlContext = new MLContext();
            var predictionFunction = mlContext.Model.CreatePredictionEngine<CoinData, CoinPrediction>(model);
            CoinPrediction prediction = predictionFunction.Predict(new CoinData
            {
                Volume = (float)coin.Volume,
                Open = (float)coin.OpenPrice,
                RSI = (float)coin.RSI,
                MACDHist = (float)coin.MACDHist,
            });

            return prediction;
        }
    }
}