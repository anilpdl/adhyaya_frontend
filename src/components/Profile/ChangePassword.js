import React, { Component } from 'react';
import { Button } from 'reactstrap';
import PasswordForm from '../Form/PasswordForm';
import * as LocalStorageManager from '../../constants/LocalStorageManager';
import Toaster from '../Toaster/ToastManager';
import UserApi from '../../apis/User';

class ChangePassword extends Component {
  constructor() {
    super();
    this.state = {
      oldPassword: undefined,
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
      console.log(hasError, field)
    });

    this.setState({ errors });
    return hasError;
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const {
      oldPassword, newPassword, rePassword
    } = this.state;

    const isFormValid = !this.validateForm({
      oldPassword, newPassword, rePassword
    });
    const { id } = LocalStorageManager.getUserObject();

    if (isFormValid) {
      const formData = {
        old_password: oldPassword,
        new_password: newPassword
      };
      UserApi.changePassword(formData, id).then(({ data }) => {
        console.log('data', data);
        Toaster.getSuccessToaster("Password changed Successfully");
        this.props.toggleChangePassword();
      }).catch(({ response }) => {
        const message = response ? response.data.message : 'Error occured';
        Toaster.getErrorToaster(message);
      });
    }

  }

  render() {
    const { toggleChangePassword } = this.props;
    const { errors, oldPassword, newPassword, rePassword, togglePassword } = this.state;

    return (
      <React.Fragment>
        <PasswordForm
          errors={errors}
          oldPassword={oldPassword}
          newPassword={newPassword}
          rePassword={rePassword}
          togglePassword={togglePassword}
          handleChange={this.handleChange}
          handleSubmit={this.handleSubmit}
          showPassword={this.showPassword}
        />
        <Button className="account__btn account__btn--small" onClick={toggleChangePassword} >Cancel</Button>
      </React.Fragment>
    );
  }
}

export default ChangePassword;
