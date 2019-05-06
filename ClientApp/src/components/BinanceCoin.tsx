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
}
interface AppObjectProps {
    coin: Array<coinTransfer>
    fullSymbol: string;
}

interface Props
    extends AppObjectProps,
    AppFnProps { }

interface State {
    chartTypeSelected: any,
    chartTypeList: Array<string>;
    chartIntervalSelected: string,
    chartIntervalList: Array<string>;
    chartIndicatorSelected: string,
    chartIndicatorList: Array<string>;
}

class BinanceCoin extends React.Component<Props, State>{
    constructor(props: any) {
        super(props);

        this.state = {
            chartIntervalSelected: "1d",
            chartTypeSelected: "candlestick",
            chartIndicatorSelected: "--",
            chartTypeList: ['candlestick', 'line', 'area'],
            chartIntervalList: ['1d', '12h', '8h' , '6h', '4h', '2h', '1h', '30m', '15m', '5m'],
            chartIndicatorList: ['--', 'Rsi',  'Macd'],
        }
    }

    componentDidMount() {
        //this.props.getCoin(this.props.fullSymbol, '1d');
        this.props.getCoin('BTCUSDT', '1d');
    }

    handleChartTypeChange = (e: any) => {
        this.setState({
            chartTypeSelected: e
        })
    }

    handleChartIntervalChange = (e: any) => {
        this.setState({
            chartIntervalSelected: e
        })
    }

    handleChartIndicatorChange = (e: any) => {
        this.setState({
            chartIndicatorSelected: e
        })
    }

    render() {

        var ohlc = [] as any;
        var volume = [] as any;
        var rsi = [] as any;

      

        console.log(ohlc);

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
        console.log(ohlc);
        let options: Highcharts.Options = {
            title: {
                text: this.props.fullSymbol
            },
            // plotOptions: {
            //     candlestick: {
            //         upColor: '#00e600',
            //         color: '#ff0000',
            //     },

            // },
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
                    type: this.state.chartTypeSelected,
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

       // options.series.remove();

        return (
            <div>
                <div className="row">
                    <div className="col-md-8">
                        <HighchartsReact
                            highcharts={Highcharts}
                            containerProps={{ style: { height: "600px" } }}
                            constructorType={'stockChart'}
                            options={options}
                        />
                    </div>
                    <div className="col-md-4">
                        <div className="row">
                            <div className="card mt-5" style={{ width: 18 + 'rem' }}>
                                <div className="card-body">
                                    <h5 className="card-title">Chart settings</h5>
                                    <div className="row">
                                        <div className="col-md-5">Type</div>
                                        <div className="col-md-7">
                                            <DropDown itemList={this.state.chartTypeList} onClick={this.handleChartTypeChange} selectedItem={this.state.chartTypeSelected}></DropDown>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-md-5">Interval</div>
                                        <div className="col-md-7"><DropDown itemList={this.state.chartIntervalList} onClick={this.handleChartIntervalChange} selectedItem={this.state.chartIntervalSelected}></DropDown></div>
                                    </div>
                                    <div className="row">
                                        <div className="col-md-5">indicators</div>
                                        <div className="col-md-7">
                                            <DropDown itemList={this.state.chartIndicatorList} onClick={this.handleChartIndicatorChange} selectedItem={this.state.chartIndicatorSelected}></DropDown>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="card mt-3" style={{ width: 18 + 'rem' }}>
                                <div className="card-body">
                                    <h5 className="card-title">AI prediction</h5>
                                    <h6 className="card-subtitle mb-2 text-muted">Card subtitle</h6>
                                    <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
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
    }
}

const mapDispatchToProps = (dispatch: Dispatch) => {
    return {
        getCoin: (symbol: string, interval: string) => dispatch<any>(binanceActionCreator.default.binanceActions.GetCoin(symbol, interval)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(BinanceCoin)