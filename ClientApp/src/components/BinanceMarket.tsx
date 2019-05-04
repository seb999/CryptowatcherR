import * as React from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import * as binanceActionCreator from '../actions/actions';
import { withRouter } from 'react-router-dom';
import { cryptoTransfer } from '../class/cryptoTransfer'
import './Css/BinanceMarket.css';
import ChartPopup from './Popup/ChartPopup'
import Sorter from './Element/Sorter'
import { array } from 'prop-types';

interface AppFnProps {
    getCoinList(baseMarket: string): void;
    filterList(symbol: string): void;
    selectedCoin(symbol: string): void;
    sortList(columnName: string, sortDirection: number): void;
    getRSI(symbol: string, interval: string): void;
    getMACD(symbol: string, interval: string): void;
}

interface AppObjectProps {
    history?: any;
    cryptoList: Array<cryptoTransfer>;
}

interface AppProps
    extends AppObjectProps,
    AppFnProps { }

interface State {
    sortDirection: number,
    sortColumn: string,
    sorterVisibility: Array<{ columnId: string, visibility: boolean }>,
    showChartPopup: boolean,
}

class BinanceMarket extends React.Component<AppProps, State>{
    constructor(props: any) {
        super(props)

        this.state = {
            sortDirection: 1,
            showChartPopup: false,
            sortColumn: "",
            sorterVisibility: [{ columnId: "symbol", visibility: false }, { columnId: "volume", visibility: false }, { columnId: "", visibility: false }, { columnId: "", visibility: false }, { columnId: "", visibility: false }, { columnId: "", visibility: false }]
        }
    }

    componentDidMount() {
        this.props.getCoinList("USDT");
    }

    handleChangeReferenceCoin = (event: any) => {
        this.props.getCoinList(event.target.value);
    }

    // handleCloseChart = () => {
    //     this.setState({ showChartPopup: false });
    // }

    // handleShowChart = () => {
    //     this.setState({ showChartPopup: true });
    // }

    handleSort = (e: any) => {
        let sorterArray = this.state.sorterVisibility;
        let sortDirection = -this.state.sortDirection;
        sorterArray.forEach(p => p.visibility = false);
        let sorterIndex = sorterArray.findIndex(p => p.columnId == e.target.id);
        sorterArray[sorterIndex].visibility = true;

        if (this.state.sortColumn == e.target.id) {
            this.setState({
                sortDirection: sortDirection
            }, function (this: any) {
                this.props.sortList(this.state.sortColumn, this.state.sortDirection);
            });
        }
        else {
            this.setState({
                sortDirection: -1,
                sortColumn: e.target.id,
                sorterVisibility: sorterArray
            }, function (this: any) {
                this.props.sortList(this.state.sortColumn, this.state.sortDirection);
            });
        }
    }

    handleFilterChange = (e: any) => {
        this.props.filterList(e.target.value);
    }

    handleShowCoinDetail = (symbol: any) => {
        this.props.selectedCoin(symbol);
        this.props.history.push("/BinanceMarketCoin")
    }

    handleCalculateIndicators = (symbol: any) => {
        this.props.getRSI(symbol, '1d');
        this.props.getMACD(symbol, '1d');
    }

    render() {
        let displayList = this.props.cryptoList.map((crypto, index) => (
            <tr key={crypto.symbol}>
                <td>
                    <button style={{ marginRight: 10 }} className="btn btn-outline-info btn-sm" onClick={() => this.handleShowCoinDetail(crypto.symbol)}><i className="fa fa-chart-line"></i></button>
                    {crypto.symbolShort}
                </td>
                <td>{Math.round(crypto.volume).toLocaleString()}</td>
                <td>{crypto.lowPrice}</td>
                <td>{crypto.highPrice}</td>
                <td>{crypto.lastPrice}</td>
                <td className={crypto.priceChangePercent >= 0 ? "Up" : "Down"}>{crypto.priceChangePercent}</td>
                <td>{crypto.RSI === undefined ? "--" : crypto.RSI}</td>
                <td>
                    {crypto.MACD === undefined ? "--" :
                        <div style={{ fontSize: 10 }}>
                            Macd {crypto.MACD} <br />Sign {crypto.MACDSign} <br />Hist {crypto.MACDHist}</div>
                    }
                </td>
                <td> <button style={{ marginLeft: 10, border: 0 }} data-toggle="tooltip" title="Calculate RSI / MACD" className="btn btn-outline-info btn-sm" onClick={() => this.handleCalculateIndicators(crypto.symbol)}><i className="fas fa-sync" ></i></button></td>
            </tr>
        ));

        let baseMarketList = <select onChange={this.handleChangeReferenceCoin} className="form-control mb-1 mt-1">
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
                    <thead className="thead thead-light">
                        <tr>
                            <th scope="col" id="symbol" onClick={this.handleSort} className="tableTh">Symbol<Sorter sortDirection={this.state.sortDirection} visible={this.state.sorterVisibility[0].visibility} /></th>
                            <th scope="col" id="volume" onClick={this.handleSort} className="tableTh">Volume<Sorter sortDirection={this.state.sortDirection} visible={this.state.sorterVisibility[1].visibility} /></th>
                            <th scope="col" id="lower" onClick={this.handleSort} className="tableTh">Lower</th>
                            <th scope="col" id="higher" onClick={this.handleSort} className="tableTh">Higher</th>
                            <th scope="col" id="last" onClick={this.handleSort} className="tableTh">Last</th>
                            <th scope="col" id="change" onClick={this.handleSort} className="tableTh">% change</th>
                            <th scope="col" id="change" onClick={this.handleSort} className="tableTh">RSI</th>
                            <th scope="col" id="change" onClick={this.handleSort} className="tableTh">MACD</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {displayList}
                    </tbody>
                </table>

                {/* <ChartPopup show={this.state.showChartPopup} hide={this.handleCloseChart} /> */}
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
        getCoinList: (p: string) => dispatch<any>(binanceActionCreator.default.binanceActions.GetCoinList(p)),
        sortList: (columnName: string, sortDirection: number) => dispatch<any>(binanceActionCreator.default.binanceActions.SortList(columnName, sortDirection)),
        filterList: (p: string) => dispatch<any>(binanceActionCreator.default.binanceActions.FilterList(p)),
        selectedCoin: (p: string) => dispatch<any>(binanceActionCreator.default.binanceActions.SelectedCoin(p)),
        getRSI: (symbol: string, interval: string) => dispatch<any>(binanceActionCreator.default.binanceActions.GetRSI(symbol, interval)),
        getMACD: (symbol: string, interval: string) => dispatch<any>(binanceActionCreator.default.binanceActions.GetMACD(symbol, interval)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)((BinanceMarket));
