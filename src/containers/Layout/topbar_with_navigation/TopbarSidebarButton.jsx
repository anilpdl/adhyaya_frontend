import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import logo from 'assets/img/logo.png';


const icon = require('assets/img/burger.svg');

class TopbarSidebarButton extends PureComponent {
  render() {
    const { changeMobileSidebarVisibility } = this.props;

    return (
      <div>
        <button className="topbar__button topbar__button--mobile" onClick={changeMobileSidebarVisibility}>
          <img src={logo} alt="" className="logo topbar__button-icon" />
        </button>
      </div>
    );
  }
}

export default TopbarSidebarButton;
