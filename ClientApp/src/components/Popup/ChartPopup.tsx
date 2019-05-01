import * as React from 'react';
import { Modal, Button } from "react-bootstrap";

interface Props {
    hide() : void,
    show: boolean,
 }

interface State {

}

class ChartPopup extends React.Component<Props, State>{
    constructor(props: any) {
        super(props)
    }

    render(){
        return (
            <div>  
            <Modal show={this.props.show} onHide={this.props.hide}>
                       <Modal.Header closeButton>
                           <Modal.Title>PUT HERE THE CRYPTO NAME</Modal.Title>
                       </Modal.Header>
                       <Modal.Body>
                           <form id="newTrackerForm" className="form-signin" >

                             PUT HERE A NICE CHART

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