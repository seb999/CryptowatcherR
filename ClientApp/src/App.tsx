import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import NavBar from './components/NavBar';
import { NavCommand } from './components/NavBar';
import Footer from './components/Footer';
import USDTMarket from './components/BinanceMarket';
import BNBMarket from './components/ComponentTemplate';

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
        { type: "NavLink", path: "/", text: "Home", isActive: true },
        { type: "NavLink", path: "/BinanceMarket", text: "Binance Market", isActive: true },
        { type: "NavLink", path: "/About", text: "About", isActive: true },
        { type: "NavLink", path: "/Contact", text: "Contact", isActive: true },
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
