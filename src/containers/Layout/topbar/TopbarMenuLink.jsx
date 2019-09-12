import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

export default class TopbarMenuLinks extends PureComponent {
  render() {
    const { title, icon, path } = this.props;

    return (
      <Link className="topbar__link" to={path}>
        <span className={`topbar__link-icon lnr lnr-${icon}`} />
        <p className="topbar__link-title">{title}</p>
      </Link>
    );
  }
}

TopbarMenuLinks.defaultProps = {
  path: ''
};

TopbarMenuLinks.propTypes = {
  path: PropTypes.string
};
