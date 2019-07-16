import * as React from 'react';

interface Props {
}

interface State {

}

class About extends React.Component<Props, State>{
    constructor(props: any) {
        super(props)
    }

    render() {
        return (
            <div>
                <div className="jumbotron">
                    <h1 className="display-4">Cryptowatcher 2.0</h1>
                    <p className="lead">We trained AI models based on last 20 000 quotations points for each crypto currencies </p>
                    <hr className="my-4"></hr>
                    <p>The result is a predictive quotation dashboard for the most commun cryptos/pair from Binance market</p>
                </div>

                <div className="jumbotron">
                    <h1 className="display-4">Disclaimer</h1>
                    <hr className="my-4"></hr>
                    <p>If you require any more information or have any questions about our site's disclaimer, please feel free to contact us by email at sebastien.dubos@gmail.com
Disclaimers for cryptowatcher.eu</p>
                    <p> All the information on this website - www.cryptowatcher.eu - is published in good faith and for general information purpose only. cryptowatcher.eu does not make any warranties about the completeness, reliability and accuracy of this information. Any action you take upon the information you find on this website (cryptowatcher.eu), is strictly at your own risk. cryptowatcher.eu will not be liable for any losses and/or damages in connection with the use of our website.
                    </p>
                    <p> From our website, you can visit other websites by following hyperlinks to such external sites. While we strive to provide only quality links to useful and ethical websites, we have no control over the content and nature of these sites. These links to other websites do not imply a recommendation for all the content found on these sites. Site owners and content may change without notice and may occur before we have the opportunity to remove a link which may have gone 'bad'.
                    </p>
                    <p> Please be also aware that when you leave our website, other sites may have different privacy policies and terms which are beyond our control. Please be sure to check the Privacy Policies of these sites as well as their "Terms of Service" before engaging in any business or uploading any information.
                    Consent</p>
                    <p>  By using our website, you hereby consent to our disclaimer and agree to its terms.</p>
                    <p> Should we update, amend or make any changes to this document, those changes will be prominently posted here.</p>
                </div>
            </div>
        )
    }

}

export default About