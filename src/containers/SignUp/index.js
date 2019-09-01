import React, { Component } from 'react';

import FormWrapper from 'components/Wrapper/FormWrapper';
import SignUpForm from 'components/SignUp/SignUpForm';

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
      console.log()
      errors[`${field}Error`] =  'This field is required';
      hasError = !!fields[field] || hasError;
    });
    console.log(errors)

    this.setState({ errors }, ()=>console.log('PP', errors));
    return hasError;
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const {
      firstName, middleName,lastName, password, rePassword
    } = this.state;

    this.validateForm({ firstName, middleName,lastName, password, rePassword })
    
  }

  render() {
    const {
      firstName, middleName, lastName, gender, password, rePassword, togglePassword, errors
    } = this.state;
    console.log(this.state)
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

export default SignUp;
