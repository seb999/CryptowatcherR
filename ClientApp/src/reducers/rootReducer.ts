import { cryptoTransfer } from './../class/cryptoTransfer'
import { string, number } from 'prop-types';

const initState = {
  cryptoList: new Array<cryptoTransfer>(),
  cryptoListInitial: new Array<cryptoTransfer>(),
  selectedCoin : string,
}

const rootReducer = (state = initState, action: any) => {
  const newState = { ...state };

  switch (action.type) {
    case "BINANCE_COIN_MACD":
      var indexSymbol = newState.cryptoList.findIndex(p => p.symbol.toLowerCase() == action.payload.symbol.toLowerCase());
      newState.cryptoList[indexSymbol].MACD = action.payload.data.macd;
      newState.cryptoList[indexSymbol].MACDHist = action.payload.data.macdHist;
      newState.cryptoList[indexSymbol].MACDSign = action.payload.data.macdSign;
      newState.cryptoList = newState.cryptoList.slice(0, newState.cryptoList.length);
      return newState

    case "BINANCE_COIN_RSI":
      var indexSymbol = newState.cryptoList.findIndex(p => p.symbol.toLowerCase() == action.payload.symbol.toLowerCase());
      newState.cryptoList[indexSymbol].RSI = action.payload.data;
      newState.cryptoList = newState.cryptoList.slice(0, newState.cryptoList.length);
      return newState

    case "BINANCE_COIN_LIST_FILTER":
      newState.cryptoList = newState.cryptoListInitial;
      newState.cryptoList = newState.cryptoList.filter(p => p.symbol.toLowerCase().substr(0, action.payload.length) == action.payload.toLowerCase());
      return newState;

    case "BINANCE_COIN_LIST":
      newState.cryptoList = action.payload;
      newState.cryptoListInitial = action.payload;
      return newState;

    case "BINANCE_COIN_LIST_SORT":
      switch (action.payload.columnName) {
        case "symbol":
          if (action.payload.sortDirection > 0)
            newState.cryptoList = newState.cryptoList.sort((n1, n2) => (n1.symbol < n2.symbol) ? 1 : -1).slice(0, newState.cryptoList.length);
          if (action.payload.sortDirection < 0)
            newState.cryptoList = newState.cryptoList.sort((n1, n2) => (n1.symbol > n2.symbol) ? 1 : -1).slice(0, newState.cryptoList.length);
          break;
        case "change":
          if (action.payload.sortDirection > 0)
            newState.cryptoList = newState.cryptoList.sort((n1, n2) => (n1.priceChangePercent < n2.priceChangePercent) ? 1 : -1).slice(0, newState.cryptoList.length);
          if (action.payload.sortDirection < 0)
            newState.cryptoList = newState.cryptoList.sort((n1, n2) => (n1.priceChangePercent > n2.priceChangePercent) ? 1 : -1).slice(0, newState.cryptoList.length);
          break;
        case "volume":
          if (action.payload.sortDirection > 0)
            newState.cryptoList = newState.cryptoList.sort((n1, n2) => (n1.volume < n2.volume) ? 1 : -1).slice(0, newState.cryptoList.length);
          if (action.payload.sortDirection < 0)
            newState.cryptoList = newState.cryptoList.sort((n1, n2) => (n1.volume > n2.volume) ? 1 : -1).slice(0, newState.cryptoList.length);
          break;
        case "lower":
          if (action.payload.sortDirection > 0)
            newState.cryptoList = newState.cryptoList.sort((n1, n2) => (n1.lowPrice < n2.lowPrice) ? 1 : -1).slice(0, newState.cryptoList.length);
          if (action.payload.sortDirection < 0)
            newState.cryptoList = newState.cryptoList.sort((n1, n2) => (n1.lowPrice > n2.lowPrice) ? 1 : -1).slice(0, newState.cryptoList.length);
          break;
        case "higher":
          if (action.payload.sortDirection > 0)
            newState.cryptoList = newState.cryptoList.sort((n1, n2) => (n1.highPrice < n2.highPrice) ? 1 : -1).slice(0, newState.cryptoList.length);
          if (action.payload.sortDirection < 0)
            newState.cryptoList = newState.cryptoList.sort((n1, n2) => (n1.highPrice > n2.highPrice) ? 1 : -1).slice(0, newState.cryptoList.length);
          break;
        case "last":
          if (action.payload.sortDirection > 0)
            newState.cryptoList = newState.cryptoList.sort((n1, n2) => (n1.lastPrice < n2.lastPrice) ? 1 : -1).slice(0, newState.cryptoList.length);
          if (action.payload.sortDirection < 0)
            newState.cryptoList = newState.cryptoList.sort((n1, n2) => (n1.lastPrice > n2.lastPrice) ? 1 : -1).slice(0, newState.cryptoList.length);
          break;
      }
      return newState;

      case "BINANCE_COIN_LIST_SELECTED_COIN":
        newState.selectedCoin = action.payload;
        return newState;


  }
  return state;
}

export default rootReducer