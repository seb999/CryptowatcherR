import * as React from 'react';
import { coinTransfer } from '../../class/coinTransfer'
import Highcharts from 'highcharts/highstock'
import HighchartsReact from 'highcharts-react-official'

interface Props {
    data: Array<coinTransfer>,
    symbol: string,
    indicator : string
}

interface State {
    chart: any;
}

class CoinChart extends React.Component<Props, State> {
    constructor(props: any) {
        super(props);

        this.state= {
            chart: React.createRef(),
         }
    }

    componentDidUpdate(nextProps: any) {
        if (this.props != nextProps) {
            let chartObj = this.state.chart.current.chart;
            chartObj.showLoading();
            setTimeout(() => chartObj.hideLoading(), 1200);

            chartObj.yAxis.plotBands= [{
                from: 500,
                to: 3000,
                color: 'rgba(68, 170, 213, 0.2)',
                label: {
                    text: 'Last quarter year\'s value range'
                }
            }]
        }
        
    }

    render() {

        var ohlc = [] as any;
        var volume = [] as any;
        var rsi = [] as any;
        var macd = [] as any;

        this.props.data.map((data) => (
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
            title: { text: this.props.symbol },
            plotOptions: {
                candlestick: {
                    upColor: '#00e600',
                    color: '#ff0000',
                },
            },
            yAxis: {
                title: {
                    text: 'Exchange rate'
                },
            },
            tooltip: { split: false },
            // xAxis: {
            //     categories: 
            // },
        }

        if (this.props.indicator == "Volume") {
            options.yAxis = [
                { labels: { align: 'left' }, height: '80%' },
                { labels: { align: 'left' }, top: '80%', height: '20%', offset: 0 },
                
            ];
            options.series = [
                { type: 'candlestick', name: this.props.symbol, data: ohlc, yAxis: 0 },
                { type: 'line', name: 'Volume', data: volume, yAxis: 1 },
            ];
        }

        if (this.props.indicator == "Rsi") {
            options.yAxis = [
               
                { labels: { align: 'left' }, height: '80%' },
                { labels: { align: 'left' }, top: '80%', height: '20%', offset: 0 },
                { title: {text: 'RSI'}},
                {plotBands: [{
                    from: 30,
                    to: 70,
                    color: 'rgba(68, 170, 213, 0.2)',
                    label: {
                        text: 'Last quarter year\'s value range'
                    }
                }]},
            ];
            options.series = [
                { type: 'candlestick', name: this.props.symbol, data: ohlc, yAxis: 0 },
                { type: 'line', name: 'RSI', data: rsi, yAxis: 1 },
            ];
        }

        if (this.props.indicator == "Macd") {
            options.yAxis = [
                { labels: { align: 'left' }, height: '80%' },
                { labels: { align: 'left' }, top: '80%', height: '20%', offset: 0 },
            ];
            options.series = [
                { type: 'candlestick', name: this.props.symbol, data: ohlc, yAxis: 0 },
                { type: 'line', name: 'MACD', data: volume, yAxis: 1 },
            ];
        }

        return (
            <div>
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
        );
    }
}

export default CoinChart