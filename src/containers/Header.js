import React from 'react';


import TopbarWithNavigation from 'containers/Layout/topbar_with_navigation/TopbarWithNavigation';
import SidebarMobile from 'containers/Layout/topbar_with_navigation/sidebar_mobile/SidebarMobile';
import ROUTES from 'constants/Routes';
import logo from 'assets/img/logo.png';

export default class Header extends React.Component {
  constructor() {
    super();
    this.state = {
      user: {},
      sidebar: {
        show: true,
        collapse: true
      },
    };
  }
  
  componentDidMount = () => {
    
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
  render() {
    const { sidebar } = this.state;

    return(
      <div>
        <TopbarWithNavigation
            changeMobileSidebarVisibility={this.changeMobileSidebarVisibility}
          />
          <SidebarMobile
            sidebar={sidebar}
            changeMobileSidebarVisibility={this.changeMobileSidebarVisibility}
          /> 
      </div>
    )
  }
}
