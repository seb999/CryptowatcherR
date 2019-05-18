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
                    quotationList[i+beginIndex].RSI = Math.Round(rsiValues[i], 2);
                }
            }

            //Calculate MACD
            var status = Core.MacdFix(0, data.Length - 1, data, 2, out beginIndex, out outNBElements, outMACD, outMACDSignal, outMACDHist);
            if (status == Core.RetCode.Success && outNBElements > 0)
            {
                for (int i = 0; i < outNBElements; i++)
                {
                    quotationList[i+beginIndex].MACD = Math.Round(outMACD[i],2);
                    quotationList[i+beginIndex].MACDHist = Math.Round(outMACDHist[i],2);
                    quotationList[i+beginIndex].MACDSign = Math.Round(outMACDSignal[i],2);
                }                 
            }
        }
    }
}