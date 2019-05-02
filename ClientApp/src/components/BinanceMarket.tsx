import * as React from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import * as binanceActionCreator from '../actions/actions';
import { withRouter } from 'react-router-dom';
import { cryptoTransfer } from '../class/cryptoTransfer'
import { SSL_OP_SSLREF2_REUSE_CERT_TYPE_BUG } from 'constants';
import './BinanceMarket.css';
import ChartPopup from './Popup/ChartPopup'

interface sortType {
    columnName: string,
    sortDirection: number
}

interface Props {
    getCryptoList(bm: string): void;
    sortList(sortType: sortType): void;
    filterList(p: string): void;
    cryptoList: Array<cryptoTransfer>;
}

interface State {
    sortDirection: number,
    showChartPopup: boolean,
}

//hello world
class BinanceMarket extends React.Component<Props, State>{
    constructor(props: any) {
        super(props)

        this.state = {
            sortDirection: -1,
            showChartPopup: false
        }
    }

    componentDidMount() {
        this.props.getCryptoList("USDT");
    }

    handleCloseChart = () => {
        this.setState({ showChartPopup: false });
    }

    handleShowChart = () => {
        this.setState({ showChartPopup: true });
    }

    handleChange = (event: any) => {
        this.props.getCryptoList(event.target.value);
    }

    handleSort = (e: any) => {
        this.setState({
            sortDirection: -this.state.sortDirection
        })
        this.props.sortList({
            columnName: e.target.id,
            sortDirection: this.state.sortDirection
        })
    }

    handleFilterChange = (e:any) =>{
        this.props.filterList(e.target.value);
    }

    render() {
        let displayList = this.props.cryptoList.map((crypto, index) => (
            <tr key={crypto.symbol}>
                <td>
                    <button style={{ marginRight: 10 }} className="btn btn-outline-info btn-sm" onClick={this.handleShowChart}><i className="fa fa-chart-line"></i></button>

                    {crypto.symbol}
                </td>
                <td>{Math.round(crypto.volume).toLocaleString()}</td>
                <td>{crypto.lowPrice}</td>
                <td>{crypto.highPrice}</td>
                <td>{crypto.lastPrice}</td>
                <td className={crypto.priceChangePercent >= 0 ? "Up" : "Down"}>{crypto.priceChangePercent}</td>
                <td>rsi</td>
                <td>macd</td>
            </tr>
        ));

        let baseMarketList = <select onChange={this.handleChange} className="form-control mb-1 mt-1">
            <option value="USDT">USDT</option>
            <option value="BTC">BTC</option>
            <option value="BNB">BNB</option>
        </select>;

        return (
            <div>
                <div style={{ float: "left" }}>{baseMarketList}</div>

                <div className="input-group mb-1 mt-1" style={{ float: "right", width: 300 }}>
                    <input type="text" className="form-control" placeholder="Search crypto" aria-label="Search crypto" aria-describedby="basic-addon2" onChange={this.handleFilterChange}></input>
                </div>

                <table className="table" >
                    <thead className="thead">
                        <tr>
                            <th scope="col" id="symbol" onClick={this.handleSort} className="tableTh">Symbol</th>
                            <th scope="col" id="volume" onClick={this.handleSort} className="tableTh">Volume</th>
                            <th scope="col" id="lower" onClick={this.handleSort} className="tableTh">Lower</th>
                            <th scope="col" id="higher" onClick={this.handleSort} className="tableTh">Higher</th>
                            <th scope="col" id="last" onClick={this.handleSort} className="tableTh">Last</th>
                            <th scope="col" id="change" onClick={this.handleSort} className="tableTh">% change</th>
                            <th scope="col" id="change" onClick={this.handleSort} className="tableTh">RSI</th>
                            <th scope="col" id="change" onClick={this.handleSort} className="tableTh">MACD</th>
                        </tr>
                    </thead>
                    <tbody>
                        {displayList}
                    </tbody>
                </table>

                <ChartPopup show={this.state.showChartPopup} hide={this.handleCloseChart} />
            </div>
        )
    }
}

//map the props of this class to the root redux state
const mapStateToProps = (state: any) => {
    return {
        cryptoList: state.cryptoList,
    }
}

const mapDispatchToProps = (dispatch: Dispatch) => {
    return {
        getCryptoList: (p: string) => dispatch<any>(binanceActionCreator.default.binanceActions.GetCryptoList(p)),
        sortList: (p: sortType) => dispatch<any>(binanceActionCreator.default.binanceActions.SortList(p)),
        filterList: (p: string) => dispatch<any>(binanceActionCreator.default.binanceActions.FilterList(p)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)((BinanceMarket));