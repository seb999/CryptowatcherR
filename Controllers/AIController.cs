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

namespace cryptowatcherR.Controllers
{
    public class BevrageData
        {
            [LoadColumn(0)]
            public string FullName { get; set; }

            [LoadColumn(1)]
            public float Price { get; set; }

            [LoadColumn(2)]
            public float Volume { get; set; }

            [LoadColumn(3)]
            public string Type { get; set; }

            [LoadColumn(4)]
            public string Country { get; set; }
        }

        public class BevragePrediction
        {
            [ColumnName("Score")]
            public float Price { get; set; }
        }


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
                var fromIndex = Path.GetFileName(modelPath).IndexOf("_")+1;
                var toIndex = Path.GetFileName(modelPath).Length-fromIndex-4;

                prediction.ModelName = Path.GetFileName(modelPath).Substring(fromIndex, toIndex);
                prediction.FuturPrice = Math.Round(CalculatePrediction(coinTicker, modelPath).Price, 2);
                prediction.Metrics = 20;
                
                predictionList.Add(prediction);
            }

            return predictionList;
        }

        private BevragePrediction CalculatePrediction(CoinTickerTransfer coinTicker, string modelPath)
        {
            MLContext mlContext = new MLContext();

            ITransformer loadedModel;
            using (var stream = new FileStream(modelPath, FileMode.Open, FileAccess.Read, FileShare.Read))
            {
                loadedModel = mlContext.Model.Load(stream);
            }

            var predictionFunction = mlContext.Model.CreatePredictionEngine<BevrageData, BevragePrediction>(loadedModel);
            BevragePrediction result = predictionFunction.Predict(new BevrageData { FullName = "Cheap Lager", Type = "Öl", Volume = 500, Country = "Sverige" });
        
            //var metrics = mlContext.Regression.Evaluate(result, "Label", "Score");

            return result;
        }
    }
}