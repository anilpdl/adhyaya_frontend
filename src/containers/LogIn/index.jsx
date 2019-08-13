import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

import LogInForm from 'components/Login/LogInForm';
import UserApi from '../../apis/User';
import Toaster from '../../components/Toaster/ToastManager';

class LogIn extends Component {
  constructor() {
    super();
    this.state = {
      email: '',
      password: ''
    }

    this.toastId = "loginForm";
  }

  handleChange = (e) => {
    const { name, value } = e.target;
    const state = {};
    state[name] = value;

    this.setState({ ...state });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const { email, password } = this.state;

    UserApi.logIn({ email, password }).then(({ data }) => {
      const { user } = data;
    }).catch((data) => {
      console.log(JSON.parse(JSON.stringify(data)))
      Toaster.getErrorToaster(this.toastId, data.message);
    });
  };

  render() {
    const { email, password } = this.state;

    return (
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
            <LogInForm
              email={email}
              password={password}
              handleChange={this.handleChange}
              handleSubmit={this.handleSubmit}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default LogIn;

