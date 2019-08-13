import React, { PureComponent } from 'react';
import { Link } from 'react-router-dom';
import { Form, FormGroup, Input, Label } from 'reactstrap';
import EyeIcon from 'mdi-react/EyeIcon';
import KeyVariantIcon from 'mdi-react/KeyVariantIcon';
import AccountOutlineIcon from 'mdi-react/AccountOutlineIcon';

class SignUpForm extends PureComponent {
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
    const { firstName, lastName, password, handleSubmit, handleChange } = this.props;
    const { showPassword } = this.state;
    return (
      <Form className="form" onSubmit={handleSubmit}>
        <FormGroup className="form__form-group">
          <Label className="form__form-group-label">First Name</Label>
          <div className="form__form-group-field">
            <div className="form__form-group-icon">
              <AccountOutlineIcon />
            </div>
            <Input 
              onChange={handleChange} 
              type="text" 
              placeholder="text" 
              value={firstName} 
              name="firstName" 
            />
          </div>
        </FormGroup>
        <FormGroup className="form__form-group">
          <Label className="form__form-group-label">Middle Name</Label>
          <div className="form__form-group-field">
            <div className="form__form-group-icon">
              <AccountOutlineIcon />
            </div>
            <Input 
              onChange={handleChange} 
              type="text" 
              placeholder="text" 
              value={middleName} 
              name="middleName" 
            />
          </div>
        </FormGroup>
        
        <FormGroup className="form__form-group">
          <Label className="form__form-group-label">Last Name</Label>
          <div className="form__form-group-field">
            <div className="form__form-group-icon">
              <AccountOutlineIcon />
            </div>
            <Input 
              onChange={handleChange} 
              type="text" 
              placeholder="text" 
              value={lastName} 
              name="lastName" 
            />
          </div>
        </FormGroup>
        <FormGroup className="form__form-group">
          <Label for="password" className="form__form-group-label">Password</Label>
          <div className="form__form-group-field">
            <div className="form__form-group-icon">
              <KeyVariantIcon />
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
              <EyeIcon />
            </button>
          </div>
        </FormGroup>
        <FormGroup className="form__form-group">
          <Label for="password" className="form__form-group-label">ReType Password</Label>
          <div className="form__form-group-field">
            <div className="form__form-group-icon">
              <KeyVariantIcon />
            </div>
            <Input
              name="rePassword"
              value={rePassword}
              onChange={handleChange}
              type={showPassword ? 'text' : 'password'}
              placeholder="Confirm Password"
            />
            <button
              type="button"
              className={`form__form-group-button${showPassword ? ' active' : ''}`}
              onClick={e => this.showPassword(e)}
            >
              <EyeIcon />
            </button>
          </div>
        </FormGroup>
        
        <button className="btn btn-primary account__btn account__btn--small" onClick={handleSubmit}>
          Sign In
        </button>
      </Form>
    );
  }
}

export default SignUpForm;

