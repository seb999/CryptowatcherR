import * as React from 'react';
import { withRouter } from 'react-router-dom'
import logo from '../images/cryptowatcher_LOGO_001_i.svg'
import logoMobile from '../images/cryptowatcher_LOGO_001_i_mobile.svg'
import './Css/NavBar.css';
import MyNavLink from './Element/MyNavLink'

export interface NavCommand {
  type: string,
  path: string,
  text: string,
  isActive: boolean,
}

export interface Props {
  commands: NavCommand[];
}

export interface State { }

class NavBar extends React.Component<Props, State> {
  constructor(props: any) {
    super(props);
  }
  render() {
    return (
      <nav className="navbar transparent navbar-expand-lg navbar-dark" id="mainNav">
        <div className="container">
          <a className="navbar-brand js-scroll-trigger" href="/">
            <span className="d-lg-none">
              <img src={logoMobile} className="logoMobile" />
            </span>
            <span className="d-none d-lg-block">
              <img src={logo} className="logo" />
            </span>
          </a>
          <button className="navbar-toggler navbar-toggler-right btn btn-primary-outline" type="button" data-toggle="collapse" data-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
            Menu
      <i className="fas fa-bars" />
          </button>
          <div className="collapse navbar-collapse" id="navbarResponsive">
            <ul className="navbar-nav mr-auto">
              {this.props.commands.map((link, i) => {
                if (link.type === "NavLink") {
                  return (
                    <MyNavLink key={i}
                      path={link.path}
                      text={link.text}
                      isActive={link.isActive}
                    />
                  );
                }
                return (<div key={i}></div>)
              })}
            </ul>
          </div>
        </div>
      </nav>
    )
  }
}

export default (NavBar);

