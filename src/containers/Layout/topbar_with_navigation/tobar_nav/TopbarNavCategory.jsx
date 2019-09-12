import React from 'react';
import PropTypes from 'prop-types';

const TopbarNavCategory = ({ title, icon, children }) => (
  <div className="topbar__category-wrap">
    <div className="topbar__link topbar__category">
      {icon ? <span className={`topbar__link-icon lnr lnr-${icon}`} /> : ''}
      <p className="topbar__link-title">
        {title}
        <span className="topbar__category-icon lnr lnr-chevron-right" />
      </p>
    </div>
    <div className="topbar__submenu">
      {children}
    </div>
  </div>
);

export default TopbarNavCategory;
