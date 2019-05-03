import * as React from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import Highcharts from 'highcharts/highstock'
import HighchartsReact from 'highcharts-react-official'

interface AppObjectProps {
    fullSymbol : string;
 }

interface State {
}

class BinanceMarketCoin extends React.Component<AppObjectProps, State>{
    constructor(props: any) {
        super(props)
    }

    render(){
 
        const options: Highcharts.Options = {
            title: {
                text: 'My chart'
            },
            series: [{
                type: 'line',
                data: [1, 2, 3]
            }]
        }

        return (
            <div>
            <HighchartsReact
               highcharts={Highcharts}
               constructorType={'stockChart'}
               options={options}
            />
        </div>
        )
    }
}

const mapStateToProps = (state: any) => {
    return {
        fullSymbol: state.selectedCoin,
    }
}

const mapDispatchToProps = (dispatch: Dispatch) => {
    return {
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(BinanceMarketCoin)