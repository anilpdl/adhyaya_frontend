import React, { PureComponent } from 'react';
import { Link } from 'react-router-dom';
import { Form, FormGroup, Input, Label } from 'reactstrap';

import ROUTES from 'constants/Routes';

class LogInForm extends PureComponent {
  constructor() {
    super();
    this.state = {
      showPassword: false,
    };
  }

  showPassword = (e) => {
    e.preventDefault();
    this.setState(prevState => ({ showPassword: !prevState.showPassword }));
  };

  render() {
    const { email, password, handleSubmit, handleChange } = this.props;
    const { showPassword } = this.state;
    return (
      <Form className="form" onSubmit={handleSubmit}>
        <FormGroup className="form__form-group">
          <Label className="form__form-group-label">Email</Label>
          <div className="form__form-group-field">
            <div className="form__form-group-icon">
              {/* Account outline */}
            </div>
            <Input 
              onChange={handleChange} 
              type="text" 
              placeholder="Email" 
              value={email} 
              name="email" 
            />
          </div>
        </FormGroup>
        <FormGroup className="form__form-group">
          <Label for="password" className="form__form-group-label">Password</Label>
          <div className="form__form-group-field">
            <div className="form__form-group-icon">
              <i className="glyphicon" />
            </div>
            <Input
              name="password"
              value={password}
              onChange={handleChange}
              type={showPassword ? 'text' : 'password'}
              placeholder="Password"
            />
            <button
              type="button"
              className={`form__form-group-button${showPassword ? ' active' : ''}`}
              onClick={e => this.showPassword(e)}
            >
              {/* Eye */}
            </button>
          </div>
          <div className="account__forgot-password">
            <a href="/">Forgot a password?</a>
          </div>
        </FormGroup>
        <button className="btn btn-primary account__btn account__btn--small" onClick={handleSubmit}>
          Sign In
        </button>
      </Form>
    );
  }
}

export default LogInForm;

