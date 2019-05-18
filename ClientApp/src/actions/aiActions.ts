import axios from 'axios';

const aiApiUrl = '/api/AI/'

export const CheckModelExist = (symbol: string) => {
  return async (dispatch: any) => {
    try {
      const res = await axios.get<any>(aiApiUrl + "CheckModelExist/" + symbol);
      return dispatch(CheckModelExistSuccess(res.data));
    }
    catch (error) {
      throw (error)
    }
  }
}

export const CheckModelExistSuccess = (data: any) => {
  return {
    type: "AI_MODEL_EXIST",
    payload: data
  }
}

export const GetPrediction = (symbol: string) => {
  return async (dispatch: any) => {
    try {
      const res = await axios.get<any>(aiApiUrl + "GetPrediction/" + symbol);
      return dispatch(GetPredictionSuccess(res.data));
    }
    catch (error) {
      throw (error)
    }
  }
}

export const GetPredictionSuccess = (data: any) => {
  return {
    type: "AI_GET_PREDICTION",
    payload: data
  }
}