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