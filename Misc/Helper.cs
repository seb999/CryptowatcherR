using System;
using System.Net.Http;
using System.Net.Http.Headers;

namespace cryptowatcherR.Misc
{
    public static class Helper{
        public static string ShortenSymbol(string symbol, BaseMarket baseMarket)
        {
            return symbol.Substring(0,symbol.Length-baseMarket.ToString().Length);
        }
    }
}