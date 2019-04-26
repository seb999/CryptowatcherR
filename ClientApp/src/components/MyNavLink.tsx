import * as React from 'react';
import './NavBar.css';
import {  NavLink } from 'react-router-dom'

export interface Props {
    isActive : boolean,
    path : string,
    text : string,
}

class MyNavLink extends React.Component<Props> {
    constructor(props :any){
        super(props);
    }

    render() {
        return (
            <li className={"nav-item "}>
            <NavLink 
              className="nav-link" 
              to={this.props.path}
            >{this.props.text}
            </NavLink>
        </li>
        );
    }
  }

  export default MyNavLink