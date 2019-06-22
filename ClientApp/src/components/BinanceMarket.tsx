import * as React from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import Toast from 'react-bootstrap/Toast';
import * as binanceActionCreator from '../actions/actions';
import { symbolTransfer } from '../class/symbolTransfer'
import './Css/BinanceMarket.css';
import Sorter from './Element/Sorter'
import DropDown from './Element/DropDown'
import CoinIcon from './Element/CoinIcon'
import Autocomplete from './Element/Autocomplete';

interface AppFnProps {
    getSymbolList(baseMarket: string): void;
    getNewCurrencyList(): void;
    filterList(symbol: string): void;
    filterList2(symbolList: []): void;
    sortList(columnName: string, sortDirection: number): void;
    getIndicator(symbol: string, interval: string): void;
}

interface AppObjectProps {
    history?: any;
    symbolList: Array<symbolTransfer>;
    symbolListInitial: Array<symbolTransfer>;
    newCurrencyList: Array<string>;
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
    showToast: boolean;
    pageFirstLoaded: boolean;
}

class BinanceMarket extends React.Component<Props, State>{
    constructor(props: any) {
        super(props)

        this.state = {
            showToast: false,
            pageFirstLoaded: false,
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
        this.props.getNewCurrencyList();

       // $('[data-toggle="tooltip"]').tooltip();
    }

    componentDidUpdate(nextProps: any) {
        if (this.props != nextProps) {

            this.setState({
                pageFirstLoaded: true,
                showSpinner: false,
                opacity: 1
            })

            if (!this.state.pageFirstLoaded) {
                this.props.newCurrencyList.length > 0 ? this.setState({ showToast: true }) : this.setState({ showToast: false });
            }
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
        this.props.filterList2(e);
    }

    handleShowCoinDetail = (symbol: any) => {
        this.props.history.push("/BinanceCoin/" + symbol);
    }

    handleCalculateIndicators = (symbol: any) => {
        this.props.getIndicator(symbol, '1d');
    }

    render() {
        const handleClose = () => this.setState({ showToast: false });

        let displayList = this.props.symbolList.map((coin, index) => (
            <tr key={coin.symbol} className="table-dark zoom">
                <td>
                    <button style={{ marginRight: 10 }} className="btn btn-outline-info btn-sm" onClick={() => this.handleShowCoinDetail(coin.symbol)}><i className="fa fa-chart-line"></i></button>
                    <CoinIcon symbol={coin.symbolShort} width={20} height={20}></CoinIcon>
                    {coin.symbolShort}
                </td>
                <td className="d-none d-md-table-cell">{Math.round(coin.volume).toLocaleString()}</td>
                <td className="d-none d-md-table-cell">{coin.lowPrice}</td>
                <td className="d-none d-md-table-cell">{coin.highPrice}</td>
                <td>{coin.lastPrice}</td>
                <td className={coin.priceChangePercent >= 0 ? "Up" : "Down"}>{coin.priceChangePercent}</td>
                <td className="d-none d-md-table-cell">
                    {coin.rsi === 0 ?
                        <div>
                            <div style={{ float: "left" }}>...</div>
                            <div style={{ float: "right" }}>...</div>
                        </div>
                        :
                        <div>
                            <div style={{ float: "left" }}>{coin.rsi}</div>
                            <div style={{ fontSize: 10, float: "right" }}> Macd {coin.macd} <br />Sign {coin.macdSign} <br />Hist {coin.macdHist}
                            </div>
                        </div>
                    }
                </td>
                <td className="d-none d-md-table-cell">
                    {coin.prediction === null ? "..." :
                        coin.prediction[0].futurePrice == 0 ? "N/A" :
                            coin.prediction[0].futurePrice > 0 ? <i className="fas fa-arrow-up" style={{ color: 'green' }}></i> :
                                coin.prediction[0].futurePrice < 0 ? <i className="fas fa-arrow-down" style={{ color: 'red' }}></i> : ""
                    }
                </td>
                <td className="d-none d-md-table-cell"><button style={{ marginLeft: 10, border: 0 }} data-toggle="tooltip" title="Calculate RSI / MACD and Future" className="btn btn-outline-info btn-sm" onClick={() => this.handleCalculateIndicators(coin.symbol)}><i className="fas fa-sync" ></i></button> </td>
            </tr>
        ));

        return (
            <div>
                <div style={{ position: "absolute", zIndex: 99, top: 150, right: 10 }}>
                    <Toast onClose={handleClose} show={this.state.showToast} transition={false} delay={6000} autohide>
                        <Toast.Header className="bg-dark light">
                           
                            <strong className="mr-auto">Info</strong>
                            <small>Binance</small>
                        </Toast.Header>
                        <Toast.Body>New cryptos : {this.props.newCurrencyList.map((item) => (item + " "))}</Toast.Body>
                    </Toast>

                </div>
                <div className="float-md-left mb-1">
                    <DropDown spin={this.state.showSpinner} itemList={this.state.marketList} onClick={this.handleChangeReferenceCoin} selectedItem={this.state.marketSelected}></DropDown>
                </div>
                <div className="mb-1 float-md-right col-md-3 pr-0 pl-0">
                    <Autocomplete symbolList={this.props.symbolListInitial} onClick={this.handleFilterChange} multiple={true} />
                </div>
                <div style={{ opacity: this.state.opacity }} >
                    <table className="table table-cryptowatcheR" >
                        <thead className="thead thead-light">
                            <tr>
                                <th scope="col" id="symbol" onClick={this.handleSort} className="tableTh">Symbol<Sorter sortDirection={this.state.sortDirection} visible={this.state.sorterVisibility[0].visibility} /></th>
                                <th scope="col" id="volume" onClick={this.handleSort} className="tableTh d-none d-md-table-cell" >Volume<Sorter sortDirection={this.state.sortDirection} visible={this.state.sorterVisibility[1].visibility} /></th>
                                <th scope="col" id="lower" onClick={this.handleSort} className="tableTh d-none d-md-table-cell">Lower<Sorter sortDirection={this.state.sortDirection} visible={this.state.sorterVisibility[2].visibility} /></th>
                                <th scope="col" id="higher" onClick={this.handleSort} className="tableTh d-none d-md-table-cell">Higher<Sorter sortDirection={this.state.sortDirection} visible={this.state.sorterVisibility[3].visibility} /></th>
                                <th scope="col" id="last" onClick={this.handleSort} className="tableTh ">Last<Sorter sortDirection={this.state.sortDirection} visible={this.state.sorterVisibility[4].visibility} /></th>
                                <th scope="col" id="change" onClick={this.handleSort} className="tableTh">% change<Sorter sortDirection={this.state.sortDirection} visible={this.state.sorterVisibility[5].visibility} /></th>
                                <th scope="col" id="rsi" className="d-none d-md-table-cell">RSI / MACD</th>
                                <th className="d-none d-md-table-cell">Future</th>
                                <th className="d-none d-md-table-cell" style={{ width: 20 }}></th>
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
        symbolListInitial: state.symbolListInitial,
        newCurrencyList: state.newCurrencyList,
    }
}

const mapDispatchToProps = (dispatch: Dispatch) => {
    return {
        getSymbolList: (p: string) => dispatch<any>(binanceActionCreator.binanceActions.GetSymbolList(p)),
        getNewCurrencyList: () => dispatch<any>(binanceActionCreator.binanceActions.GetNewCurrencyList()),
        sortList: (columnName: string, sortDirection: number) => dispatch<any>(binanceActionCreator.binanceActions.SortList(columnName, sortDirection)),
        filterList: (p: string) => dispatch<any>(binanceActionCreator.binanceActions.FilterList(p)),
        getIndicator: (symbol: string, interval: string) => dispatch<any>(binanceActionCreator.binanceActions.GetIndicator(symbol, interval)),
        filterList2: (p: []) => dispatch<any>(binanceActionCreator.binanceActions.FilterList2(p)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)((BinanceMarket));
