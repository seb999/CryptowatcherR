using System;
using System.Collections.Generic;
using System.Net.Http;
using System.Net.Http.Headers;
using cryptowatcherR.ClassTransfer;

namespace cryptowatcherR.Misc
{
    public static class Helper
    {
        public static void ShortenSymbol(ref List<SymbolTransfer> coinList)
        {
            foreach (var item in coinList)
            {
                item.SymbolShort = item.Symbol;

                if (item.Symbol.Substring(item.Symbol.Length - 3) == BaseMarket.ETH.ToString())
                {
                    item.SymbolShort = item.Symbol.Substring(0, item.Symbol.Length - 3) + "/" + BaseMarket.ETH.ToString();
                }

                if (item.Symbol.Substring(item.Symbol.Length - 3) == BaseMarket.BNB.ToString())
                {
                    item.SymbolShort = item.Symbol.Substring(0, item.Symbol.Length - 3) + "/" + BaseMarket.BNB.ToString();
                }
                if (item.Symbol.Substring(item.Symbol.Length - 3) == BaseMarket.BTC.ToString())
                {
                    item.SymbolShort = item.Symbol.Substring(0, item.Symbol.Length - 3) + "/" + BaseMarket.BTC.ToString();
                }
                if (item.Symbol.Substring(item.Symbol.Length - 4) == BaseMarket.USDT.ToString())
                {
                    item.SymbolShort = item.Symbol.Substring(0, item.Symbol.Length - 4) + "/" + BaseMarket.USDT.ToString();
                }
            }
        }

        public static void ShortenSymbol(ref SymbolTransfer symbol)
        {

            symbol.SymbolShort = symbol.Symbol;

            if (symbol.Symbol.Substring(symbol.Symbol.Length - 3) == BaseMarket.ETH.ToString())
            {
                symbol.SymbolShort = symbol.Symbol.Substring(0, symbol.Symbol.Length - 3) + "/" + BaseMarket.ETH.ToString();
            }

            if (symbol.Symbol.Substring(symbol.Symbol.Length - 3) == BaseMarket.BNB.ToString())
            {
                symbol.SymbolShort = symbol.Symbol.Substring(0, symbol.Symbol.Length - 3) + "/" + BaseMarket.BNB.ToString();
            }
            if (symbol.Symbol.Substring(symbol.Symbol.Length - 3) == BaseMarket.BTC.ToString())
            {
                symbol.SymbolShort = symbol.Symbol.Substring(0, symbol.Symbol.Length - 3) + "/" + BaseMarket.BTC.ToString();
            }
            if (symbol.Symbol.Substring(symbol.Symbol.Length - 4) == BaseMarket.USDT.ToString())
            {
                symbol.SymbolShort = symbol.Symbol.Substring(0, symbol.Symbol.Length - 4) + "/" + BaseMarket.USDT.ToString();
            }

        }

    }
}