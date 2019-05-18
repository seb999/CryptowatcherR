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
        public List<SymbolTransfer> GetSymbolList(BaseMarket baseMarket)
        {
            Uri apiUrl = new Uri("https://api.binance.com/api/v1/ticker/24hr");

            //Get data from Binance API
            List<SymbolTransfer> coinList = HttpHelper.GetApiData<List<SymbolTransfer>>(apiUrl);

            //Filter result
            coinList = coinList.Where(p => p.Symbol.Substring(p.Symbol.Length - baseMarket.ToString().Length) == baseMarket.ToString()).Select(p => p).ToList();

            //Shorten Symbol and add Prediction
            Misc.Helper.ShortenSymbol(ref coinList, baseMarket);

            //Add Prediction
            AIController.CalculatePredictionDefaultModel(ref coinList);

            return coinList;
        }

        [HttpGet("[action]/{symbol}/{interval}")]
        public List<QuotationTransfer> GetChartData(string symbol, string interval)
        {
            List<QuotationTransfer> quotation = new List<QuotationTransfer>();
            string apiUrl = string.Format("https://api.binance.com/api/v1/klines?symbol={0}&interval={1}&limit=1000", symbol, interval);

            //Get data from Binance API
            List<List<double>> coinQuotation = HttpHelper.GetApiData<List<List<double>>>(new Uri(apiUrl));

            foreach (var item in coinQuotation)
            {
                QuotationTransfer newQuotation = new QuotationTransfer()
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
                quotation.Add(newQuotation);
            }

            //Add Indicators to the list
            TradeIndicator.CalculateIndicator(ref quotation);

            return quotation;
        }

        /// <summary>
        /// Get last quotation of a coin with indicators
        /// </summary>
        /// <param name="symbol">The symbol (ex : BTCUSDT)</param>
        /// <returns>The CoinTickerTransfer</returns>
        [HttpGet("[action]/{symbol}")]
        public SymbolTransfer GetSymbol(string symbol)
        {
            string apiUrl = string.Format("https://api.binance.com/api/v1/ticker/24hr?symbol={0}", symbol);

            //Get data from Binance API
            SymbolTransfer coin = HttpHelper.GetApiData<SymbolTransfer>(new Uri(apiUrl));

            //Add indicator RSI / MACD
            QuotationTransfer ct = GetIndicator(symbol, "1d");

            coin.RSI = ct.RSI;
            coin.MACD = ct.MACD;
            coin.MACDSign = ct.MACDSign;
            coin.MACDHist = ct.MACDHist;

            return coin;
        }

        [HttpGet("[action]/{symbol}/{interval}")]
        public QuotationTransfer GetIndicator(string symbol, string interval)
        {
            List<QuotationTransfer> quotation = new List<QuotationTransfer>();
            string apiUrl = string.Format("https://api.binance.com/api/v1/klines?symbol={0}&interval={1}&limit=1000", symbol, interval);

            //Get data from Binance API
            List<List<double>> coinQuotation = HttpHelper.GetApiData<List<List<double>>>(new Uri(apiUrl));

            foreach (var item in coinQuotation)
            {
                QuotationTransfer newQuotation = new QuotationTransfer()
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
                quotation.Add(newQuotation);
            }

            //Add Indicators to the list
            TradeIndicator.CalculateIndicator(ref quotation);
            return quotation.Last();
        }
    }

}