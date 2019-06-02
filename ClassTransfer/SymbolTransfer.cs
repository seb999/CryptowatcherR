
using System;
using System.Collections.Generic;

namespace cryptowatcherR.ClassTransfer
{
    public class SymbolTransfer
    {
        public string Symbol { get; set; }
        public string SymbolShort { get; set; }
        public double PriceChange { get; set; }
        public double PriceChangePercent { get; set; }
        public double PrevClosePrice { get; set; }
        public double LastPrice { get; set; }
        public double LastQty { get; set; }
        public double BidPrice { get; set; }
        public double BidQty { get; set; }
        public double AskPrice { get; set; }
        public double AskQty { get; set; }
        public double OpenPrice { get; set; }
        public double HighPrice { get; set; }
        public double LowPrice { get; set; }
        public double Volume { get; set; }
        public double QuoteVolume { get; set; }

         //Indicators
        public double Rsi { get; set; }
        public double Macd { get; set; }
        public double MacdSign { get; set; }
        public double MacdHist { get; set; }

        //Prediction
        public List<PredictionTransfer> Prediction { get; set; }
    }
}
