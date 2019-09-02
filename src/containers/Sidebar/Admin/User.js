import React, { Component } from 'react';

import AddUser from 'components/User/AddUser';
import Toaster from 'components/Toaster/ToastManager';
import REG_EXP from 'constants/RegExp';
import UserInvitationApi from 'apis/UserInvitation';

class Users extends Component {
  constructor() {
    super();
    this.state = {
      email: undefined,
      emailError: undefined
    }
  }

  handleChange = (e) => {
    const { name, value } = e.target;

    this.setState({ [name]: value, emailError: undefined });
  }

  validateEmail = (email) => {
    const result = REG_EXP.EMAIL.test(email);
    if(!result) {
      this.setState({ emailError: 'Email is invalid'});
    }
    return result;
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const { email } = this.state;
    const isEmailValid = this.validateEmail(email);

    if(isEmailValid) {
      UserInvitationApi.create({ email }).then(({ data })=> {
        Toaster.getSuccessToaster(`Invitation link sent to ${email}`);
      }).catch(({ response })=> {
        const message = response? response.data.message : 'Error Occured';
        Toaster.getErrorToaster(message);
      });
    }
  }

  render() {
    const { email, emailError } = this.state;

    return (
      <div>
        <AddUser email={email} emailError={emailError} handleChange={this.handleChange} handleSubmit={this.handleSubmit} />
      </div>
    );
  }
}

export default Users;
