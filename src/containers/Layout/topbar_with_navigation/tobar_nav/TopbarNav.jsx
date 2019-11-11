import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import ROUTES from '../../../../constants/Routes';

const TopbarNav = () => (
  <nav className="topbar__nav">
    <a className="topbar__nav-link" href={ROUTES.ABOUT_US}>About Us</a>
    <a className="topbar__nav-link" href={ROUTES.SERVICES}>Services</a>
    <a className="topbar__nav-link" href={ROUTES.CONTACT_US}>Contact Us</a>
  </nav>
);

export default TopbarNav;
