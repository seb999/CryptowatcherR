using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using cryptowatcherR.Misc;
using cryptowatcherR.ClassTransfer;
using Newtonsoft.Json;

namespace cryptowatcherR.Controllers
{
    [Route("api/[controller]")]
    public class BinanceMarketController : Controller
    {
        /// <summary>
        /// Return list of coin with last value for default page
        /// </summary>
        /// <param name="baseMarket">The base market : USDT or BNB or BTC</param>
        /// <returns></returns>
        [HttpGet("[action]/{baseMarket}")]
        public List<CoinTickerTransfer> GetCoinList(BaseMarket baseMarket)
        {
            Uri uriCoinList = new Uri("https://api.binance.com/api/v1/ticker/24hr");

            List<CoinTickerTransfer> coinList = new List<CoinTickerTransfer>();

            //FOR HOME
            string data = HttpHelper.GetApiData(uriCoinList);
            if (data != "")
            {
                coinList = JsonConvert.DeserializeObject<List<CoinTickerTransfer>>(data);
            }

             //FOR OFFICE
            // coinList = new List<CoinTickerTransfer>();
            // coinList.Add(new CoinTickerTransfer()
            // {
            //     Symbol = "BTCUSDT", Volume = 999999, LastPrice = 99999, HighPrice = 99999, LowPrice = 99999, OpenPrice = 99999, PriceChangePercent = 10,
            // });

            switch (baseMarket)
            {
                case BaseMarket.USDT:
                    coinList = coinList.Where(p => p.Symbol.Substring(p.Symbol.Length - 4) == BaseMarket.USDT.ToString()).Select(p => p).ToList();
                    break;
                case BaseMarket.BTC:
                    coinList = coinList.Where(p => p.Symbol.Substring(p.Symbol.Length - 3) == BaseMarket.BTC.ToString()).Select(p => p).ToList();
                    break;
                case BaseMarket.BNB:
                    coinList = coinList.Where(p => p.Symbol.Substring(p.Symbol.Length - 3) == BaseMarket.BNB.ToString()).Select(p => p).ToList();
                    break;
                default:
                    break;
            }

            //Shorten Symbol and add Prediction
            Misc.Helper.ShortenSymbol(ref coinList, baseMarket);
            AIController.CalculatePredictionDefaultModel(ref coinList);
            
            return coinList;
        }

        [HttpGet("[action]/{symbol}/{interval}")]
        public List<CoinTransfer> GetCoin(string symbol, string interval)
        {
            List<CoinTransfer> quotationHistory = new List<CoinTransfer>();
            string url = string.Format("https://api.binance.com/api/v1/klines?symbol={0}&interval={1}&limit=1000", symbol, interval);

            string payload = HttpHelper.GetApiData(new Uri(url));

            if (payload != "")
            {
                var result = JsonConvert.DeserializeObject<List<List<double>>>(payload);

                foreach (var item in result)
                {
                    CoinTransfer newQuotation = new CoinTransfer()
                    {
                        OpenTime = item[0],
                        Open = item[1],
                        High = item[2],
                        Low = item[3],
                        Close = item[4],
                        Volume = item[5],
                        CloseTime = item[6],
                        QuoteAssetVolume = item[7],
                        NumberOfTrades = item[8],
                        BuyBaseAssetVolume = item[9],
                        BuyQuoteAssetVolume = item[10],
                        Ignore = item[11],
                    };
                    quotationHistory.Add(newQuotation);
                }
            }

            //Add Indicators to the list
            TradeIndicator.CalculateIndicator(ref quotationHistory);

            return quotationHistory;
        }

        /// <summary>
        /// Get last quotation of a coin with indicators
        /// </summary>
        /// <param name="symbol">The symbol (ex : BTCUSDT)</param>
        /// <returns>The CoinTickerTransfer</returns>
        public CoinTickerTransfer GetCoinLastValue(string symbol)
        {
            string url = string.Format("https://api.binance.com/api/v1/ticker/24hr?symbol={0}", symbol);
            string payload = HttpHelper.GetApiData(new Uri(url));
            CoinTickerTransfer coinLastValue = new CoinTickerTransfer();
             if (payload != "")
            {
                coinLastValue = JsonConvert.DeserializeObject<CoinTickerTransfer>(payload);
            }

            //Add indicator RSI / MACD
            CoinTransfer ct = CalculateIndicator(symbol, "2h");
            coinLastValue.RSI = ct.RSI;
            coinLastValue.MACD = ct.MACD;
            coinLastValue.MACDSign = ct.MACDSign;
            coinLastValue.MACDHist = ct.MACDHist;

            return coinLastValue;
        }

        #region Indicator functions

        [HttpGet("[action]/{symbol}/{interval}")]
        public CoinTransfer CalculateIndicator(string symbol, string interval)
        {
            List<CoinTransfer> coinList = GetCoin(symbol, interval);
            TradeIndicator.CalculateIndicator(ref coinList);
            return coinList.Last();
        }

        #endregion
    }

}