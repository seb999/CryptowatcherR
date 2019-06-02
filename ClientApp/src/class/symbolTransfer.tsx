import { predictionTransfer } from "./predictionTransfer";

export interface symbolTransfer{
    symbol : string;
    symbolShort : string;
    priceChangePercent : number;
    highPrice : number;
    lowPrice : number;
    lastPrice : number;
    volume : number;
    rsi : number;
    macd : number;
    macdHist : number;
    macdSign : number;
    prediction: Array<predictionTransfer>;
}