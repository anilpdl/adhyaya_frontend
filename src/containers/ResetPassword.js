import React, { Component } from 'react';
import { Button } from 'reactstrap';
import ResetPassword from '../components/Form/ResetPassword';
import * as LocalStorageManager from '../constants/LocalStorageManager';
import Toaster from '../components/Toaster/ToastManager';
import UserApi from '../apis/User';
import FormWrapper from '../components/Wrapper/FormWrapper';
import ROUTES from '../constants/Routes';

class ResetPasswordContainer extends Component {
  constructor() {
    super();
    this.state = {
      newPassword: undefined,
      rePassword: undefined,
      togglePassword: false,
      errors: {},
    }
  }

  handleChange = (e) => {
    const { name, value } = e.target;
    const _state = { ...this.state };
    _state[name] = value;
    _state.errors[`${name}Error`] = '';

    this.setState({ ..._state });
  }

  showPassword = (e) => {
    e.preventDefault();
    this.setState(({ togglePassword }) => ({
      togglePassword: !togglePassword
    }));
  }

  validateForm = (fields) => {
    const fieldKeys = Object.keys(fields);
    let hasError = false;
    const errors = { ...this.state.errors };
    fieldKeys.forEach(field => {
      errors[`${field}Error`] = fields[field] ? undefined : 'This field is required';
      if (field == 'newPassword' && fields[field]) {
        const password = fields['newPassword'];
        if (password.length < 5 || password.length > 32) {
          errors['newPasswordError'] = 'Password length should be 5-32 characters long';
          hasError = true;
        }
      }
      if (field == 'rePassword' && fields[field]) {
        const password = fields['newPassword'];
        const confirmPass = fields['rePassword'];
        if (password != confirmPass) {
          errors['rePasswordError'] = 'Passwords do not match';
          hasError = true;
        }
      }
      hasError = !fields[field] || hasError;
    });

    this.setState({ errors });
    return hasError;
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const {
      newPassword, rePassword
    } = this.state;

    const isFormValid = !this.validateForm({
      newPassword, rePassword
    });

    const token = this.props.match.params.resetToken;

    if (isFormValid) {
      UserApi.resetPassword(token, newPassword).then(({ data }) => {
        Toaster.getSuccessToaster("Password changed Successfully! Please login to continue");
        this.props.history.push(ROUTES.LOGIN)
      }).catch(({ response }) => {
        const message = response ? response.data.message : 'Error occured';
        Toaster.getErrorToaster(message);
      });
    }
  }

  render() {
    const { errors, newPassword, rePassword, togglePassword } = this.state;

    return (
      <FormWrapper>
        <ResetPassword
          errors={errors}
          newPassword={newPassword}
          rePassword={rePassword}
          togglePassword={togglePassword}
          handleChange={this.handleChange}
          handleSubmit={this.handleSubmit}
          showPassword={this.showPassword}
        />
      </FormWrapper>
    );
  }
}

export default ResetPasswordContainer;
