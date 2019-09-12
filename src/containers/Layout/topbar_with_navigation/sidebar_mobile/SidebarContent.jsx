import React, { Component } from 'react';
import PropTypes from 'prop-types';
import SidebarLink from './SidebarLink';
import SidebarCategory from './SidebarCategory';
import ROUTES from '../../../../constants/Routes';

class SidebarContent extends Component {
  hideSidebar = () => {
    this.props.onClick();
  };

  render() {
    return (
      <div className="sidebar__content">
          <SidebarLink
            title="About Us"
            icon="text-align-justify"
            route={ROUTES.ABOUT_US}
            onClick={this.hideSidebar}
          />
          <SidebarLink
            title="Contact Us"
            icon="text-align-justify"
            route={ROUTES.CONTACT_US}
            onClick={this.hideSidebar}
          />
          <SidebarLink
            title="Services"
            icon="text-align-justify"
            route={ROUTES.SERVICES}
            onClick={this.hideSidebar}
          />
      </div>
    );
  }
}

export default SidebarContent;
