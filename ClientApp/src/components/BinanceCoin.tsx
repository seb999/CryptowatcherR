import * as React from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { coinTransfer } from '../class/coinTransfer'
import * as binanceActionCreator from '../actions/actions';
import Highcharts from 'highcharts/highstock'
import HighchartsReact from 'highcharts-react-official'
import DropDown from './Element/DropDown'
import CoinChart from './Element/CoinChart'

interface AppFnProps {
    getCoin(symbol: string, interval: string): void;
    getPrediction(symbol: string): void;
}
interface AppObjectProps {
    coin: Array<coinTransfer>
    fullSymbol: string;
    prediction: Array<any>;
}

interface Props
    extends AppObjectProps, AppFnProps { }

interface State {
    // chartTypeSelected: any,
    // chartTypeList: Array<string>;
    chartIntervalSelected: string,
    chartIntervalList: Array<string>;
    chartIndicatorSelected: string,
    chartIndicatorList: Array<string>;
    pageFirstLoaded: boolean;
    showSpinner: boolean;
    RSI: number;
}

class BinanceCoin extends React.Component<Props, State>{
    constructor(props: any) {
        super(props);

        this.state = {
            // chartTypeSelected: "candlestick",
            // chartTypeList: ['candlestick', 'line', 'area'],
            chartIntervalSelected: "1d",
            chartIntervalList: ['1d', '12h', '8h', '6h', '4h', '2h', '1h', '30m', '15m', '5m'],
            chartIndicatorSelected: "Volume",
            chartIndicatorList: ['Volume', 'Rsi', 'Macd'],
            pageFirstLoaded: false,
            showSpinner: true,
            RSI: 0,
        };
    }

    componentDidMount() {
        //this.props.getCoin(this.props.fullSymbol, '1d');
        this.props.getCoin('BTCUSDT', '1d');
        this.props.getPrediction('BTCUSDT');
    }

    componentDidUpdate(nextProps: any) {
        if (this.props != nextProps) {
            this.setState({
                pageFirstLoaded: true,
                showSpinner: false,
                RSI: this.props.coin != undefined ? this.props.coin[this.props.coin.length-1].rsi : 0,
            })
        }
    }

    //There is a bug in highchart when change type. I keep the code for now
    // handleChartTypeChange = (e: any) => {
    //     this.setState({
    //         chartTypeSelected: e,
    //         chartOptions: {
    //             series: [
    //                 { data: this.props.ohlc, type: e}
    //             ]
    //         }
    //     });
    // }

    handleChartIntervalChange = (e: any) => {
        this.props.getCoin('BTCUSDT', e);
        this.setState({
            chartIntervalSelected: e,
        })
    }

    handleChartIndicatorChange = (e: any) => {
        this.setState({
            chartIndicatorSelected: e
        })
    }

    render() {
        let predictionList = this.props.prediction.map((model, index) => (
            <tr key={index}>
                <td style={{ fontSize: 'smaller' }}>{model.modelName}</td>
                <td><i className="fas fa-arrow-up" style={{ color: 'green' }}> </i> {model.futurPrice}</td>
            </tr>
        ));

        return (
            <div>
                <div className="row">
                    <div className="col-md-8">
                        <CoinChart data={this.props.coin} symbol={this.props.fullSymbol} indicator={this.state.chartIndicatorSelected}  ></CoinChart>
                    </div>

                    <div className="col-md-4">
                        <div className="row">
                            <div className="card mt-5" style={{ width: 100 + '%' }}>
                                <div className="card-body">
                                    <h5 className="card-title">Settings</h5>
                                    {/* <div className="row">
                                    <div className="col-md-5">Type</div>
                                    <div className="col-md-7">
                                        <DropDown itemList={this.state.chartTypeList} onClick={this.handleChartTypeChange} selectedItem={this.state.chartTypeSelected}></DropDown>
                                    </div>
                                </div> */}
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
                        </div>
                        <div className="row">
                            <div className="card mt-3" style={{ width: 100 + '%' }}>
                                <div className="card-body">
                                    <h5 className="card-title">AI tendancy prediction</h5>
                                    {this.state.showSpinner ? <div className="d-flex justify-content-center"><span className="spinner-border text-info" role="status" aria-hidden="true"></span></div> : ""}
                                    {this.props.prediction.length > 0 ?
                                        <table className="table" >
                                            <thead className="thead">
                                                <tr>
                                                    <th>Model</th>
                                                    <th>Prediction, metrics</th>
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
                        </div>
                        <div className="row">
                            <div className="card mt-3" style={{ width: 100 + '%' }}>
                                <div className="card-body">
                                    <h5 className="card-title">Indicators</h5>
                                    {this.state.showSpinner ? <div className="d-flex justify-content-center"><span className="spinner-border text-info" role="status" aria-hidden="true"></span></div> : ""}
                                    <div className="row">
                                        <div className="col-md-5">Rsi(14)</div>
                                        {console.log(this.props.coin)}
                                        <div className="col-md-7">{this.state.RSI}</div>
                                    </div>
                                    <div className="row">
                                        <div className="col-md-5">Macd(12,26)</div>
                                        <div className="col-md-7">--</div>
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
        fullSymbol: state.selectedCoin,
        coin: state.coin,
        prediction: state.prediction,
    }
}

const mapDispatchToProps = (dispatch: Dispatch) => {
    return {
        getCoin: (symbol: string, interval: string) => dispatch<any>(binanceActionCreator.binanceActions.GetCoin(symbol, interval)).then(() => { }),
        getPrediction: (symbol: string) => dispatch<any>(binanceActionCreator.aiActions.GetPrediction(symbol))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(BinanceCoin)