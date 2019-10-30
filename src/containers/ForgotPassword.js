import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Form, Col, Input} from 'reactstrap'

import FormWrapper from 'components/Wrapper/FormWrapper';
import UserApi from 'apis/User';
import Toaster from 'components/Toaster/ToastManager';
import ROUTES from 'constants/Routes';
import REG_EXP from 'constants/RegExp';

const ForgotForm = ({
  email,
  emailError,
  handleChange,
  handleSubmit
}) => (
    <Form>
      <Col md={6} lg={12}>
        Email:
          <Input
          name="email"
          type="email"
          value={email}
          onChange={handleChange}
        />
        <div className="text-danger mb-3">{emailError}</div>
        <button className="btn btn-primary" onClick={handleSubmit}>Reset Password</button>
      </Col>
    </Form>
  );

class ForgotPassword extends Component {
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
    if (!result) {
      this.setState({ emailError: 'Email is invalid' });
    }
    return result;
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const { email } = this.state;
    const isEmailValid = this.validateEmail(email);

    if (isEmailValid) {
      UserApi.forgotPassword({ email }).then(({ data }) => {
        Toaster.getSuccessToaster(`Password reset link sent to ${email}`);
        this.props.history.push(ROUTES.LOGIN);
      }).catch(({ response }) => {
        const message = response ? response.data.message : 'Error Occured';
        Toaster.getErrorToaster(message);
      });
    }
  }

  render() {
    const { email, emailError } = this.state;

    return (
      <FormWrapper>
        <ForgotForm
          email={email}
          emailError={emailError}
          handleChange={this.handleChange}
          handleSubmit={this.handleSubmit} />
      </FormWrapper>
    );
  }
}

export default withRouter(ForgotPassword);
