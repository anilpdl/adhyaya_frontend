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

  componentWillMount() {
    // this.fetchSites();
  }

  hideSidebar = () => {
    this.props.onClick();
  };

  fetchSites() {
    // SiteApi.getAll()
    //   .then((res) => {
    //     this.setState({ sites: res.data });
    //   })
    //   .catch(e => console.log(e));
  }

  render() {
    const sites = this.state.sites.map(({ name, id }) => (
      <SidebarLink title={name} route={insertIdToUrl(ROUTES.SITES_REPORT, id)} key={id} />
    ));

    return (
      <div className="sidebar__content">
        {/* <ul className="sidebar__block">
          <SidebarLink
            title={this.props.userType.userType || 'Log In'}
            icon="exit"
            route={this.props.userType.userType ? ROUTES.DASHBOARD : ROUTES.LOG_IN}
            onClick={this.hideSidebar}
          />
          <SidebarCategory title="Themes" icon="layers">
            <button className="sidebar__link" onClick={this.props.changeToLight}>
              <p className="sidebar__link-title">Light Theme</p>
            </button>
            <button className="sidebar__link" onClick={this.props.changeToDark}>
              <p className="sidebar__link-title">Dark Theme</p>
            </button>
          </SidebarCategory>
        </ul> */}
        <ul className="sidebar__block">
          {/* <SidebarCategory title="Admin" icon="diamond"> */}
          {/* <SidebarLink title="Home" route={ROUTES.DASHBOARD} onClick={this.hideSidebar} /> */}
          {/* <SidebarLink title="Page two" route={ROUTES.PAGE_TWO} onClick={this.hideSidebar} /> */}
          {/* </SidebarCategory> */}
          {/* <SidebarLink icon="diamond" title="Campaigns" route={ROUTES.CAMPAIGNS} onClick={this.hideSidebar} /> */}
          <SidebarCategory title="Reports" icon="chart-bars">
            {sites}
          </SidebarCategory>
        </ul>
        <ul className="sidebar__block">
          <SidebarLink
            icon="picture"
            title="Users"
            route={ROUTES.ADD_USERS}
            onClick={this.hideSidebar}
          />
        </ul>
      </div>
    );
  }
}

export default SidebarContent;

SidebarContent.propTypes = {
  onClick: PropTypes.func.isRequired,
};
