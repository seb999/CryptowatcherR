import * as React from 'react';

interface Props {
    symbol: string;
}

interface State {
}

class CoinIcon extends React.Component<Props, State> {
    constructor(props: any) {
        super(props);
    }

    render() {

        let icon;

        try {

            switch (this.props.symbol.substr(0, this.props.symbol.indexOf("/"))) {
                case "BTC":
                    icon = <img src={require('../../images/CoinIcon/BTC.png')} className="card-img-top img-fluid" style={{ height: 20, width: 20 }} />
                    break;
                case "AERGO":
                    icon = <img src={require('../../images/CoinIcon/AERGO.png')} className="card-img-top img-fluid" style={{ height: 20, width: 20 }} />
                    break;
                case "BTT":
                    icon = <img src={require('../../images/CoinIcon/BTT.png')} className="card-img-top img-fluid" style={{ height: 20, width: 20 }} />
                    break;
                case "EBTC":
                    icon = <img src={require('../../images/CoinIcon/EBTC.png')} className="card-img-top img-fluid" style={{ height: 20, width: 20 }} />
                    break;
                case "EOS":
                    icon = <img src={require('../../images/CoinIcon/EOS.png')} className="card-img-top img-fluid" style={{ height: 20, width: 20 }} />
                    break;
                case "LTC":
                    icon = <img src={require('../../images/CoinIcon/LTC.png')} className="card-img-top img-fluid" style={{ height: 20, width: 20 }} />
                    break;
                case "BCHABC":
                    icon = <img src={require('../../images/CoinIcon/BCHABC.png')} className="card-img-top img-fluid" style={{ height: 20, width: 20 }} />
                    break;
                case "TRX":
                    icon = <img src={require('../../images/CoinIcon/TRX.png')} className="card-img-top img-fluid" style={{ height: 20, width: 20 }} />
                    break;
                case "XLM":
                    icon = <img src={require('../../images/CoinIcon/XLM.png')} className="card-img-top img-fluid" style={{ height: 20, width: 20 }} />
                    break;
                case "ATOM":
                    icon = <img src={require('../../images/CoinIcon/ATOM.png')} className="card-img-top img-fluid" style={{ height: 20, width: 20 }} />
                    break;
                case "ONT":
                    icon = <img src={require('../../images/CoinIcon/ONT.png')} className="card-img-top img-fluid" style={{ height: 20, width: 20 }} />
                    break;
                case "XMR":
                    icon = <img src={require('../../images/CoinIcon/XMR.png')} className="card-img-top img-fluid" style={{ height: 20, width: 20 }} />
                    break;
                case "DASH":
                    icon = <img src={require('../../images/CoinIcon/DASH.png')} className="card-img-top img-fluid" style={{ height: 20, width: 20 }} />
                    break;
                case "ETC":
                    icon = <img src={require('../../images/CoinIcon/ETC.png')} className="card-img-top img-fluid" style={{ height: 20, width: 20 }} />
                    break;
                case "MTV":
                    icon = <img src={require('../../images/CoinIcon/MTV.png')} className="card-img-top img-fluid" style={{ height: 20, width: 20 }} />
                    break;
                case "VET":
                    icon = <img src={require('../../images/CoinIcon/VET.png')} className="card-img-top img-fluid" style={{ height: 20, width: 20 }} />
                    break;
                case "TRY":
                    icon = <img src={require('../../images/CoinIcon/TRY.png')} className="card-img-top img-fluid" style={{ height: 20, width: 20 }} />
                    break;
                    case "DRGN":
                            icon = <img src={require('../../images/CoinIcon/DRGN.png')} className="card-img-top img-fluid" style={{ height: 20, width: 20 }} />
                            break;
                            case "FET":
                                    icon = <img src={require('../../images/CoinIcon/FET.png')} className="card-img-top img-fluid" style={{ height: 20, width: 20 }} />
                                    break;

                default:
                    icon = <i className="fas fa-coins"></i>
                    break;
            }
        }
        catch (exception) {
            icon = <i className="fas fa-coins"></i>
        }

        return (
            <div style={{ display: "inline-block" }}>{icon}&nbsp;</div>
        );
    }
}

export default CoinIcon