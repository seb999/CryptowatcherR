import axios from 'axios';
import { baseMarket } from './../misc/enumeration'

const cryptowatcherApiUrl = '/api/BinanceMarket/'

export const GetSymbolList = (market: string) => {
  return async (dispatch: any) => {
    try {
      const res = await axios.get<any>(cryptowatcherApiUrl + "GetSymbolList/" + market);
      return dispatch(GetSymbolListSuccess(res.data));
    }
    catch (error) {
      throw (error)
    }
  }
}

export const GetSymbolListSuccess = (data: any) => {
  return {
    type: "BINANCE_SYMBOL_LIST",
    payload: data
  }
}

export const GetSymbol = (symbol: string) => {
  return async (dispatch: any) => {
    try {
      const res = await axios.get<any>(cryptowatcherApiUrl + "GetSymbol/" + symbol);
      return dispatch(GetSymbolSuccess(res.data));
    }
    catch (error) {
      throw (error)
    }
  }
}

export const GetSymbolSuccess = (data: any) => {
  return {
    type: "BINANCE_SYMBOL",
    payload: data
  }
}

export const GetChartData = (symbol: string, interval : string) => {
  return async (dispatch: any) => {
    try {
      const res = await axios.get<any>(cryptowatcherApiUrl + "GetChartData/" + symbol + "/" + interval);
      return dispatch(GetChartDataSuccess(res.data));
    }
    catch (error) {
      throw (error)
    }
  }
}

export const GetChartDataSuccess = (data: any) => {
  return {
    type: "BINANCE_CHART_DATA",
    payload: data
  }
}

export const GetIndicator = (symbol: string, interval : string) => {
  return async (dispatch: any) => {
    try {
      const res = await axios.get<any>(cryptowatcherApiUrl + "GetIndicator/" + symbol + "/" + interval);
      return dispatch(GetIndicatorSuccess(res.data, symbol));
    }
    catch (error) {
      throw (error)
    }
  }
}

export const GetIndicatorSuccess = (data: any, symbol: string) => {
  return {
    type: "BINANCE_SYMBOL_INDICATOR",
    payload: {data : data, symbol : symbol}
  }
}

export const SortList = (columnName: string, sortDirection: number) => {
  return {
    type: "BINANCE_SYMBOL_LIST_SORT",
    payload: {columnName : columnName, sortDirection: sortDirection}
  }
}

export const FilterList = (data: any) => {
  return {
    type: "BINANCE_SYMBOL_LIST_FILTER",
    payload: data
  }
}