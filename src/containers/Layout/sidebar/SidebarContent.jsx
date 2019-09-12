import React, { Component } from 'react';
import PropTypes from 'prop-types';


import { insertIdToUrl } from 'utils/routes';
import SidebarLink from './SidebarLink';
import SidebarCategory from './SidebarCategory';
import ROUTES from 'constants/Routes';

class SidebarContent extends Component {
  constructor() {
    super();
    this.state = {
      sites: [],
    };
  }

  hideSidebar = () => {
    this.props.onClick();
  };

  render() {

    return (
      <div className="sidebar__content">
        <ul className="sidebar__block">
          <SidebarCategory title="Students" icon="users">
            <SidebarLink
              title="Active"
              route={ROUTES.LIST_USERS}
            />
            <SidebarLink
              title="Invitations"
              route={ROUTES.USER_INVITATIONS_INDEX}
            />
            <SidebarLink
              title="Add New"
              route={ROUTES.ADD_USERS}
            />
          </SidebarCategory>
        </ul>
        <ul className="sidebar__block">
          <SidebarCategory title="Files" icon="files">
            <SidebarLink
              title="List"
              route={ROUTES.FILES_INDEX}
            />
            <SidebarLink
              title="Upload"
              route={ROUTES.FILES_UPLOAD}
            />
          </SidebarCategory>
        </ul>
      </div>
    );
  }
}

export default SidebarContent;
