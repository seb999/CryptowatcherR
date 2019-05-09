import * as React from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { coinTransfer } from '../class/coinTransfer'
import * as binanceActionCreator from '../actions/actions';
import Highcharts from 'highcharts/highstock'
import HighchartsReact from 'highcharts-react-official'
import DropDown from './Element/DropDown'

interface AppFnProps {
    getCoin(symbol: string, interval: string): void;
    getPrediction(symbol: string): void;
}
interface AppObjectProps {
    coin: Array<coinTransfer>
    fullSymbol: string;
    prediction: Array<any> ;
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
    chart: any;
    pageFirstLoaded : boolean;
}

class BinanceCoin extends React.Component<Props, State>{

    constructor(props: any) {
        super(props);

        this.state = {
            // chartTypeSelected: "candlestick",
            // chartTypeList: ['candlestick', 'line', 'area'],
            chartIntervalSelected: "1d",
            chartIntervalList: ['1d', '12h', '8h', '6h', '4h', '2h', '1h', '30m', '15m', '5m'],
            chartIndicatorSelected: "--",
            chartIndicatorList: ['--', 'Rsi', 'Macd'],
            chart: React.createRef(),
            pageFirstLoaded : false
        };
    }

    componentDidMount() {
        //this.props.getCoin(this.props.fullSymbol, '1d');
        this.props.getCoin('ETHUSDT', '1d');
        this.props.getPrediction('BTCUSDT');

        let chartObj = this.state.chart.current.chart;
        chartObj.showLoading();
        setTimeout(() => chartObj.hideLoading(), 1000);

        
    }

    componentDidUpdate(nextProps: any){
        if(this.props != nextProps)
        {
            this.setState ({
                pageFirstLoaded : true
            })
        }
    }

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
        this.props.getCoin('ETHUSDT', e);

        this.setState({
            chartIntervalSelected: e,
        })

        let chartObj = this.state.chart.current.chart;
        chartObj.showLoading();
        setTimeout(() => chartObj.hideLoading(), 1200);
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
                <td> <i className="fas fa-arrow-up" style={{ color: 'green' }}> </i> {model.futurPrice}</td>
            </tr>
        ));

        var ohlc = [] as any;
        var volume = [] as any;
        var rsi = [] as any;

        this.props.coin.map((data) => (
            ohlc.push([
                data.closeTime,
                data.open,
                data.high,
                data.low,
                data.close
            ]),
            volume.push([
                data.closeTime,
                data.volume
            ]),
            rsi.push([
                data.closeTime,
                data.rsi
            ])
        ));

        let options: Highcharts.Options = {
            chart: {
                events: {
                    load() {
                        this.showLoading();
                        setTimeout(this.hideLoading.bind(this), 1200);
                    }
                }
            },
            title: {
                text: this.props.fullSymbol
            },
            plotOptions: {
                candlestick: {
                    upColor: '#00e600',
                    color: '#ff0000',
                },
            },
            yAxis: [{
                labels: {
                    align: 'left'
                },
                height: '60%',
                resize: {
                    enabled: true
                }
            }, {
                labels: {
                    align: 'left'
                },
                top: '60%',
                height: '15%',
                offset: 0
            },
            {
                labels: {
                    align: 'left'
                },
                top: '75%',
                height: '15%',
                offset: 0
            }],
            tooltip: {
                split: false
            },
            series: [
                {
                    type: 'candlestick',
                    name: this.props.fullSymbol,
                    data: ohlc
                },
                {
                    type: 'column',
                    name: 'Volume',
                    data: volume,
                    yAxis: 1
                },
                {
                    type: 'line',
                    name: 'RSI',
                    data: volume,
                    yAxis: 2,
                }
            ]
        }

        return (
            <div>
                <div className="row">
                    <div className="col-md-8">
                        <HighchartsReact
                            options={options}
                            highcharts={Highcharts}
                            constructorType={'stockChart'}
                            allowChartUpdate={true}
                            updateArgs={[true, true, false]}
                            containerProps={{ style: { height: "600px" } }}
                            ref={this.state.chart}
                        />
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

                                    {this.props.prediction.length>0 ?  
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