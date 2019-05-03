import axios from 'axios';
import {baseMarket} from './../misc/enumeration'

const cryptowatcherApiUrl = '/api/BinanceMarket/'

export const GetCryptoList = (bm : string) =>{
    console.log(bm);
    return async (dispatch  :any) =>{
      try{
        const res = await axios.get<any>(cryptowatcherApiUrl + "GetCryptoList/" + bm);
        return dispatch(GetCryptoListSuccess(res.data));
      }
      catch (error) {
        throw (error)
      }
    }
   }
   
   export const GetCryptoListSuccess = (data :any) => {
    
    return {
      type: "BINANCE_CRYPTO_LIST",
      payload: data
    }
   }

   export const SortList = (data :any) => {
    return {
      type: "BINANCE_CRYPTO_LIST_SORT",
      payload: data
    }
   }

   export const FilterList = (data :any) => {
    return {
      type: "BINANCE_CRYPTO_LIST_FILTER",
      payload: data
    }
   }

   export const SelectedCoin = (data :any) => {
    return {
      type: "BINANCE_CRYPTO_LIST_SELECTED_COIN",
      payload: data
    }
   }