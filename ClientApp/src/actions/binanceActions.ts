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

export const GetData = (symbol: string, interval : string) => {
  return async (dispatch: any) => {
    try {
      const res = await axios.get<any>(cryptowatcherApiUrl + "GetSymbolData/" + symbol + "/" + interval);
      return dispatch(GetDataSuccess(res.data));
    }
    catch (error) {
      throw (error)
    }
  }
}

export const GetDataSuccess = (data: any) => {
  return {
    type: "BINANCE_SYMBOL_DATA",
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

export const GetNewCurrencyList = () => {
  return async (dispatch: any) => {
    try {
      const res = await axios.get<any>(cryptowatcherApiUrl + "GetNewCurrencyList");
      return dispatch(GetNewCurrencyListSuccess(res.data));
    }
    catch (error) {
      throw (error)
    }
  }
}

export const GetNewCurrencyListSuccess = (data: any) => {
  return {
    type: "BINANCE_NEW_CURRENCY_LIST",
    payload: data
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

  export const FilterList2 = (data: any) => {
    return {
      type: "BINANCE_SYMBOL_LIST_FILTER2",
      payload: data
    }
}