interface BinanceCrypto{
  DateFormatted : string;
  TemperatureC : string;
  Summary : string;
  TemperatureF : string;
}

const initState = {
    cryptoList: new Array<BinanceCrypto>(),
  }

  const rootReducer = (state = initState, action: any) => {
    const newState = { ...state };

    switch (action.type) {
      case "USDT_MARKET_LIST":
      newState.cryptoList = action.payload
      return newState;
    }
    return state;
  }

  export default rootReducer