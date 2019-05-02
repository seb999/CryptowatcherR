import * as React from 'react';
import { Modal, Button, Container } from "react-bootstrap";
import * as Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official'

interface Props {
    hide(): void,
    show: boolean,
}

interface State {
}

let options = {
    title: {
        text: "My map chart"
    },
    chart: {
        type: "line"
    },
    series: [{
        type: "line",
        data: [1, 2, 3, 6, 2, 0]
    }]
}

class ChartPopup extends React.Component<Props, State>{
    constructor(props: any) {
        super(props)
    }

    render() {

        return (
            <div>
                <Modal show={this.props.show} onHide={this.props.hide} size="lg">
                    <Modal.Header closeButton>
                        <Modal.Title>PUT HERE THE CRYPTO NAME</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <form id="newTrackerForm" className="form-signin" >

                            <div>
                                <HighchartsReact
                                    highcharts={Highcharts}
                                    constructorType={'chart'}
                                    options={options}/>
                            </div>

                        </form>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={this.props.hide}>
                            Close
                           </Button>
                    </Modal.Footer>
                </Modal>
            </div>
        )
    }
}

export default ChartPopup