import * as React from 'react';
import { withRouter } from 'react-router-dom';

// interface Props {
//  }

// interface State {

// }

class BNBMarket extends React.Component<any>{
    constructor(props: any) {
        super(props)
    }

    render(){
        return (
            <div>BNB Market here</div>
        )
    }

}

export default withRouter(BNBMarket)