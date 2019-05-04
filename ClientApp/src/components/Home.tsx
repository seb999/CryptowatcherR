import * as React from 'react';
import { withRouter } from 'react-router-dom';
import backgroud from '../images/cryptoSplash.jpg'
import './Css/Home.css'
// interface Props {
//  }

// interface State {

// }

class Home extends React.Component<any>{
    constructor(props: any) {
        super(props)
    }

    render() {
        return (
            <div>
                <div className="jumbotron">
                    <h1 className="display-4">Cryptowatcher 2.0</h1>
                    <p className="lead">This is a simple hero unit, a simple jumbotron-style component for calling extra attention to featured content or information.</p>
                    <hr className="my-4"></hr>
                    <p>It uses utility classes for typography and spacing to space content out within the larger container.</p>
                </div>
            </div>
        )
    }

}

export default withRouter(Home)