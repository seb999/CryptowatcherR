import axios from 'axios';

const cryptowatcherApiUrl = '/api/BinanceMarket/'

export const USDTMarketList = () =>{
    return async (dispatch  :any) =>{
      try{
        //We are logged in the API so we don't need to pass again the userId
        const res = await axios.get<any>(cryptowatcherApiUrl + "WeatherForecasts");
        return dispatch(USDTMarketListSuccess(res.data));
      }
      catch (error) {
        throw (error)
      }
    }
   }
   
   export const USDTMarketListSuccess = (data :any) => {
    return {
      type: "USDT_MARKET_LIST",
      payload: data
    }
   }