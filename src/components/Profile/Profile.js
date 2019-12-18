import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Button } from 'reactstrap';

import SignUpForm from 'components/SignUp/SignUpForm';
import * as LocalStorageManager from 'constants/LocalStorageManager';
import UserApi from 'apis/User';
import Toaster from 'components/Toaster/ToastManager';

class Profile extends Component {
  constructor() {
    super();
    this.state = {
      firstName: undefined,
      middleName: undefined,
      lastName: undefined,
      gender: 'male',
      errors: {}
    };
  }

  componentDidMount = () => {
    this.fetchUserDetails();
  };

  fetchUserDetails = () => {
    const { id } = LocalStorageManager.getUserObject();
    const { userId } = this.props.match.params;
    const fetchId = userId || id;
    UserApi.getDetails(fetchId)
      .then(({ data }) => {
        const { user } = data;
        const {
          first_name: firstName,
          last_name: lastName,
          middle_name: middleName
        } = user;
        this.setState({ ...data.user, firstName, lastName, middleName });
      })
      .catch(err => {
        Toaster.getErrorToaster('Error fetching profile');
      });
  };

  handleChange = e => {
    const { name, value } = e.target;
    const _state = { ...this.state };
    _state[name] = value;
    _state.errors[`${name}Error`] = '';

    this.setState({ ..._state });
  };

  validateForm = fields => {
    const fieldKeys = Object.keys(fields);
    let hasError = false;
    const errors = { ...this.state.errors };
    fieldKeys.forEach(field => {
      errors[`${field}Error`] = fields[field]
        ? undefined
        : 'This field is required';
      hasError = !fields[field] || hasError;
    });

    this.setState({ errors });
    return hasError;
  };

  handleSubmit = e => {
    e.preventDefault();
    const { firstName, middleName, gender, lastName } = this.state;

    const isFormValid = !this.validateForm({
      firstName,
      lastName
    });

    const { id } = LocalStorageManager.getUserObject();
    const { userId } = this.props.match.params;
    const fetchId = userId || id;

    if (isFormValid) {
      const formData = {
        first_name: firstName,
        middle_name: middleName,
        last_name: lastName,
        gender
      };
      UserApi.update(formData, fetchId)
        .then(({ data }) => {
          Toaster.getSuccessToaster('Profile Updated Successfully');
          this.fetchUserDetails();
          this.props.toggleEditInfo();
        })
        .catch(({ response }) => {
          const message = response ? response.data.message : 'Error occured';
          Toaster.getErrorToaster(message);
        });
    }
  };

  render() {
    const { toggleEditInfo } = this.props;
    const {
      firstName,
      middleName,
      lastName,
      gender,
      errors,
      email
    } = this.state;

    return (
      <React.Fragment>
        <SignUpForm
          firstName={firstName}
          middleName={middleName}
          lastName={lastName}
          gender={gender}
          handleChange={this.handleChange}
          handleSubmit={this.handleSubmit}
          email={email}
          errors={errors}
          cancelAction={toggleEditInfo}
          cancelBtn
          editForm
        />
      </React.Fragment>
    );
  }
}

export default withRouter(Profile);
