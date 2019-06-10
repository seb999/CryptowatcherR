import * as React from 'react';
import { Typeahead } from 'react-bootstrap-typeahead';
import 'react-bootstrap-typeahead/css/Typeahead.css';
import 'react-bootstrap-typeahead/css/Typeahead-bs4.css';
import { symbolTransfer } from '../../class/symbolTransfer';

interface Props {
    multiple : boolean;
    symbolList: Array<symbolTransfer>;
    onClick(p: any): void;
}

interface State {
}

class Autocomplete extends React.Component<Props, State> {
    constructor(props: any) {
        super(props);
    }

    render() {
        return (
            <Typeahead id="assignedToTypeahead" multiple={this.props.multiple} labelKey="symbolShort" options={this.props.symbolList} placeholder="search for crypto..." onChange={(p: any) => this.props.onClick(p)} />
        );
    }
}

export default Autocomplete