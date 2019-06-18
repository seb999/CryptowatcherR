import * as React from 'react';
import './Css/Footer.css';

class Footer extends React.Component {

    render() {
        return (
            <footer className="page-footer footer">
                <div className="row">
                    <div className="col-md-4"><h3 className="brand">Cryptowatcher 2.0</h3></div>

                    <div className="col-md-5"></div>

                    <div className="col-md-3 copyright">© Copyright 2019 CRYPTOWATCHER. All Rights Reserved</div>
                </div>
                <div ></div>
            </footer>
        )
    }

}

export default Footer