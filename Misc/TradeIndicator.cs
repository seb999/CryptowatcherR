using System;
using System.Collections.Generic;
using System.Linq;
using TicTacTec.TA.Library;
using cryptowatcherR.ClassTransfer;

namespace cryptowatcherR.Misc
{
    public static class TradeIndicator{

         public static void CalculateIndicator(ref List<QuotationTransfer> quotationList)
        {
            var data = quotationList.Select(p => p.Close).ToArray();
            int beginIndex;
            int outNBElements;
            double[] rsiValues = new double[data.Length];
            double[] outMACD = new double[data.Length];
            double[] outMACDSignal = new double[data.Length];
            double[] outMACDHist = new double[data.Length];

            //Calculate RSI
            var returnCode = Core.Rsi(0, data.Length - 1, data, 14, out beginIndex, out outNBElements, rsiValues);
            if (returnCode == Core.RetCode.Success && outNBElements > 0)
            {
                for (int i = 0; i <= outNBElements-1; i++)
                {
                    quotationList[i+beginIndex].Rsi = Math.Round(rsiValues[i], 2);
                }
            }

            //Calculate MACD
            var status = Core.MacdFix(0, data.Length - 1, data, 2, out beginIndex, out outNBElements, outMACD, outMACDSignal, outMACDHist);
            if (status == Core.RetCode.Success && outNBElements > 0)
            {
                for (int i = 0; i < outNBElements; i++)
                {
                    quotationList[i+beginIndex].Macd = outMACD[i]>1 ? Math.Round(outMACD[i],3) : Math.Round(outMACD[i],6);
                    quotationList[i+beginIndex].MacdHist = Math.Abs(outMACDHist[i])>1 ? Math.Round(outMACDHist[i],3) : Math.Round(outMACDHist[i],6);
                    quotationList[i+beginIndex].MacdSign = outMACDSignal[i]>1 ? Math.Round(outMACDSignal[i],3) : Math.Round(outMACDSignal[i],6);
                }                 
            }
        }
    }
}