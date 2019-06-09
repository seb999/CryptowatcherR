import * as React from 'react';
import * as Highcharts from 'highcharts';
import SolidGauge from 'highcharts/modules/solid-gauge';
import highchartsMore from "highcharts/highcharts-more.js"
import HighchartsReact from 'highcharts-react-official'
import './../Css/GaugeChart.css'

highchartsMore(Highcharts);
SolidGauge(Highcharts);

interface Props {
    // data: Array<coinTransfer>,
    // symbol: string,
    // indicator : string
}

interface State {

}

class GaugeChart extends React.Component<Props, State> {
    constructor(props: any) {
        super(props);


    }

    componentDidUpdate(nextProps: any) {
        if (this.props != nextProps) {


        }

    }

    render() {

        var ohlc = [] as any;
        var volume = [] as any;
        var rsi = [] as any;
        var macd = [] as any;

        ohlc.push([10]);





        return (
            <div>
                <svg viewBox="0 0 100 50" width="100" height="50">
                    <linearGradient id="linearColors" x1="0" y1="0" x2="1" y2="1">
                        <stop offset="30%" stop-color="red"></stop>
                        <stop offset="40%" stop-color="#FEFF01"></stop>
                        <stop offset="60%" stop-color="green"></stop>
                        <stop offset="70%" stop-color="green"></stop>
                    </linearGradient>

                    <circle cx="50" cy="50" r="25" stroke-dasharay="30" fill="none" stroke="url(#linearColors)" className="radial-progress-bar"
                        stroke-dashoffset="45" />

                    <polygon className="point" points="0,45 0,40 20,45" transform="rotate(106.2 50 50)">
                        <animateTransform attributeName="transform" type="rotate" from="0 50 50" to="150 50 50" dur=".5s"
                            fill="freeze"></animateTransform>
                    </polygon>
                    <circle className="center" cx="50" cy="50" r="4"></circle>
                </svg>


                <svg width="50" height="50" viewBox="0 0 20 50">



                    {/* <circle 
                    className="radial-progress-bar up" 
                    cx="0" 
                    cy="60" 
                    r="54" 
                    fill="none" 
                    stroke-dasharray="180"
                    stroke-dashoffset="360" /> */}




                </svg>


            </div>
        );
    }
}

export default GaugeChart