import * as React from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import * as binanceActionCreator from '../actions/actions';
import { withRouter } from 'react-router-dom';

interface BinanceCrypto{
    dateFormatted : string;
    temperatureC : string;
    summary : string;
    temperatureF : string;
}
interface Props {
    getCryptoList(): void;
    cryptoList: Array<BinanceCrypto>;
 }

interface State {

}

class USDTMarket extends React.Component<Props, State>{
    constructor(props: any) {
        super(props)
    }

    componentDidMount(){
        this.props.getCryptoList();
    }

    render(){
        console.log(this.props.cryptoList);
        let displayList = this.props.cryptoList.map((item, index) => (
            <tr key={index}>
                <td>{item.dateFormatted}</td>
                <td>{item.temperatureC}</td>
                <td>{item.summary}</td>
                <td>{item.temperatureF}</td>
            </tr>
        ));

        return (
            <div>
                 <table className="table" >
                            <thead className="thead-dark">
                                <tr>
                                    <th scope="col">Device Id</th>
                                    <th scope="col">EUI</th>
                                    <th scope="col">Usage</th>
                                    <th scope="col">User Id</th>
                                    <th scope="col">delete</th>
                                </tr>
                            </thead>
                            <tbody>
                                {displayList}
                            </tbody>
                        </table>
            </div>
        )
    }
}

//map the props of this class to the root redux state
const mapStateToProps = (state: any) => {
    return {
        cryptoList: state.cryptoList,
    }
}

const mapDispatchToProps = (dispatch: Dispatch) => {
    return {
        getCryptoList: () => dispatch<any>(binanceActionCreator.default.binanceActions.USDTMarketList()),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)((USDTMarket));