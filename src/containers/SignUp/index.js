import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

import FormWrapper from 'components/Wrapper/FormWrapper';
import SignUpForm from 'components/SignUp/SignUpForm';
import UserApi from 'apis/User';
import Toaster from 'components/Toaster/ToastManager';

class SignUp extends Component {
  constructor() {
    super();
    this.state = {
      firstName: undefined,
      middleName: undefined,
      lastName: undefined,
      gender: 'male',
      password: undefined,
      rePassword: undefined,
      togglePassword: false,
      errors: {},
    };
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
      errors[`${field}Error`] =  fields[field]? undefined : 'This field is required';
      if(field == 'rePassword' && fields[field]) {
        const password = fields['password'];
        const confirmPass = fields['rePassword'];
        if(password != confirmPass) {
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
      firstName, middleName, gender, lastName, password, rePassword
    } = this.state;

    const isFormValid = !this.validateForm({
      firstName, lastName, password, rePassword
    });
    const invitation_id = this.props.match.params.invitationId;

    if(isFormValid) {
      const formData = {
        first_name: firstName,
        middle_name: middleName,
        last_name: lastName,
        gender,
        password,
        invitation_id
      };
      UserApi.create(formData).then(({ data })=> {
        console.log('data', data);
      }).catch(({response}) => {
        const message = response? response.data.message: 'Error occured';
        Toaster.getErrorToaster(message);
      });
    }
    
  }

  render() {
    const {
      firstName, middleName, lastName, gender, password, rePassword, togglePassword, errors
    } = this.state;

    return (
      <FormWrapper>
        <SignUpForm
          firstName={firstName}
          middleName={middleName}
          lastName={lastName}
          gender={gender}
          password={password}
          rePassword={rePassword}
          togglePassword={togglePassword}
          errors={errors}
          showPassword={this.showPassword}
          handleChange={this.handleChange}
          handleSubmit={this.handleSubmit}
        />
      </FormWrapper>
    );
  }
}

export default withRouter(SignUp);
