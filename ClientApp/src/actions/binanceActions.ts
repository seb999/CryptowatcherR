import axios from 'axios';
import { baseMarket } from './../misc/enumeration'

const cryptowatcherApiUrl = '/api/BinanceMarket/'

export const GetCoinList = (symbol: string) => {
  return async (dispatch: any) => {
    try {
      const res = await axios.get<any>(cryptowatcherApiUrl + "GetCoinList/" + symbol);
      return dispatch(GetCoinListSuccess(res.data));
    }
    catch (error) {
      throw (error)
    }
  }
}

export const GetCoinListSuccess = (data: any) => {
  return {
    type: "BINANCE_COIN_LIST",
    payload: data
  }
}

export const GetRSI = (symbol: string, interval : string) => {
  return async (dispatch: any) => {
    try {
      const res = await axios.get<any>(cryptowatcherApiUrl + "GetRSI/" + symbol + "/" + interval);
      return dispatch(GetRSISuccess(res.data, symbol));
    }
    catch (error) {
      throw (error)
    }
  }
}

export const GetRSISuccess = (data: any, symbol: string) => {
  return {
    type: "BINANCE_COIN_RSI",
    payload: {data : data, symbol : symbol}
  }
}

export const GetMACD = (symbol: string, interval : string) => {
  return async (dispatch: any) => {
    try {
      const res = await axios.get<any>(cryptowatcherApiUrl + "GetMACD/" + symbol + "/" + interval);
      return dispatch(GetMACDSuccess(res.data, symbol));
    }
    catch (error) {
      throw (error)
    }
  }
}

export const GetMACDSuccess = (data: any, symbol: string) => {
  return {
    type: "BINANCE_COIN_MACD",
    payload: {data : data, symbol : symbol}
  }
}

export const SortList = (columnName: string, sortDirection: number) => {
  return {
    type: "BINANCE_COIN_LIST_SORT",
    payload: {columnName : columnName, sortDirection: sortDirection}
  }
}

export const FilterList = (data: any) => {
  return {
    type: "BINANCE_COIN_LIST_FILTER",
    payload: data
  }
}

export const SelectedCoin = (data: any) => {
  return {
    type: "BINANCE_COIN_LIST_SELECTED_COIN",
    payload: data
  }
}