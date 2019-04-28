import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import NavBar from './components/NavBar';
import { NavCommand } from './components/NavBar';
import Footer from './components/Footer';
import USDTMarket from './components/USDTMarket';
import BTCMarket from './components/BTCMarket';
import BNBMarket from './components/BNBMarket';

interface State {
  redirectTo?: string;
  navCommands: Array<NavCommand>;
}

interface Props {
}

class App extends React.Component<Props, State>{
  constructor(props: any) {
    super(props);

    this.state = {
      navCommands: [
        { type: "NavLink", path: "/", text: "Home", isActive: false },
        { type: "NavLink", path: "/USDTMarket", text: "USDT Market", isActive: false },
        { type: "NavLink", path: "/BTCMarket", text: "BTC Market", isActive: false },
        { type: "NavLink", path: "/BNBMarket", text: "BNB Market", isActive: false },
      ],
      redirectTo: undefined,
    };
  }
  
  render() {

    return (
      <BrowserRouter>
      <div>
        <NavBar commands={this.state.navCommands} />
        <div className="container">
          <Switch>
            {/* <Route exact path='/' component={Home} /> */}
            <Route exact path='/USDTMarket' component={USDTMarket} />
            <Route exact path='/BTCMarket' component={BTCMarket} />
            <Route exact path='/BNBMarket' component={BNBMarket} />
           
        </Switch>
        </div>
        <Footer />
      </div>
    </BrowserRouter>
    );
  }
}

export default App;
