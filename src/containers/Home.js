import React from 'react';
 
import logo from 'assets/img/logo.png';
import UserApi from '../apis/User';

class Home extends React.Component {
  constructor() {
    super();
    this.state = {

    }
  };

  componentDidMount = () => {
    UserApi.getDetails(4).then(console.log).catch(console.log)
  }

  render() {
    return(
      <div className="container">
        Home page
        <img src={logo} />
      </div>
    )
  }
}

export default Home;
