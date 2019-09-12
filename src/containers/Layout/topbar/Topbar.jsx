import React, { PureComponent } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import ROUTES from 'constants/Routes';
import TopbarSidebarButton from './TopbarSidebarButton';
import TopbarProfile from './TopbarProfile';

class Topbar extends PureComponent {
  render() {
    const {
      changeMobileSidebarVisibility, changeSidebarVisibility, logOut, name, picture,
    } = this.props;

    return (
      <div className="topbar">
        <div className="topbar__wrapper">
          <div className="topbar__left">
            <TopbarSidebarButton
              changeMobileSidebarVisibility={changeMobileSidebarVisibility}
              changeSidebarVisibility={changeSidebarVisibility}
            />
            <Link className="topbar__log my-auto text-white" to={ROUTES.DASHBOARD}>
              Adhyaya Educational Services
            </Link>
          </div>
          <div className="topbar__right">
            <TopbarProfile name={name} picture={picture} logOut={logOut} />
          </div>
        </div>
      </div>
    );
  }
}

export default Topbar;

