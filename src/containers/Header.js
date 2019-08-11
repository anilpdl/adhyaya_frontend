import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  Nav,
  NavItem
} from 'reactstrap';

import ROUTES from 'constants/Routes';
import logo from 'assets/img/logo.png';

export default class Header extends React.Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false
    };
  }
  toggle() {
    this.setState(prevState => ({
      isOpen: !prevState.isOpen
    }));
  }
  render() {
    const { isOpen } = this.state;

    return (
      <div>
        <Navbar className="px-5" style={{backgroundColor: '#e98121'}} light expand="md">
          <NavLink className="navbar-brand" to={ROUTES.INDEX}>
            <img style={{borderRadius: 50}} src={logo} width={50} height={50} alt="logo" />
          </NavLink>
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={isOpen} navbar>
            <Nav className="ml-auto" navbar>
              <NavItem>
                <NavLink className="nav-link text-white" to={ROUTES.ABOUT_US}>About Us</NavLink>
              </NavItem>
              <NavItem>
                <NavLink className="nav-link text-white" to={ROUTES.CONTACT_US}>Contact Us</NavLink>
              </NavItem>
            </Nav>
          </Collapse>
        </Navbar>
      </div>
    );
  }
}
