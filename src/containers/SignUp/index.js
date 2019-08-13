import React, { Component } from 'react';

class SignUp extends Component {
  constructor() {
    super();
    this.state = {

    };
  }

  render() {
    return(
      <div className="account">
      <div className="account__wrapper">
        <div className="account__card">
          <div className="account__head">
            <h3 className="account__title">
              Welcome to {" "}
              <span className="account__logo">
                Adhyaya
                <span className="account__logo-accent">Educational Services</span>
              </span>
            </h3>
            <h4 className="account__subhead subhead">Start your hasslefree abroad-venture</h4>
          </div>
          <SignUpForm />
        </div>
      </div>
    </div>
    )
  }
}

export default SignUp;
