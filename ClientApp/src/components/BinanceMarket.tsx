import * as React from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import * as binanceActionCreator from '../actions/actions';
import { symbolTransfer } from '../class/symbolTransfer'
import './Css/BinanceMarket.css';
import Sorter from './Element/Sorter'
import DropDown from './Element/DropDown'
import CoinIcon from './Element/CoinIcon'

interface AppFnProps {
    getSymbolList(baseMarket: string): void;
    filterList(symbol: string): void;
    sortList(columnName: string, sortDirection: number): void;
    getIndicator(symbol: string, interval: string): void;
}

interface AppObjectProps {
    history?: any;
    symbolList: Array<symbolTransfer>;
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
    showSpinner: boolean;
    opacity: any;
}

class BinanceMarket extends React.Component<Props, State>{
    constructor(props: any) {
        super(props)

        this.state = {
            marketSelected: "USDT",
            marketList: ["--", "USDT", "BTC", "BNB"],
            sortDirection: 1,
            showChartPopup: false,
            sortColumn: "",
            showSpinner: true,
            opacity: 0.5,
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
        this.props.getSymbolList("USDT");
    }

    componentDidUpdate(nextProps: any) {
        if (this.props != nextProps) {
            this.setState({
                showSpinner: false,
                opacity: 1
            })
        }
    }

    handleChangeReferenceCoin = (p: any) => {
        this.setState({
            marketSelected: p,
            showSpinner: true,
            opacity: 0.5,
        })
        this.props.getSymbolList(p);
    }

    handleSort = (e: any) => {
        let sorterArray = this.state.sorterVisibility;
        let sortDirection = -this.state.sortDirection;
        sorterArray.forEach(p => p.visibility = false);
        let sorterIndex = sorterArray.findIndex(p => p.columnId == e.target.id);
        if (sorterIndex >= 0) sorterArray[sorterIndex].visibility = true;

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
        this.props.history.push("/BinanceCoin/" + symbol);
    }

    handleCalculateIndicators = (symbol: any) => {
        this.props.getIndicator(symbol, '1d');
    }

    render() {
        let displayList = this.props.symbolList.map((coin, index) => (
            <tr key={coin.symbol}>
                <td>
                    <button style={{ marginRight: 10 }} className="btn btn-outline-info btn-sm" onClick={() => this.handleShowCoinDetail(coin.symbol)}><i className="fa fa-chart-line"></i></button>
                    <CoinIcon symbol={coin.symbolShort}></CoinIcon>
                    {coin.symbolShort}
                </td>
                <td className="d-none d-md-table-cell">{Math.round(coin.volume).toLocaleString()}</td>
                <td className="d-none d-md-table-cell">{coin.lowPrice}</td>
                <td className="d-none d-md-table-cell">{coin.highPrice}</td>
                <td>{coin.lastPrice}</td>
                <td className={coin.priceChangePercent >= 0 ? "Up" : "Down"}>{coin.priceChangePercent}</td>
                <td>
                    {coin.rsi === 0 ?
                        <div>
                            <div style={{ float: "left" }}>...</div>
                            <div style={{float: "right" }}>...</div>
                        </div>
                        :
                        <div>
                            <div style={{ float: "left" }}>{coin.rsi}</div>
                            <div style={{ fontSize: 10, float: "right" }}> Macd {coin.macd} <br />Sign {coin.macdSign} <br />Hist {coin.macdHist}
                            </div>
                        </div>
                    }
                </td>
                <td>
                    {coin.prediction === null ? "..." :
                        coin.prediction[0].futurePrice == 0 ? "N/A" :
                            coin.prediction[0].futurePrice > 0 ? <i className="fas fa-arrow-up" style={{ color: 'green' }}></i> :
                                coin.prediction[0].futurePrice < 0 ? <i className="fas fa-arrow-down" style={{ color: 'red' }}></i> : ""
                    }
                </td>
                <td><button style={{ marginLeft: 10, border: 0 }} data-toggle="tooltip" title="Calculate RSI / MACD and Future" className="btn btn-outline-info btn-sm" onClick={() => this.handleCalculateIndicators(coin.symbol)}><i className="fas fa-sync" ></i></button> </td>
            </tr>
        ));

        return (
            <div>
                <div style={{ float: "left" }}>
                    <DropDown spin={this.state.showSpinner} itemList={this.state.marketList} onClick={this.handleChangeReferenceCoin} selectedItem={this.state.marketSelected}></DropDown>
                </div>

                <div className="input-group mb-1 mt-1" style={{ float: "right", width: 200 }}>
                    <input type="text" className="form-control" placeholder="Search crypto" aria-label="Search crypto" aria-describedby="basic-addon2" onChange={this.handleFilterChange}></input>
                </div>
                <div style={{ opacity: this.state.opacity }} >
                    <table className="table table-striped" >
                        <thead className="thead thead-light">
                            <tr>
                                <th scope="col" id="symbol" onClick={this.handleSort} className="tableTh">Symbol<Sorter sortDirection={this.state.sortDirection} visible={this.state.sorterVisibility[0].visibility} /></th>
                                <th scope="col" id="volume" onClick={this.handleSort} className="tableTh d-none d-md-table-cell" >Volume<Sorter sortDirection={this.state.sortDirection} visible={this.state.sorterVisibility[1].visibility} /></th>
                                <th scope="col" id="lower" onClick={this.handleSort} className="tableTh d-none d-md-table-cell">Lower<Sorter sortDirection={this.state.sortDirection} visible={this.state.sorterVisibility[2].visibility} /></th>
                                <th scope="col" id="higher" onClick={this.handleSort} className="tableTh d-none d-md-table-cell">Higher<Sorter sortDirection={this.state.sortDirection} visible={this.state.sorterVisibility[3].visibility} /></th>
                                <th scope="col" id="last" onClick={this.handleSort} className="tableTh">Last<Sorter sortDirection={this.state.sortDirection} visible={this.state.sorterVisibility[4].visibility} /></th>
                                <th scope="col" id="change" onClick={this.handleSort} className="tableTh">% change<Sorter sortDirection={this.state.sortDirection} visible={this.state.sorterVisibility[5].visibility} /></th>
                                <th scope="col" id="rsi">RSI / MACD</th>
                                <th>Future</th>
                                <th style={{ width: 20 }}></th>
                            </tr>
                        </thead>
                        <tbody>
                            {displayList}
                        </tbody>
                    </table>
                </div>
            </div>
        )
    }
}

//map the props of this class to the root redux state
const mapStateToProps = (state: any) => {
    return {
        symbolList: state.symbolList,
    }
}

const mapDispatchToProps = (dispatch: Dispatch) => {
    return {
        getSymbolList: (p: string) => dispatch<any>(binanceActionCreator.binanceActions.GetSymbolList(p)),
        sortList: (columnName: string, sortDirection: number) => dispatch<any>(binanceActionCreator.binanceActions.SortList(columnName, sortDirection)),
        filterList: (p: string) => dispatch<any>(binanceActionCreator.binanceActions.FilterList(p)),
        getIndicator: (symbol: string, interval: string) => dispatch<any>(binanceActionCreator.binanceActions.GetIndicator(symbol, interval)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)((BinanceMarket));
