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
                case "ETH":
                    icon = <img src={require('../../images/CoinIcon/ETH.png')} className="card-img-top img-fluid" style={{ height: 20, width: 20 }} />
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
                case "NEO":
                    icon = <img src={require('../../images/CoinIcon/NEO.png')} className="card-img-top img-fluid" style={{ height: 20, width: 20 }} />
                    break;
                case "QTUM":
                    icon = <img src={require('../../images/CoinIcon/QTUM.png')} className="card-img-top img-fluid" style={{ height: 20, width: 20 }} />
                    break;
                case "FET":
                    icon = <img src={require('../../images/CoinIcon/FET.png')} className="card-img-top img-fluid" style={{ height: 20, width: 20 }} />
                    break;
                case "ADA":
                    icon = <img src={require('../../images/CoinIcon/ADA.png')} className="card-img-top img-fluid" style={{ height: 20, width: 20 }} />
                    break;
                case "IOTA":
                    icon = <img src={require('../../images/CoinIcon/IOTA.png')} className="card-img-top img-fluid" style={{ height: 20, width: 20 }} />
                    break;
                case "EOS":
                    icon = <img src={require('../../images/CoinIcon/EOS.png')} className="card-img-top img-fluid" style={{ height: 20, width: 20 }} />
                    break;
                case "XRP":
                    icon = <img src={require('../../images/CoinIcon/XRP.png')} className="card-img-top img-fluid" style={{ height: 20, width: 20 }} />
                    break;
                case "NULS":
                    icon = <img src={require('../../images/CoinIcon/NULS.png')} className="card-img-top img-fluid" style={{ height: 20, width: 20 }} />
                    break;
                case "ICX":
                    icon = <img src={require('../../images/CoinIcon/ICX.png')} className="card-img-top img-fluid" style={{ height: 20, width: 20 }} />
                    break;
                case "PAX":
                    icon = <img src={require('../../images/CoinIcon/PAX.png')} className="card-img-top img-fluid" style={{ height: 20, width: 20 }} />
                    break;
                case "USDC":
                    icon = <img src={require('../../images/CoinIcon/USDC.png')} className="card-img-top img-fluid" style={{ height: 20, width: 20 }} />
                    break;
                case "LINK":
                    icon = <img src={require('../../images/CoinIcon/LINK.png')} className="card-img-top img-fluid" style={{ height: 20, width: 20 }} />
                    break;
                case "WAVES":
                    icon = <img src={require('../../images/CoinIcon/WAVES.png')} className="card-img-top img-fluid" style={{ height: 20, width: 20 }} />
                    break;
                case "WAVES":
                    icon = <img src={require('../../images/CoinIcon/WAVES.png')} className="card-img-top img-fluid" style={{ height: 20, width: 20 }} />
                    break;
                case "TFUEL":
                    icon = <img src={require('../../images/CoinIcon/TFUEL.png')} className="card-img-top img-fluid" style={{ height: 20, width: 20 }} />
                    break;
                case "MATIC":
                    icon = <img src={require('../../images/CoinIcon/MATIC.png')} className="card-img-top img-fluid" style={{ height: 20, width: 20 }} />
                    break;
                case "MITH":
                    icon = <img src={require('../../images/CoinIcon/MITH.png')} className="card-img-top img-fluid" style={{ height: 20, width: 20 }} />
                    break;
                case "THETA":
                    icon = <img src={require('../../images/CoinIcon/THETA.png')} className="card-img-top img-fluid" style={{ height: 20, width: 20 }} />
                    break;
                case "USDS":
                    icon = <img src={require('../../images/CoinIcon/USDS.png')} className="card-img-top img-fluid" style={{ height: 20, width: 20 }} />
                    break;
                case "ONG":
                    icon = <img src={require('../../images/CoinIcon/ONG.png')} className="card-img-top img-fluid" style={{ height: 20, width: 20 }} />
                    break;
                case "HOT":
                    icon = <img src={require('../../images/CoinIcon/HOT.png')} className="card-img-top img-fluid" style={{ height: 20, width: 20 }} />
                    break;
                case "ZIL":
                    icon = <img src={require('../../images/CoinIcon/ZIL.png')} className="card-img-top img-fluid" style={{ height: 20, width: 20 }} />
                    break;
                case "ZRX":
                    icon = <img src={require('../../images/CoinIcon/ZRX.png')} className="card-img-top img-fluid" style={{ height: 20, width: 20 }} />
                    break;
                case "BAT":
                    icon = <img src={require('../../images/CoinIcon/BAT.png')} className="card-img-top img-fluid" style={{ height: 20, width: 20 }} />
                    break;
                case "ZEC":
                    icon = <img src={require('../../images/CoinIcon/ZEC.png')} className="card-img-top img-fluid" style={{ height: 20, width: 20 }} />
                    break;
                case "IOST":
                    icon = <img src={require('../../images/CoinIcon/IOST.png')} className="card-img-top img-fluid" style={{ height: 20, width: 20 }} />
                    break;
                case "CELR":
                    icon = <img src={require('../../images/CoinIcon/CELR.png')} className="card-img-top img-fluid" style={{ height: 20, width: 20 }} />
                    break;
                case "NANO":
                    icon = <img src={require('../../images/CoinIcon/NANO.png')} className="card-img-top img-fluid" style={{ height: 20, width: 20 }} />
                    break;
                case "OMG":
                    icon = <img src={require('../../images/CoinIcon/OMG.png')} className="card-img-top img-fluid" style={{ height: 20, width: 20 }} />
                    break;
                case "ENJ":
                    icon = <img src={require('../../images/CoinIcon/ENJ.png')} className="card-img-top img-fluid" style={{ height: 20, width: 20 }} />
                    break;
                case "BNB":
                    icon = <img src={require('../../images/CoinIcon/BNB.png')} className="card-img-top img-fluid" style={{ height: 20, width: 20 }} />
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