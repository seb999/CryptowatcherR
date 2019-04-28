using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using cryptowatcherR.Misc;
using Newtonsoft.Json;

namespace cryptowatcherR.Controllers
{
    [Route("api/[controller]")]
    public class BinanceMarketController : Controller
    {
        private Uri uriGetAllCrypto = new Uri("https://api.binance.com/api/v1/ticker/24hr");

        [HttpGet("[action]/{baseMarket}")]
        public IEnumerable<BinanceCryptoTransfer> GetCryptoList(BaseMarket baseMarket)
        {
            List<BinanceCryptoTransfer> crypto24hrList = new List<BinanceCryptoTransfer>();
            string poloniexApiData = HttpHelper.GetApiData(uriGetAllCrypto);

            if (poloniexApiData != "")
            {
                crypto24hrList = JsonConvert.DeserializeObject<List<BinanceCryptoTransfer>>(poloniexApiData);
            }

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
                crypto.Symbol = Misc.Helper.ShortenSymbol(crypto.Symbol, baseMarket);
            }

            return crypto24hrList;
        }
    }

}