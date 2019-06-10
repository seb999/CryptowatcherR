import * as React from 'react';
import './../Css/GaugeChart.css'
import { predictionTransfer } from '../../class/predictionTransfer';

interface Props {
    predictionList: Array<predictionTransfer>;
}

interface State {
    to : string;
}

class GaugePrediction extends React.Component<Props, State> {
    svgAnimate : any;
    constructor(props: any) {
        super(props);

        this.state = {
            to : "0 50 50",
        }
    }

    componentDidMount(){
        console.log("did mount");
    }

    componentDidUpdate(nextProps: any) {
        if (this.props.predictionList != nextProps.predictionList) {
            var temp : number = 0;
            this.props.predictionList.map((item, index) => (
                item.futurePrice > 0 ? temp++ : temp
             ));

             this.setState({
                to : temp * 27 + " 50 50"
            });
            this.svgAnimate.beginElement();
        }
    }

    render() {
        return (
            <div>
                <svg viewBox="0 0 100 50" width="100" height="50">
                    <linearGradient id="linearColors" x1="0" y1="0" x2="1" y2="1">
                        <stop offset="30%" stopColor="red"></stop>
                        <stop offset="40%" stopColor="#FEFF01"></stop>
                        <stop offset="60%" stopColor="green"></stop>
                        <stop offset="70%" stopColor="green"></stop>
                    </linearGradient>

                    <circle cx="50" cy="50" r="25" stroke-dasharay="30" fill="none" stroke="url(#linearColors)" className="radial-progress-bar"
                        strokeDashoffset="45" />

                    <polygon className="point" points="0,45 0,40 20,45" transform="rotate(180 50 50)">
                        <animateTransform ref={(svgAnimate) => { this.svgAnimate = svgAnimate; }}  attributeName="transform" type="rotate" from="0 50 50" to={this.state.to} dur="0.7s"
                            fill="freeze"></animateTransform>
                    </polygon>
                    <circle className="center" cx="50" cy="50" r="4"></circle>
                </svg>
            </div>
        );
    }
}

export default GaugePrediction