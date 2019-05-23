using System;
using System.Collections.Generic;
using System.Net.Http;
using System.Net.Http.Headers;
using cryptowatcherR.ClassTransfer;

namespace cryptowatcherR.Misc
{
    public static class Helper{
        public static void ShortenSymbol(ref List<SymbolTransfer> coinList, BaseMarket baseMarket)
        {
            foreach (var item in coinList)
            {
                if(item.Symbol.Substring(item.Symbol.Length-3) == BaseMarket.BNB.ToString()
                ||item.Symbol.Substring(item.Symbol.Length-3) == BaseMarket.BTC.ToString())
                {
                    item.SymbolShort = item.Symbol.Substring(0, item.Symbol.Length-3) + "/" + baseMarket.ToString();
                }
                if(item.Symbol.Substring(item.Symbol.Length-4) == BaseMarket.USDT.ToString())
                {
                    item.SymbolShort = item.Symbol.Substring(0, item.Symbol.Length-4) + "/" + baseMarket.ToString();
                }
            }
        }
    }
}