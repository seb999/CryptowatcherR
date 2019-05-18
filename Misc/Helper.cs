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
                item.SymbolShort = item.Symbol.Substring(0,item.Symbol.Length-baseMarket.ToString().Length);
            }
        }
    }
}