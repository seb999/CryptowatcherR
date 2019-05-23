import * as React from 'react';
import './../Css/DropDown.css'
import BTT from '../../images/CoinIcon/ZIL.png'

interface Props {
    symbol: string;
}

interface State {
}

class CoinImage extends React.Component<Props, State> {
    constructor(props: any) {
        super(props);
    }

    render() {
       let icons = this.props.symbol == "BTT" ? <img src={BTT} className="card-img-top img-fluid" style={{ height : 20, width: 20}}/> : ""
          
        return (
            <img src={BTT} className="card-img-top img-fluid" style={{ height : 20, width: 20}}/> 
        );
    }
}

export default CoinImage