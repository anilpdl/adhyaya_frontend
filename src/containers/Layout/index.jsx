import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import classNames from 'classnames';

import Topbar from './topbar/Topbar';
import Sidebar from './sidebar/Sidebar';
import UserApi from '../../apis/User';
import * as LocalStorageManager from '../../constants/LocalStorageManager';
import ROUTES from '../../constants/Routes';

class Layout extends Component {
  constructor() {
    super();
    this.state = {
      user: {},
      sidebar: {
        show: false,
        collapse: false
      },
    };
  }

  componentDidMount = () => {
    const { id } = LocalStorageManager.getUserObject();
    UserApi.getDetails(id).then(({ data }) => {
      this.setState({ user: data.user });
    });
  }


  changeSidebarVisibility = () => {
    const { sidebar } = this.state;

    this.setState(prevState => ({
      sidebar: { ...sidebar, collapse: !prevState.sidebar.collapse }
    }));
  };

  changeMobileSidebarVisibility = () => {
    const { sidebar } = this.state;

    this.setState(prevState => ({
      sidebar: { ...sidebar, show: !prevState.sidebar.show }
    }));
  };

  logOut = () => {
    LocalStorageManager.clear();
    this.props.history.push(ROUTES.LOGIN);
  };

  render() {
    const layoutClass = classNames({
      layout: true,
      'layout--collapse': this.state.sidebar.collapse,
    });

    const { sidebar, user } = this.state;
    const { first_name: name, user_avatar } = user;

    return (
      <div className={layoutClass}>
        <Topbar
          changeMobileSidebarVisibility={this.changeMobileSidebarVisibility}
          changeSidebarVisibility={this.changeSidebarVisibility}
          name={name}
          picture={user_avatar}
          logOut={this.logOut}
        />
        <Sidebar
          sidebar={sidebar}
          changeMobileSidebarVisibility={this.changeMobileSidebarVisibility}
        />
      </div>
    );
  }
}

export default withRouter(Layout);
