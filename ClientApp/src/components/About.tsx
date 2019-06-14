import * as React from 'react';

interface Props {
 }

interface State {

}

class About extends React.Component<Props, State>{
    constructor(props: any) {
        super(props)
    }

    render(){
        return (
            <div className="container">
            <div>
                <div className="jumbotron">
                    <h1 className="display-4">Cryptowatcher 2.0</h1>
                    <p className="lead">We trained AI models based on last 20 000 quotations points for each crypto currencies </p>
                    <hr className="my-4"></hr>
                    <p>The result is a predictive quotation dashboard for the most commun cryptos/pair from Binance market</p>
                </div>
            </div>
            </div>
        )
    }

}

export default About