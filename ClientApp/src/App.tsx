import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import NavBar from './components/NavBar';
import { NavCommand } from './components/NavBar';
import Footer from './components/Footer';
import BinanceMarket from './components/BinanceMarket';
import Home from './components/Home';
import About from './components/About';
import Contact from './components/Contact';
import BinanceCoin from './components/BinanceCoin'
import './App.css';

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
        { type: "NavLink", path: "/Home", text: "Home", isActive: true },
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
      <div className="main-container">
        <NavBar commands={this.state.navCommands} />
        <div className="container ">
          <Switch>
            <Route exact path='/BinanceMarket' component={BinanceMarket} />
            <Route exact path='/Home' component={Home} />
            <Route exact path='/About' component={About} />
            <Route exact path='/Contact' component={Contact} />
            <Route exact path='/BinanceCoin' component={BinanceCoin}  />
        </Switch>
        </div>
        {/* <Footer /> */}
      </div>
    </BrowserRouter>
    );
  }
}

export default App;