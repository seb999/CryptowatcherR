import * as React from 'react';
import './../Css/DropDown.css'

interface Props {
    itemList: Array<string>;
    onClick(p:any): void;
    selectedItem: string;
}

interface State {
}

class DropDown extends React.Component<Props, State> {
    constructor(props: any) {
        super(props);
    }

    render() {
        return (
            <div className="dropdown">
                <button className="btn btn-outline-info dropdown-toggle mt-1" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    {this.props.selectedItem}
            </button>
                <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                    {this.props.itemList.map((item, index) => {
                        return <a key={index} className={this.props.selectedItem == item ? "dropdown-item active" : "dropdown-item"} id={item} onClick={()=>this.props.onClick(item)}>{item}</a>
                    })}
                </div>
            </div>
        );
    }
}

export default DropDown