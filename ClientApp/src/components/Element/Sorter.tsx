import * as React from 'react';

interface Props {
    sortDirection: number,
    visible: boolean,
}

class Sorter extends React.Component<Props> {
    constructor(props: any) {
        super(props);
    }

    render() {
        return (
            (this.props.visible
                ? (this.props.sortDirection > 0 ? <i className="fas fa-caret-down"></i> : <i className="fas fa-caret-up"></i>)
                : <div></div>
            )
        );
    }
}

export default Sorter