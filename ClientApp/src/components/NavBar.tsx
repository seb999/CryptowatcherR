import * as React from 'react';
import { withRouter } from 'react-router-dom'
import logo from '../images/Logo.png'
import './NavBar.css';
import MyNavLink from './MyNavLink'

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
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        {/* <a className="navbar-brand" href="/"><img src={logo} className="logo" /></a> */}
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
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
      </nav>
    )
  }
}

export default (NavBar);

