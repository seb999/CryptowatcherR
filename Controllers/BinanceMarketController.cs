using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using cryptowatcherR.Misc;
using cryptowatcherR.ClassTransfer;
using Newtonsoft.Json;
using cryptowatcherR.Model;
using Microsoft.EntityFrameworkCore;

namespace cryptowatcherR.Controllers
{
    [Route("api/[controller]")]
    public class BinanceMarketController : Controller
    {
         private readonly AppDbContext appDbContext;

        public BinanceMarketController([FromServices] AppDbContext context)
        {
             appDbContext = context;
        }
        /// <summary>
        /// Return list of coin with last value for default page
        /// </summary>
        /// <param name="baseMarket">The base market : USDT or BNB or BTC</param>
        /// <returns></returns>
        [HttpGet("[action]/{baseMarket}")]
        public List<SymbolTransfer> GetSymbolList(BaseMarket baseMarket)
        {
            Uri apiUrl = new Uri("https://api.binance.com/api/v1/ticker/24hr");

            // //Get data from Binance API
            List<SymbolTransfer> coinList = HttpHelper.GetApiData<List<SymbolTransfer>>(apiUrl);

             //Shorten Symbol
            Misc.Helper.ShortenSymbol(ref coinList);

            //Save symbolList in db
            SaveNewCurrency(coinList);

            //Filter result
            if (baseMarket == BaseMarket.BNB ||  baseMarket == BaseMarket.BTC || baseMarket == BaseMarket.USDT)
            {
                coinList = coinList.Where(p => p.Symbol.Substring(p.Symbol.Length - baseMarket.ToString().Length) == baseMarket.ToString()).Select(p => p).ToList();
                //Remove obsolete coins
                coinList = coinList.Where(p=>p.Volume != 0 && p.OpenPrice != 0).Select(p=>p).ToList();
            }

             //FOR OFFICE
            //  List<SymbolTransfer> coinList = new List<SymbolTransfer>();
            // coinList.Add(new SymbolTransfer()
            // {
            //     Symbol = "BTCUSDT", Volume = 999999, LastPrice = 99999, HighPrice = 99999, LowPrice = 99999, OpenPrice = 99999, PriceChangePercent = 10,
            // });
            // coinList.Add(new SymbolTransfer()
            // {
            //     Symbol = "ETHUSDT", Volume = 999999, LastPrice = 99999, HighPrice = 99999, LowPrice = 99999, OpenPrice = 99999, PriceChangePercent = 10,
            // });
            //  coinList.Add(new SymbolTransfer()
            // {
            //     Symbol = "ADAUSDT", Volume = 999999, LastPrice = 99999, HighPrice = 99999, LowPrice = 99999, OpenPrice = 99999, PriceChangePercent = 10,
            // });

           

            //Add indicator for top 5
            coinList.Take(1).Where(p=>GetTop10Indicator(p)).Select(p=>p).ToList();
            
            return coinList;
        }

        private bool GetTop10Indicator(SymbolTransfer symbolTransfer)
        {
            symbolTransfer.Prediction = new List<PredictionTransfer>();
            QuotationTransfer ct = GetIndicator(symbolTransfer.Symbol, "1d");
            symbolTransfer.Rsi = ct.Rsi;
            symbolTransfer.Macd = ct.Macd;
            symbolTransfer.MacdSign = ct.MacdSign;
            symbolTransfer.MacdHist = ct.MacdHist;
            symbolTransfer.Prediction.Add(new PredictionTransfer(){FuturePrice = ct.FuturePrice });
            return true;
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

            //Add Default Prediction
            var result = quotation.Last();
            AIController.CalculatePredictionDefaultModel(symbol, ref result);

            return result;
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

        [HttpGet("[action]/{symbol}/{interval}")]
        public SymbolTransfer GetSymbolData(string symbol, string interval)
        {
            string apiUrl = string.Format("https://api.binance.com/api/v1/ticker/24hr?symbol={0}", symbol);

            //Get data from Binance API
            SymbolTransfer coin = HttpHelper.GetApiData<SymbolTransfer>(new Uri(apiUrl));

            //Add indicator RSI / MACD
            QuotationTransfer ct = GetIndicator(symbol, "1d");
            coin.Rsi = ct.Rsi;
            coin.Macd = ct.Macd;
            coin.MacdSign = ct.MacdSign;
            coin.MacdHist = ct.MacdHist;

            //Add Prediction sub list
            AIController aiController = new AIController();
            coin.Prediction = aiController.GetPrediction(symbol, coin);

            return coin;
        }
    
        [HttpGet]
        [HttpGet("[action]")]
        public List<string> GetNewCurrencyList()
        {
            try
            {
                //List new currency that are not older than 7 days 
                List<Currency> localCurrencyList = 
                    appDbContext.Currency.Where(p=>DateTime.Compare(p.DateAdded.AddDays(7),DateTime.Now) >0 ).Select(p=>p).ToList();

                return localCurrencyList.Select(p=>p.CurrencyName).ToList(); 
            }
            catch (System.Exception)
            {
                //use Serilog to store error in file here
                return new List<string>();
            }
        }

         private void SaveNewCurrency(List<SymbolTransfer> coinList)
        {
            //List of currency in local db
            List<Currency> localCurrencyList = appDbContext.Currency.Select(p=>p).ToList();

                foreach (var item in coinList)
                {    
                    if(localCurrencyList.Where(p=>p.CurrencyName == item.SymbolShort).Select(p=>p.Id).FirstOrDefault() == 0)
                    {
                        appDbContext.Currency.Add(new Currency() { 
                           // CurrencyId = item..Id , 
                            CurrencyName = item.SymbolShort,
                            DateAdded = DateTime.Now});
                    }
                }
                appDbContext.SaveChanges();
            }
        }
    }