import * as React from 'react';
import { coinTransfer } from '../../class/coinTransfer'
import Highcharts from 'highcharts/highstock'
import HighchartsReact from 'highcharts-react-official'

var ttt : any;
ttt = {
    colors: ['#058DC7', '#50B432', '#ED561B', '#DDDF00', '#24CBE5', '#64E572', 
             '#FF9655', '#FFF263', '#6AF9C4'],
    chart: {
        backgroundColor: {
            linearGradient: [0, 0, 500, 500],
            stops: [
                [0, 'rgb(46, 53, 82)'],
                [1, 'rgb(46, 53, 82)']
            ]
        },
    },
    title: {
        style: {
            color: 'white',
            font: 'bold 16px "Trebuchet MS", Verdana, sans-serif'
        }
    },
    subtitle: {
        style: {
            color: '#666666',
            font: 'bold 12px "Trebuchet MS", Verdana, sans-serif'
        }
    },

    tooltip: {
        borderWidth: 0,
        backgroundColor: 'rgba(219,219,216,0.8)',
        shadow: false
    },

    yAxis: {
        gridLineColor: '#707073',
        labels: {
            style: {
                color: '#E0E0E3'
            }
        },
        lineColor: '#707073',
        minorGridLineColor: '#505053',
        tickColor: '#707073',
        tickWidth: 1,
        title: {
            style: {
                color: '#A0A0A3'
            }
        }
    },


    xAxis: {
        gridLineColor: '#707073',
        labels: {
            style: {
                color: '#E0E0E3'
            }
        },
        lineColor: '#707073',
        minorGridLineColor: '#505053',
        tickColor: '#707073',
        title: {
            style: {
                color: '#A0A0A3'

            }
        }
    },

    credits: {
        style: {
            color: '#666'
        }
    },
    labels: {
        style: {
            color: '#707073'
        }
    },

    drilldown: {
        activeAxisLabelStyle: {
            color: '#F0F0F3'
        },
        activeDataLabelStyle: {
            color: '#F0F0F3'
        }
    },

    rangeSelector: {
        buttonTheme: {
            fill: '#505053',
            stroke: '#000000',
            style: {
                color: '#CCC'
            },
            states: {
                hover: {
                    fill: '#707073',
                    stroke: '#000000',
                    style: {
                        color: 'white'
                    }
                },
                select: {
                    fill: '#000003',
                    stroke: '#000000',
                    style: {
                        color: 'white'
                    }
                }
            }
        },
        inputBoxBorderColor: '#505053',
        inputStyle: {
            backgroundColor: '#333',
            color: 'silver'
        },
        labelStyle: {
            color: 'silver'
        },

        navigator: {
            handles: {
                backgroundColor: '#666',
                borderColor: '#AAA'
            },
            outlineColor: '#CCC',
            maskFill: 'rgba(255,255,255,0.1)',
            series: {
                color: '#7798BF',
                lineColor: '#A6C7ED'
            },
            xAxis: {
                gridLineColor: '#505053'
            }
        },
    

        scrollbar: {
            barBackgroundColor: '#808083',
            barBorderColor: '#808083',
            buttonArrowColor: '#CCC',
            buttonBackgroundColor: '#606063',
            buttonBorderColor: '#606063',
            rifleColor: '#FFF',
            trackBackgroundColor: '#404043',
            trackBorderColor: '#404043'
        }
    },


    plotOptions: {
        series: {
            dataLabels: {
                color: '#F0F0F3',
                style: {
                    fontSize: '13px'
                }
            },
            marker: {
                lineColor: '#333'
            }
        },
        boxplot: {
            fillColor: '#505053'
        },
        candlestick: {
            lineColor: 'white'
        },
        errorbar: {
            color: 'white'
        }
    },

    legend: {
        itemStyle: {
            font: '9pt Trebuchet MS, Verdana, sans-serif',
            color: 'white'
        },
        itemHoverStyle:{
            color: 'white'
        }   
    }
};


Highcharts.setOptions(ttt);

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