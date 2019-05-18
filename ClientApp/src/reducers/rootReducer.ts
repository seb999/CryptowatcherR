import { coinTickerTransfer } from '../class/coinTickerTransfer'
import { coinTransfer } from '../class/coinTransfer'
import { string, number, any } from 'prop-types';

const initState = {
  symbolList: new Array<coinTickerTransfer>(),
  symbolListInitial: new Array<coinTickerTransfer>(),
  symbol: any,

  coin: new Array<coinTransfer>(),
  indicatorTransfer: any,
  prediction: [] as any,

  rsi: number,
  macd: number,
  macdSign: number,
  macdHist: number,
  priceChangePercent: 0,
  volume: number,
  lastPrice: number,
}

const rootReducer = (state = initState, action: any) => {
  const newState = { ...state };

  switch (action.type) {
    case "AI_GET_PREDICTION":
      newState.prediction = action.payload;
      return newState

    case "BINANCE_SYMBOL_LIST":
      newState.symbolList = action.payload;
      newState.symbolListInitial = action.payload;
      return newState;

    case "BINANCE_SYMBOL":
      newState.rsi = action.payload.rsi;
      newState.macdHist = action.payload.macdHist;
      newState.lastPrice = action.payload.lastPrice;
      newState.priceChangePercent = action.payload.priceChangePercent;
      return newState;

    //We extract the last RSI, MACD, Volume, Last price from last item of the data instead of doing it in UI
    case "BINANCE_CHART_DATA":
      newState.coin = action.payload;
      return newState;

    // Return RSI and MACD for Market page
    case "BINANCE_SYMBOL_INDICATOR":
      var indexSymbol = newState.symbolList.findIndex(p => p.symbol.toLowerCase() == action.payload.symbol.toLowerCase());
      newState.symbolList[indexSymbol].rsi = action.payload.data.rsi;
      newState.symbolList[indexSymbol].MACD = action.payload.data.macd;
      newState.symbolList[indexSymbol].MACDHist = action.payload.data.macdHist;
      newState.symbolList[indexSymbol].MACDSign = action.payload.data.macdSign;
      newState.symbolList = newState.symbolList.slice(0, newState.symbolList.length);
      return newState

    case "BINANCE_SYMBOL_LIST_FILTER":
      newState.symbolList = newState.symbolListInitial;
      newState.symbolList = newState.symbolList.filter(p => p.symbol.toLowerCase().substr(0, action.payload.length) == action.payload.toLowerCase());
      return newState;

    case "BINANCE_SYMBOL_LIST_SORT":
      switch (action.payload.columnName) {
        case "symbol":
          if (action.payload.sortDirection > 0)
            newState.symbolList = newState.symbolList.sort((n1, n2) => (n1.symbol < n2.symbol) ? 1 : -1).slice(0, newState.symbolList.length);
          if (action.payload.sortDirection < 0)
            newState.symbolList = newState.symbolList.sort((n1, n2) => (n1.symbol > n2.symbol) ? 1 : -1).slice(0, newState.symbolList.length);
          break;
        case "change":
          if (action.payload.sortDirection > 0)
            newState.symbolList = newState.symbolList.sort((n1, n2) => (n1.priceChangePercent < n2.priceChangePercent) ? 1 : -1).slice(0, newState.symbolList.length);
          if (action.payload.sortDirection < 0)
            newState.symbolList = newState.symbolList.sort((n1, n2) => (n1.priceChangePercent > n2.priceChangePercent) ? 1 : -1).slice(0, newState.symbolList.length);
          break;
        case "volume":
          if (action.payload.sortDirection > 0)
            newState.symbolList = newState.symbolList.sort((n1, n2) => (n1.volume < n2.volume) ? 1 : -1).slice(0, newState.symbolList.length);
          if (action.payload.sortDirection < 0)
            newState.symbolList = newState.symbolList.sort((n1, n2) => (n1.volume > n2.volume) ? 1 : -1).slice(0, newState.symbolList.length);
          break;
        case "lower":
          if (action.payload.sortDirection > 0)
            newState.symbolList = newState.symbolList.sort((n1, n2) => (n1.lowPrice < n2.lowPrice) ? 1 : -1).slice(0, newState.symbolList.length);
          if (action.payload.sortDirection < 0)
            newState.symbolList = newState.symbolList.sort((n1, n2) => (n1.lowPrice > n2.lowPrice) ? 1 : -1).slice(0, newState.symbolList.length);
          break;
        case "higher":
          if (action.payload.sortDirection > 0)
            newState.symbolList = newState.symbolList.sort((n1, n2) => (n1.highPrice < n2.highPrice) ? 1 : -1).slice(0, newState.symbolList.length);
          if (action.payload.sortDirection < 0)
            newState.symbolList = newState.symbolList.sort((n1, n2) => (n1.highPrice > n2.highPrice) ? 1 : -1).slice(0, newState.symbolList.length);
          break;
        case "last":
          if (action.payload.sortDirection > 0)
            newState.symbolList = newState.symbolList.sort((n1, n2) => (n1.lastPrice < n2.lastPrice) ? 1 : -1).slice(0, newState.symbolList.length);
          if (action.payload.sortDirection < 0)
            newState.symbolList = newState.symbolList.sort((n1, n2) => (n1.lastPrice > n2.lastPrice) ? 1 : -1).slice(0, newState.symbolList.length);
          break;
      }
      return newState;

  }
  return state;
}

export default rootReducer