import { coinTickerTransfer } from '../class/coinTickerTransfer'
import { coinTransfer } from '../class/coinTransfer'
import { string, number } from 'prop-types';

const initState = {
  coinList: new Array<coinTickerTransfer>(),
  coinListInitial: new Array<coinTickerTransfer>(),
  coin: new Array<coinTransfer>(),
  selectedCoin : string,
  ohlc: [] as any,
  volume: [] as any,
  rsi: [] as any,
}

const rootReducer = (state = initState, action: any) => {
  const newState = { ...state };

  switch (action.type) {
    case "BINANCE_COIN_LIST":
      newState.coinList = action.payload;
      newState.coinListInitial = action.payload;
      return newState;

      case "BINANCE_COIN":
      newState.coin = action.payload;
      return newState;

      case "BINANCE_COIN_SPECIAL":
      newState.ohlc = [];
      action.payload.map((data : any) => (
        newState.ohlc.push([
            data.closeTime,
            data.open,
            data.high,
            data.low,
            data.close
        ])
    ));
      return newState;

    case "BINANCE_COIN_MACD":
      var indexSymbol = newState.coinList.findIndex(p => p.symbol.toLowerCase() == action.payload.symbol.toLowerCase());
      newState.coinList[indexSymbol].MACD = action.payload.data.macd;
      newState.coinList[indexSymbol].MACDHist = action.payload.data.macdHist;
      newState.coinList[indexSymbol].MACDSign = action.payload.data.macdSign;
      newState.coinList = newState.coinList.slice(0, newState.coinList.length);
      return newState

    case "BINANCE_COIN_RSI":
      var indexSymbol = newState.coinList.findIndex(p => p.symbol.toLowerCase() == action.payload.symbol.toLowerCase());
      newState.coinList[indexSymbol].RSI = action.payload.data;
      newState.coinList = newState.coinList.slice(0, newState.coinList.length);
      return newState

    case "BINANCE_COIN_LIST_FILTER":
      newState.coinList = newState.coinListInitial;
      newState.coinList = newState.coinList.filter(p => p.symbol.toLowerCase().substr(0, action.payload.length) == action.payload.toLowerCase());
      return newState;

    

    case "BINANCE_COIN_LIST_SORT":
      switch (action.payload.columnName) {
        case "symbol":
          if (action.payload.sortDirection > 0)
            newState.coinList = newState.coinList.sort((n1, n2) => (n1.symbol < n2.symbol) ? 1 : -1).slice(0, newState.coinList.length);
          if (action.payload.sortDirection < 0)
            newState.coinList = newState.coinList.sort((n1, n2) => (n1.symbol > n2.symbol) ? 1 : -1).slice(0, newState.coinList.length);
          break;
        case "change":
          if (action.payload.sortDirection > 0)
            newState.coinList = newState.coinList.sort((n1, n2) => (n1.priceChangePercent < n2.priceChangePercent) ? 1 : -1).slice(0, newState.coinList.length);
          if (action.payload.sortDirection < 0)
            newState.coinList = newState.coinList.sort((n1, n2) => (n1.priceChangePercent > n2.priceChangePercent) ? 1 : -1).slice(0, newState.coinList.length);
          break;
        case "volume":
          if (action.payload.sortDirection > 0)
            newState.coinList = newState.coinList.sort((n1, n2) => (n1.volume < n2.volume) ? 1 : -1).slice(0, newState.coinList.length);
          if (action.payload.sortDirection < 0)
            newState.coinList = newState.coinList.sort((n1, n2) => (n1.volume > n2.volume) ? 1 : -1).slice(0, newState.coinList.length);
          break;
        case "lower":
          if (action.payload.sortDirection > 0)
            newState.coinList = newState.coinList.sort((n1, n2) => (n1.lowPrice < n2.lowPrice) ? 1 : -1).slice(0, newState.coinList.length);
          if (action.payload.sortDirection < 0)
            newState.coinList = newState.coinList.sort((n1, n2) => (n1.lowPrice > n2.lowPrice) ? 1 : -1).slice(0, newState.coinList.length);
          break;
        case "higher":
          if (action.payload.sortDirection > 0)
            newState.coinList = newState.coinList.sort((n1, n2) => (n1.highPrice < n2.highPrice) ? 1 : -1).slice(0, newState.coinList.length);
          if (action.payload.sortDirection < 0)
            newState.coinList = newState.coinList.sort((n1, n2) => (n1.highPrice > n2.highPrice) ? 1 : -1).slice(0, newState.coinList.length);
          break;
        case "last":
          if (action.payload.sortDirection > 0)
            newState.coinList = newState.coinList.sort((n1, n2) => (n1.lastPrice < n2.lastPrice) ? 1 : -1).slice(0, newState.coinList.length);
          if (action.payload.sortDirection < 0)
            newState.coinList = newState.coinList.sort((n1, n2) => (n1.lastPrice > n2.lastPrice) ? 1 : -1).slice(0, newState.coinList.length);
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