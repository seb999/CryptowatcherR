import * as React from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import * as binanceActionCreator from '../actions/actions';
import { withRouter } from 'react-router-dom';
import { coinTickerTransfer } from '../class/coinTickerTransfer'
import './Css/BinanceMarket.css';
import Sorter from './Element/Sorter'
import DropDown from './Element/DropDown'

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
    coinList: Array<coinTickerTransfer>;
}

interface Props
    extends AppObjectProps,
    AppFnProps { }

interface State {
    sortDirection: number,
    sortColumn: string,
    sorterVisibility: Array<{ columnId: string, visibility: boolean }>,
    showChartPopup: boolean,
    marketSelected: any,
    marketList: Array<string>;
}

class BinanceMarket extends React.Component<Props, State>{
    constructor(props: any) {
        super(props)

        this.state = {
            marketSelected: "USDT",
            marketList: ["USDT", "BTC", "BNB"],
            sortDirection: 1,
            showChartPopup: false,
            sortColumn: "",
            sorterVisibility: [
                { columnId: "symbol", visibility: false },
                { columnId: "volume", visibility: false },
                { columnId: "lower", visibility: false },
                { columnId: "higher", visibility: false },
                { columnId: "last", visibility: false },
                { columnId: "change", visibility: false }]
        }
    }

    componentDidMount() {
        this.props.getCoinList("USDT");
    }

    handleChangeReferenceCoin = (p: any) => {
        this.setState({
            marketSelected: p
        })
        this.props.getCoinList(p);
    }

    handleSort = (e: any) => {
        let sorterArray = this.state.sorterVisibility;
        let sortDirection = -this.state.sortDirection;
        sorterArray.forEach(p => p.visibility = false);
        let sorterIndex = sorterArray.findIndex(p => p.columnId == e.target.id);
        if(sorterIndex >=0) sorterArray[sorterIndex].visibility = true;

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
        this.props.history.push("/BinanceCoin")
    }

    handleCalculateIndicators = (symbol: any) => {
        this.props.getRSI(symbol, '1d');
        this.props.getMACD(symbol, '1d');
    }

    render() {
        let displayList = this.props.coinList.map((coin, index) => (
            <tr key={coin.symbol}>
                <td>
                    <button style={{ marginRight: 10 }} className="btn btn-outline-info btn-sm" onClick={() => this.handleShowCoinDetail(coin.symbol)}><i className="fa fa-chart-line"></i></button>
                    {coin.symbolShort}
                </td>
                <td>{Math.round(coin.volume).toLocaleString()}</td>
                <td>{coin.lowPrice}</td>
                <td>{coin.highPrice}</td>
                <td>{coin.lastPrice}</td>
                <td className={coin.priceChangePercent >= 0 ? "Up" : "Down"}>{coin.priceChangePercent}</td>
                <td>{coin.RSI === undefined ? "--" : coin.RSI}</td>
                <td>
                    {coin.MACD === undefined ? "--" :
                        <div style={{ fontSize: 10 }}>
                            Macd {coin.MACD} <br />Sign {coin.MACDSign} <br />Hist {coin.MACDHist}</div>
                    }
                </td>
                <td> <button style={{ marginLeft: 10, border: 0 }} data-toggle="tooltip" title="Calculate RSI / MACD" className="btn btn-outline-info btn-sm" onClick={() => this.handleCalculateIndicators(coin.symbol)}><i className="fas fa-sync" ></i></button></td>
            </tr>
        ));

        return (
            <div>
                <div style={{ float: "left" }}>
                <DropDown spin={false} itemList={this.state.marketList} onClick={this.handleChangeReferenceCoin} selectedItem={this.state.marketSelected}></DropDown>
                </div>

                <div className="input-group mb-1 mt-1" style={{ float: "right", width: 300 }}>
                    <input type="text" className="form-control" placeholder="Search crypto" aria-label="Search crypto" aria-describedby="basic-addon2" onChange={this.handleFilterChange}></input>
                </div>

                <table className="table" >
                    <thead className="thead thead-light">
                        <tr>
                            <th scope="col" id="symbol" onClick={this.handleSort} className="tableTh">Symbol<Sorter sortDirection={this.state.sortDirection} visible={this.state.sorterVisibility[0].visibility} /></th>
                            <th scope="col" id="volume" onClick={this.handleSort} className="tableTh">Volume<Sorter sortDirection={this.state.sortDirection} visible={this.state.sorterVisibility[1].visibility} /></th>
                            <th scope="col" id="lower" onClick={this.handleSort} className="tableTh">Lower<Sorter sortDirection={this.state.sortDirection} visible={this.state.sorterVisibility[2].visibility} /></th>
                            <th scope="col" id="higher" onClick={this.handleSort} className="tableTh">Higher<Sorter sortDirection={this.state.sortDirection} visible={this.state.sorterVisibility[3].visibility} /></th>
                            <th scope="col" id="last" onClick={this.handleSort} className="tableTh">Last<Sorter sortDirection={this.state.sortDirection} visible={this.state.sorterVisibility[4].visibility} /></th>
                            <th scope="col" id="change" onClick={this.handleSort} className="tableTh">% change<Sorter sortDirection={this.state.sortDirection} visible={this.state.sorterVisibility[5].visibility} /></th>
                            <th scope="col" id="rsi">RSI</th>
                            <th scope="col" id="macd">MACD</th>
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
        coinList: state.coinList,
    }
}

const mapDispatchToProps = (dispatch: Dispatch) => {
    return {
        getCoinList: (p: string) => dispatch<any>(binanceActionCreator.binanceActions.GetCoinList(p)),
        sortList: (columnName: string, sortDirection: number) => dispatch<any>(binanceActionCreator.binanceActions.SortList(columnName, sortDirection)),
        filterList: (p: string) => dispatch<any>(binanceActionCreator.binanceActions.FilterList(p)),
        selectedCoin: (p: string) => dispatch<any>(binanceActionCreator.binanceActions.SelectedCoin(p)),
        getRSI: (symbol: string, interval: string) => dispatch<any>(binanceActionCreator.binanceActions.GetRSI(symbol, interval)),
        getMACD: (symbol: string, interval: string) => dispatch<any>(binanceActionCreator.binanceActions.GetMACD(symbol, interval)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)((BinanceMarket));
