import * as React from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import * as binanceActionCreator from '../actions/actions';
import { withRouter } from 'react-router-dom';
import { cryptoTransfer } from '../class/cryptoTransfer'
import { SSL_OP_SSLREF2_REUSE_CERT_TYPE_BUG } from 'constants';

interface sortType{
    columnName : string,
    sortDirection : number
}

interface Props {
    getCryptoList(bm: string): void;
    sortList(sortType: sortType): void;
    cryptoList: Array<cryptoTransfer>;
}

interface State {
    sortDirection : number,
}

//hello world
class USDTMarket extends React.Component<Props, State>{
    constructor(props: any) {
        super(props)

        this.state = {
            sortDirection : -1,
        }
    }

    componentDidMount() {
        this.props.getCryptoList("USDT");
    }

    handleChange = (event: any) => {
        this.props.getCryptoList(event.target.value);
    }

    handleSort = (e: any) => {
        this.setState({
            sortDirection : -this.state.sortDirection
        })
       this.props.sortList( {
           columnName : e.target.id, 
           sortDirection : this.state.sortDirection})
    }

    render() {
        let displayList = this.props.cryptoList.map((crypto, index) => (
            <tr key={crypto.symbol}>
                <td>{crypto.symbol}</td>
                <td>{crypto.volume}</td>
                <td>{crypto.lowPrice}</td>
                <td>{crypto.highPrice}</td>
                <td>{crypto.lastPrice}</td>
                <td>{crypto.priceChangePercent}</td>
            </tr>
        ));

        let baseMarketList = <select onChange={this.handleChange}>
            <option value="USDT">USDT</option>
            <option value="BTC">BTC</option>
            <option value="BNB">BNB</option>
        </select>;

        return (
            <div>
                {baseMarketList}
                <table className="table" >
                    <thead className="thead">
                        <tr>
                            <th scope="col" id="symbol" onClick={this.handleSort}>Symbol</th>
                            <th scope="col" id="volume" onClick={this.handleSort}>Volume</th>
                            <th scope="col" id="lower" onClick={this.handleSort}>Lower</th>
                            <th scope="col" id="higher" onClick={this.handleSort}>Higher</th>
                            <th scope="col" id="last" onClick={this.handleSort}>Last</th>
                            <th scope="col" id="change" onClick={this.handleSort}>% change</th>
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
        getCryptoList: (p: string) => dispatch<any>(binanceActionCreator.default.binanceActions.GetCryptoList(p)),
        sortList: (p: sortType) => dispatch<any>(binanceActionCreator.default.binanceActions.SortList(p)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)((USDTMarket));