import React from 'react';

import logo from 'assets/img/logo.png';

class Contact extends React.Component {
  constructor() {
    super();
    this.state = {

    }
  };

  render() {
    return(
      <div className="container">
        Contact page
        <img src={logo} />
      </div>
    )
  }
}

export default Contact;
