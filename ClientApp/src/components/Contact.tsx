import * as React from 'react';
import sebastienPortrait from '../images/Sebastien.png'

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
                    <div className="card" style={{width:200}}>
                        <img className="card-img-top img-fluid" src={sebastienPortrait} alt="Card image cap"></img>
                        <div className="card-body">
                            <h5 className="card-title">Sebastien</h5>
                            <p className="card-text">AI data manager</p>
                            <p className="card-text">Software developer</p>
                            <p><a href="mailto:sebastien.dubos@gmail.com" className="btn btn-success" role="button">Contact</a></p>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

}

export default Contact