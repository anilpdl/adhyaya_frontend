import React from 'react';
import { Link } from 'react-router-dom';
import ROUTES from '../../../../constants/Routes';

const TopbarNav = () => (
  <nav className="topbar__nav">
    <Link className="topbar__nav-link" to={ROUTES.CONTACT_US}>Contact Us</Link>
    <Link className="topbar__nav-link" to={ROUTES.ABOUT_US}>About Us</Link>
    <Link className="topbar__nav-link" to={ROUTES.SERVICES}>Services</Link>
  </nav>
);

export default TopbarNav;
