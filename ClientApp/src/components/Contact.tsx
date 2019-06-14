import * as React from 'react';
import sebastienPortrait from '../images/Sebastien.png'
import mikeldiPortrait from '../images/Mikeldi.jpg'

interface Props {
}

interface State {

}

class Contact extends React.Component<Props, State>{
    constructor(props: any) {
        super(props)
    }

    render() {
        return (
            <div className="container">

                <h2>Contact</h2>
                <h4>Adress all your questions at </h4>

                <address>
                    Heleneborgsgatan 5C<br />
                    117 31 Stockholm<br />
                    <abbr title="Phone">+46 (0) 7 36 52 71 82</abbr>
                </address>

                <address>
                    <strong>Email:</strong> <a href="mailto:sebastien.dubos@gmail.com">sebastien.dubos@gmail.com</a><br />
                </address>

                <div className="row">
                    <div className="col-md-3">
                    <div className="card" style={{width:170}}>
                        <img className="card-img-top img-fluid" src={sebastienPortrait} alt="Card cap"></img>
                        <div className="card-body">
                            <h5 className="card-title">Sebastien</h5>
                            <p className="card-text">Software developer</p>
                            <p><a href="mailto:sebastien.dubos@gmail.com" className="btn btn-success" role="button">Contact</a></p>
                        </div>
                    </div>
                    </div>
                    <div className="col-md-3">
                    <div className="card" style={{width:170}}>
                        <img className="card-img-top img-fluid" src={mikeldiPortrait} alt="Card cap"></img>
                        <div className="card-body">
                            <h5 className="card-title">Mikeldi</h5>
                            <p className="card-text">UI/UX developer</p>
                            <p><a href="mailto:mikeldi@gmail.com" className="btn btn-success" role="button">Contact</a></p>
                        </div>
                    </div>
                </div>
                </div>
            </div>
        )
    }

}

export default Contact