import * as React from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { coinTransfer } from '../class/coinTransfer'
import * as binanceActionCreator from '../actions/actions';
import DropDown from './Element/DropDown'
import CoinChart from './Element/CoinChart'
import { coinTickerTransfer } from '../class/coinTickerTransfer'
import './Css/BinanceCoin.css';

interface AppFnProps {
    getChartData(symbol: string, interval: string): void;
    getPrediction(symbol: string): void;
    getSymbolList(baseMarket: string): void;
    getSymbol(symbol: string): void;
    filterList(symbol: string): void;
}
interface AppObjectProps {
    match: any;
    coin: Array<coinTransfer>
    prediction: Array<any>;
    symbolList: Array<coinTickerTransfer>;

    rsi: number;
    macd: number;
    macdSign: number;
    macdHist: number;
    priceChangePercent: number,
    volume: number,
    lastPrice: number,
}

interface Props
    extends AppObjectProps, AppFnProps { }

interface State {
    selectedSymbol: string
    chartIntervalSelected: string,
    chartIntervalList: Array<string>;
    chartIndicatorSelected: string,
    chartIndicatorList: Array<string>;
    pageFirstLoaded: boolean;
    showSpinner: boolean;
}

class BinanceCoin extends React.Component<Props, State>{
    constructor(props: any) {
        super(props);

        this.state = {
            chartIntervalSelected: "1d",
            chartIntervalList: ['1d', '12h', '8h', '6h', '4h', '2h', '1h', '30m', '15m', '5m'],
            chartIndicatorSelected: "Volume",
            chartIndicatorList: ['Volume', 'Rsi', 'Macd'],
            pageFirstLoaded: false,
            showSpinner: true,
            selectedSymbol: "",
        };
    }

    componentDidMount() {
        this.props.getSymbolList("USDT");
        this.props.getSymbol(this.props.match.params.symbol);
        this.props.getChartData(this.props.match.params.symbol, '1d');
        this.props.getPrediction(this.props.match.params.symbol);
        this.setState({
            selectedSymbol: this.props.match.params.symbol,
        })
    }

    componentDidUpdate(nextProps: any) {
        if (this.props != nextProps) {
            this.setState({
                pageFirstLoaded: true,
                showSpinner: false,
            })
        }
    }

    handleFilterChange = (e: any) => {
        this.props.filterList(e.target.value);
    }

    handleChartIntervalChange = (e: any) => {
        this.props.getChartData(this.state.selectedSymbol, e);
        this.setState({
            chartIntervalSelected: e,
        })
    }

    handleChartIndicatorChange = (e: any) => {
        this.setState({
            chartIndicatorSelected: e
        })
    }

    handleReloadSymbol = (p: any) => {
        this.props.getSymbol(this.state.selectedSymbol);
        this.setState({
            showSpinner: true,
        })
    }

    handleChangeSymbol = (selectedSymbol: any) => {
        this.setState({
            selectedSymbol: selectedSymbol,
            showSpinner: true,
        })
        this.props.getChartData(selectedSymbol, '1d');
        this.props.getPrediction(selectedSymbol);
        this.props.getSymbol(selectedSymbol);
    }

