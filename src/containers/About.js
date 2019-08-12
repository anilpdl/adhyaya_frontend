import React from 'react';

import logo from 'assets/img/logo.png';

class About extends React.Component {
  constructor() {
    super();
    this.state = {

    }
  };

  render() {
    return(
      <div className="container">
        About page
        <img src={logo} />
      </div>
    )
  }
}

export default About;
