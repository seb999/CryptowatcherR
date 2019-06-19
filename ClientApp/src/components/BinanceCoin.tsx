import * as React from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { coinTransfer } from '../class/coinTransfer'
import * as binanceActionCreator from '../actions/actions';
import DropDown from './Element/DropDown'
import CoinChart from './Element/CoinChart'
import GaugeIndicator from './Element/GaugeIndicator'
import GaugePrediction from './Element/GaugePrediction'
import Autocomplete from './Element/Autocomplete'
import { symbolTransfer } from '../class/symbolTransfer'
import { predictionTransfer } from '../class/predictionTransfer'
import './Css/BinanceCoin.css';

interface AppFnProps {
    getChartData(symbol: string, interval: string): void;
    getData(symbol: string, interval: string): void;
    getSymbolList(baseMarket: string): void;
    filterList(symbol: string): void;
}
interface AppObjectProps {
    match: any;
    prediction: Array<predictionTransfer>;
    symbolList: Array<symbolTransfer>;
    symbolData: symbolTransfer,
    chartData: Array<coinTransfer>;
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
       // this.props.getData(this.props.match.params.symbol, '1d');
       // this.props.getSymbolList("USDT");
       // this.props.getChartData(this.props.match.params.symbol, '1d');
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
        this.props.getData(this.state.selectedSymbol, this.state.chartIntervalSelected);
        this.setState({
            showSpinner: true,
        })
    }

    handleChangeSymbol = (p: any) => {
        if(p.length == 0) return;
        var selectedSymbol = p[0].symbol;
        this.setState({
            selectedSymbol: selectedSymbol,
            showSpinner: true,
        })
        this.props.getChartData(selectedSymbol, this.state.chartIntervalSelected);
        this.props.getData(selectedSymbol, this.state.chartIntervalSelected);
    }

    render() {
        let displayPriceChangePourcentage = this.props.symbolData.priceChangePercent >= 0 ?
            <h5 className="Up card-title">{this.props.symbolData.priceChangePercent} %</h5> :
            <h5 className="Down card-title">{this.props.symbolData.priceChangePercent} %</h5>

        let predictionList = this.props.prediction.map((model, index) => (
            <tr key={index}>
                <td style={{ fontSize: 'smaller' }}>{model.modelName}</td>
                <td style={{ fontSize: 'smaller' }}>
                    {model.futurePrice > 0 ? <i className="fas fa-arrow-up" style={{ color: 'green' }}></i> : ""}
                    {model.futurePrice < 0 ? <i className="fas fa-arrow-down" style={{ color: 'red' }}></i> : ""}
                    &nbsp;{model.futurePrice}
                </td>
            </tr>
        ));

        return (

            <div>

                <div className="row mr-1 ml-1">

                    {/* Coin selector panel */}
                    <div className="col-md-2 pr-1 pl-1">
                        <div className="card mb-3" style={{ width: 100 + '%' }}>
                            <div className="card-header">
                                {this.state.selectedSymbol}
                                <button style={{ marginLeft: 3, border: 0 }} data-toggle="tooltip" title="Reload" className="btn btn-outline-info btn-sm" onClick={this.handleReloadSymbol}><i className="fas fa-sync" ></i></button>
                                {this.state.showSpinner ? <div className="d-flex float-right"><span className="spinner-border text-info" role="status" aria-hidden="true"></span></div> : ""}

                            </div>
                            <div className="card-body" style={{ paddingRight: 5 }}>
                                {displayPriceChangePourcentage}
                                <div className="card-text"> {this.props.symbolData.lastPrice}</div>
                            </div>
                        </div>
                        <Autocomplete symbolList={this.props.symbolList} onClick={this.handleChangeSymbol} multiple={false} />
                    </div>

                    {/* Chart panel */}
                    <div className="col-md-7 pr-1 pl-1">
                        <div className="card mb-3">
                            <div className="card-body">
                                <div className="row">
                                    <div className="col-md-2">
                                        Interval  <DropDown spin={false} itemList={this.state.chartIntervalList} onClick={this.handleChartIntervalChange} selectedItem={this.state.chartIntervalSelected}></DropDown>
                                    </div>

                                    <div className="col-md-3">
                                        Indicators <DropDown spin={false} itemList={this.state.chartIndicatorList} onClick={this.handleChartIndicatorChange} selectedItem={this.state.chartIndicatorSelected}></DropDown>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-12">
                                        <CoinChart data={this.props.chartData} symbol={this.state.selectedSymbol} indicator={this.state.chartIndicatorSelected}  ></CoinChart>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>


                    <div className="col-md-3 pr-1 pl-1">
                        {/* Prediction panel */}
                        <div className="card" style={{ width: 100 + '%' }}>
                            <div className="card-body">
                                <h5 className="card-title">
                                    AI prediction
                                    {this.state.showSpinner ? <div className="d-flex float-right"><span className="spinner-border text-info" role="status" aria-hidden="true"></span></div> : ""}
                                    <GaugePrediction predictionList={this.props.prediction}/>
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
                        <div className="card mt-3 mb-3" style={{ width: 100 + '%' }}>
                            <div className="card-body">
                                <h5 className="card-title">
                                    Indicators
                                    {this.state.showSpinner ? <div className="d-flex float-right"><span className="spinner-border text-info" role="status" aria-hidden="true"></span></div> : ""}
                                    <GaugeIndicator indicatorList={this.props.symbolData} />
                                </h5>
                                <div className="row" style={{ fontSize: 'smaller' }}>
                                    <div className="col-md-8">Rsi(14)</div>
                                    <div className="col-md-4">
                                        {this.props.symbolData.rsi >= 70 ? <i className="fas fa-arrow-down" style={{ color: 'red' }}></i> : ""}
                                        {this.props.symbolData.rsi <= 30 ? <i className="fas fa-arrow-up" style={{ color: 'green' }}></i> : ""}
                                        {this.props.symbolData.rsi >= 30 && this.props.symbolData.rsi <= 70 ? <i className="fas fa-arrows-alt" style={{ color: 'orange' }}></i> : ""}
                                        &nbsp;{this.props.symbolData.rsi}
                                    </div>
                                </div>
                                <div className="row" style={{ fontSize: 'smaller' }}>
                                    <div className="col-md-8">Macd(12,26) Hist</div>
                                    <div className="col-md-4 ">
                                        {this.props.symbolData.macdHist > 0 ? <i className="fas fa-arrow-up" style={{ color: 'green' }}></i> : ""}
                                        {this.props.symbolData.macdHist <= 0 ? <i className="fas fa-arrow-down" style={{ color: 'red' }}></i> : ""}
                                        &nbsp;{this.props.symbolData.macdHist}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div >

        )
    }
}

const mapStateToProps = (state: any) => {
    return {
        symbolList: state.symbolList,
        prediction: state.prediction,
        symbolData: state.symbolData,
        chartData: state.chartData,
    }
}

const mapDispatchToProps = (dispatch: Dispatch) => {
    return {
        getChartData: (symbol: string, interval: string) => dispatch<any>(binanceActionCreator.binanceActions.GetChartData(symbol, interval)).then(() => { }),
        getData: (symbol: string, interval: string) => dispatch<any>(binanceActionCreator.binanceActions.GetData(symbol, interval)).then(() => { }),
        getSymbolList: (p: string) => dispatch<any>(binanceActionCreator.binanceActions.GetSymbolList(p)),
        filterList: (p: string) => dispatch<any>(binanceActionCreator.binanceActions.FilterList(p)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(BinanceCoin)