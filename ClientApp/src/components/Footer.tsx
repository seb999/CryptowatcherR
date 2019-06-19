import * as React from 'react';
import './Css/Footer.css';

class Footer extends React.Component {

    render() {
        return (
            <footer className="page-footer footer">
                <div>
                    <div className="float-left"><h4 className="brand">Cryptowatcher 2.0</h4></div>

                    <div className="float-right copyright">© Copyright 2019 CRYPTOWATCHER. All Rights Reserved</div>
                </div>
                <div ></div>
            </footer>
        )
    }

}

export default Footer