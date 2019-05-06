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
        [HttpGet("[action]/{baseMarket}")]
        public List<CoinTickerTransfer> GetCoinList(BaseMarket baseMarket)
        {
            Uri uriCoinList = new Uri("https://api.binance.com/api/v1/ticker/24hr");

            List<CoinTickerTransfer> crypto24hrList = new List<CoinTickerTransfer>();

            string data = HttpHelper.GetApiData(uriCoinList);
            if (data != "")
            {
                crypto24hrList = JsonConvert.DeserializeObject<List<CoinTickerTransfer>>(data);
            }

            //FOR OFFICE
            // crypto24hrList = new List<BinanceCryptoTransfer>();
            // crypto24hrList.Add(new BinanceCryptoTransfer()
            // {
            //     Symbol = "BTCUSDT", Volume = 999999, LastPrice = 99999, HighPrice = 99999, LowPrice = 99999, OpenPrice = 99999, PriceChangePercent = 10,
            // });


            switch (baseMarket)
            {
                case BaseMarket.USDT:
                    crypto24hrList = crypto24hrList.Where(p => p.Symbol.Substring(p.Symbol.Length - 4) == BaseMarket.USDT.ToString()).Select(p => p).ToList();
                    break;
                case BaseMarket.BTC:
                    crypto24hrList = crypto24hrList.Where(p => p.Symbol.Substring(p.Symbol.Length - 3) == BaseMarket.BTC.ToString()).Select(p => p).ToList();
                    break;
                case BaseMarket.BNB:
                    crypto24hrList = crypto24hrList.Where(p => p.Symbol.Substring(p.Symbol.Length - 3) == BaseMarket.BNB.ToString()).Select(p => p).ToList();
                    break;
                default:
                    break;
            }

            foreach (var crypto in crypto24hrList)
            {
                crypto.SymbolShort = Misc.Helper.ShortenSymbol(crypto.Symbol, baseMarket);
            }

            return crypto24hrList;
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

            return quotationHistory;
        }

        [HttpGet("[action]/{symbol}/{interval}")]
        public double GetRSI(string symbol, string interval)
        {
            List<CoinTransfer> coinList = GetCoin(symbol, interval);
            TradeIndicator.CalculateRsiList(14, ref coinList);
            return coinList[0].RSI;
        }

        [HttpGet("[action]/{symbol}/{interval}")]
        public CoinTransfer GetMACD(string symbol, string interval)
        {
            List<CoinTransfer> coinList = GetCoin(symbol, interval);
            TradeIndicator.CalculateMacdList(ref coinList);
            return coinList[0];
        }
    }

}