import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import DownIcon from 'mdi-react/ChevronDownIcon';
import { Collapse } from 'reactstrap';

import ROUTES from 'constants/Routes';
import TopbarMenuLink from './TopbarMenuLink';

const logo = require('assets/img/logo.png');

export default class TopbarProfile extends PureComponent {
  constructor() {
    super();
    this.state = {
      collapse: false,
    };
  }

  toggle = () => {
    this.setState(prevState => ({ collapse: !prevState.collapse }));
  };

  render() {
    const { logOut, name, picture } = this.props;
    const imgSrc = picture? picture.url: logo;

    return (
      <div className="topbar__profile">
        <button type="button" className="topbar__avatar" onClick={this.toggle}>
          <img className="topbar__avatar-img" src={imgSrc} alt="avatar" />
          <p className="topbar__avatar-name">{name || 'User'}</p>
          <DownIcon className="topbar__icon" />
        </button>
        {this.state.collapse && <button type="button" className="topbar__back" onClick={this.toggle} />}
        <Collapse isOpen={this.state.collapse} className="topbar__menu-wrap">
          <div className="topbar__menu">
            <TopbarMenuLink title="Profile" icon="cog" path={ROUTES.PROFILE} />
            <div className="topbar__menu-divider" />
            <span className="topbar__link" onClick={logOut} role="presentation">
              <span className="topbar__link-icon lnr lnr-exit" />
              <p className="topbar__link-title">Log Out</p>
            </span>
          </div>
        </Collapse>
      </div>
    );
  }
}
