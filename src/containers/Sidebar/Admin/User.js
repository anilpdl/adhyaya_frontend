import React, { Component } from 'react';

import AddUser from 'components/User/AddUser';
import Toaster from 'components/Toaster/ToastManager';
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

    this.setState({ [name]: value });
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const { email } = this.state;

    UserInvitationApi.create({ email }).then(({ data })=> {
      Toaster.getSuccessToaster(`Invitation link sent to ${email}`);
    }).catch(({ response })=> {
      Toaster.getErrorToaster("Error occured");
    });

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
