import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { Form, FormGroup, Input, Label, Button } from 'reactstrap';
import EyeIcon from 'mdi-react/EyeIcon';
import KeyVariantIcon from 'mdi-react/KeyVariantIcon';
import AccountOutlineIcon from 'mdi-react/AccountOutlineIcon';
import EmailIcon from 'mdi-react/MailRuIcon';

const SignUpForm = (props) => {
  const {
    firstName,
    middleName,
    lastName,
    password,
    rePassword,
    gender,
    handleSubmit,
    handleChange,
    showPassword,
    togglePassword,
    email,
    errors,
    editForm,
    cancelBtn,
    cancelAction
  } = props;

  const { firstNameError, lastNameError, passwordError, rePasswordError } = errors;
  const submitText = editForm ? 'Save Changes' : 'Sign Up';

  return (
    <Form className="form">
      {editForm && (
        <FormGroup className="form__form-group">
          <Label className="form__form-group-label">Email</Label>
          <div className="form__form-group-field">
            <div className="form__form-group-icon">
              <EmailIcon />
            </div>
            <Input
              type="email"
              placeholder="Email"
              value={email}
              name="email"
              disabled
            />
          </div>
        </FormGroup>
      )}
      <FormGroup className="form__form-group">
        <Label className="form__form-group-label">First Name*</Label>
        <div className="form__form-group-field">
          <div className="form__form-group-icon">
            <AccountOutlineIcon />
          </div>
          <Input
            onChange={handleChange}
            type="text"
            placeholder="First Name"
            value={firstName}
            name="firstName"
          />
        </div>
        <div className="text-danger">{firstNameError}</div>
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
            placeholder="Middle Name"
            value={middleName}
            name="middleName"
          />
        </div>
      </FormGroup>
      <FormGroup className="form__form-group">
        <Label className="form__form-group-label">Last Name*</Label>
        <div className="form__form-group-field">
          <div className="form__form-group-icon">
            <AccountOutlineIcon />
          </div>
          <Input
            onChange={handleChange}
            type="text"
            placeholder="Last Name"
            value={lastName}
            name="lastName"
          />
        </div>
        <div className="text-danger">{lastNameError}</div>
      </FormGroup>
      <FormGroup className="form__form-group">
        <Label className="form__form-group-label"> Gender* </Label>
        <div className="form__form-group-field">
          <label className="radio-btn">
            <input
              checked={gender == 'male'}
              className="radio-btn__radio"
              value="male" name="gender"
              type="radio"
              onChange={handleChange}
            />
            <span className="radio-btn__radio-custom"></span>
            <span className="radio-btn__label">Male</span>
          </label>
          <label className="radio-btn">
            <input
              className="radio-btn__radio"
              value="female"
              name="gender"
              type="radio"
              onChange={handleChange}
              checked={gender == 'female'}
            />
            <span className="radio-btn__radio-custom"></span>
            <span className="radio-btn__label">Female</span>
          </label>
        </div>
      </FormGroup>
      {!editForm && (
        <Fragment>
          <FormGroup className="form__form-group">
            <Label for="password" className="form__form-group-label">Password*</Label>
            <div className="form__form-group-field">
              <div className="form__form-group-icon">
                <KeyVariantIcon />
              </div>
              <Input
                name="password"
                value={password}
                onChange={handleChange}
                type={togglePassword ? 'text' : 'password'}
                placeholder="Password"
              />
              <button
                type="button"
                className={`form__form-group-button${togglePassword ? ' active' : ''}`}
                onClick={showPassword}
              >
                <EyeIcon />
              </button>
            </div>
            <div className="text-danger">{passwordError}</div>

          </FormGroup>
          <FormGroup className="form__form-group">
            <Label for="password" className="form__form-group-label">ReType Password *</Label>
            <div className="form__form-group-field">
              <div className="form__form-group-icon">
                <KeyVariantIcon />
              </div>
              <Input
                name="rePassword"
                value={rePassword}
                onChange={handleChange}
                type={togglePassword ? 'text' : 'password'}
                placeholder="Confirm Password"
              />
              <button
                type="button"
                className={`form__form-group-button${togglePassword ? ' active' : ''}`}
                onClick={showPassword}
              >
                <EyeIcon />
              </button>
            </div>
            <div className="text-danger">{rePasswordError}</div>
          </FormGroup>
        </Fragment>
      )}
      <button className="btn btn-primary account__btn account__btn--small" onClick={handleSubmit}>
        {submitText}
      </button>
      {cancelBtn && (
        <button className="btn btn-secondary account__btn account__btn--small" onClick={cancelAction} >Cancel</button>
      )}
    </Form>
  );
}

export default SignUpForm;