    render() {
        let displayPriceChangePourcentage = this.props.priceChangePercent >= 0 ?
            <h5 className="Up card-title">{this.props.priceChangePercent} %</h5> :
            <h5 className="Down card-title">{this.props.priceChangePercent} %</h5>

        let displaySymbolList = this.props.symbolList.map((coin, index) => (
            <button type="button" className="list-group-item list-group-item-action" onClick={() => this.handleChangeSymbol(coin.symbol)} >
                {coin.symbol}
            </button>
        ));

        let predictionList = this.props.prediction.map((model, index) => (
            <tr key={index}>
                <td style={{ fontSize: 'smaller' }}>{model.modelName}</td>
                <td style={{ fontSize: 'smaller' }}>
                    {model.futurPrice > 0 ? <i className="fas fa-arrow-up" style={{ color: 'green' }}></i> : ""}
                    {model.futurPrice < 0 ? <i className="fas fa-arrow-down" style={{ color: 'red' }}></i> : ""}
                    &nbsp;{model.futurPrice}
                </td>
            </tr>
        ));

        return (

            <div>
                <div className="row">

                    {/* Coin selector panel */}
                    <div className="col-md-2 pr-1 pl-1">
                        <div className="card mt-5 mb-3 bg-light" style={{ width: 100 + '%' }}>
                            <div className="card-header">
                                {this.state.selectedSymbol}
                                <button style={{ marginLeft: 3, border: 0 }} data-toggle="tooltip" title="Reload" className="btn btn-outline-info btn-sm" onClick={this.handleReloadSymbol}><i className="fas fa-sync" ></i></button>
                                {this.state.showSpinner ? <div className="d-flex float-right"><span className="spinner-border text-info" role="status" aria-hidden="true"></span></div> : ""}

                            </div>
                            <div className="card-body" style={{ paddingRight: 5 }}>
                                {displayPriceChangePourcentage}
                                <div className="card-text"> {this.props.lastPrice}</div>
                            </div>
                        </div>
                        <div className="list-group mb-2">
                            <div className="input-group mb-2">
                                <input type="text" className="form-control" placeholder="Search..." aria-label="Search crypto" aria-describedby="basic-addon2" onChange={this.handleFilterChange}></input>
                            </div>
                            <div className="ScrollBar">
                                {displaySymbolList}
                            </div>

                        </div>
                    </div>

                    {/* Chart panel */}
                    <div className="col-md-7">
                        <div className="card mt-5 pr-1 pl-1" style={{ width: 100 + '%' }}>
                            <div className="card-body">
                                <CoinChart data={this.props.coin} symbol={this.state.selectedSymbol} indicator={this.state.chartIndicatorSelected}  ></CoinChart>
                            </div>
                        </div>
                    </div>

                    {/* Settings panel */}
                    <div className="col-md-3 pr-1 pl-1">
                        <div className="card mt-5" style={{ width: 100 + '%' }}>
                            <div className="card-body">
                                <h5 className="card-title">Settings</h5>
                                <div className="row">
                                    <div className="col-md-5">Interval</div>
                                    <div className="col-md-7"><DropDown spin={false} itemList={this.state.chartIntervalList} onClick={this.handleChartIntervalChange} selectedItem={this.state.chartIntervalSelected}></DropDown></div>
                                </div>
                                <div className="row">
                                    <div className="col-md-5">indicators</div>
                                    <div className="col-md-7">
                                        <DropDown spin={false} itemList={this.state.chartIndicatorList} onClick={this.handleChartIndicatorChange} selectedItem={this.state.chartIndicatorSelected}></DropDown>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Prediction panel */}
                        <div className="card mt-3 pr-1 pl-1" style={{ width: 100 + '%' }}>
                            <div className="card-body">
                                <h5 className="card-title">
                                    AI prediction
                                    {this.state.showSpinner ? <div className="d-flex float-right"><span className="spinner-border text-info" role="status" aria-hidden="true"></span></div> : ""}
                                </h5>
                                {this.props.prediction.length > 0 ?
                                    <table className="table" >
                                        <thead className="thead">
                                            <tr>
                                                <th>Model</th>
                                                <th>Future</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {predictionList}
                                        </tbody>
                                    </table>
                                    : this.state.pageFirstLoaded == true ?
                                        <p ><i className="fas fa-exclamation-circle btn-outline-info"></i> No AI model available at the moment </p>
                                        : <div></div>}
                            </div>
                        </div>

                        {/* Indicators panel */}
                        <div className="card mt-3 mb-3 pr-1 pl-1" style={{ width: 100 + '%' }}>
                            <div className="card-body">
                                <h5 className="card-title">
                                    Indicators
                                    {this.state.showSpinner ? <div className="d-flex float-right"><span className="spinner-border text-info" role="status" aria-hidden="true"></span></div> : ""}

                                </h5>
                                <div className="row" style={{ fontSize: 'smaller' }}>
                                    <div className="col-md-8">Rsi(14)</div>
                                    <div className="col-md-4">
                                        {this.props.rsi >= 70 ? <i className="fas fa-arrow-down" style={{ color: 'red' }}></i> : ""}
                                        {this.props.rsi <= 30 ? <i className="fas fa-arrow-up" style={{ color: 'green' }}></i> : ""}
                                        {this.props.rsi >= 30 && this.props.rsi <= 70 ? <i className="fas fa-arrows-alt" style={{ color: 'orange' }}></i> : ""}
                                        &nbsp;{this.props.rsi}
                                    </div>
                                </div>
                                <div className="row" style={{ fontSize: 'smaller' }}>
                                    <div className="col-md-8">Macd(12,26) Hist</div>
                                    <div className="col-md-4 ">
                                        {this.props.macdHist > 0 ? <i className="fas fa-arrow-up" style={{ color: 'green' }}></i> : ""}
                                        {this.props.macdHist <= 0 ? <i className="fas fa-arrow-down" style={{ color: 'red' }}></i> : ""}
                                        &nbsp;{this.props.macdHist}
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state: any) => {
    return {
        coin: state.coin,
        symbolList: state.symbolList,
        prediction: state.prediction,

        rsi: state.rsi,
        // macd: state.macd,
        // macdSign: state.macdSign,
        macdHist: state.macdHist,
        priceChangePercent: state.priceChangePercent,
        // volume: state.volume,
        lastPrice: state.lastPrice,
    }
}

const mapDispatchToProps = (dispatch: Dispatch) => {
    return {
        getChartData: (symbol: string, interval: string) => dispatch<any>(binanceActionCreator.binanceActions.GetChartData(symbol, interval)).then(() => { }),
        getSymbolList: (p: string) => dispatch<any>(binanceActionCreator.binanceActions.GetSymbolList(p)),
        getSymbol: (p: string) => dispatch<any>(binanceActionCreator.binanceActions.GetSymbol(p)),
        getPrediction: (symbol: string) => dispatch<any>(binanceActionCreator.aiActions.GetPrediction(symbol)),
        filterList: (p: string) => dispatch<any>(binanceActionCreator.binanceActions.FilterList(p)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(BinanceCoin)