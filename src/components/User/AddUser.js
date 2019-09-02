import React, { Component } from 'react';
import { Input, Form, Col } from 'reactstrap';

class AddUser extends Component {
  render() {
    const { email, emailError, handleChange, handleSubmit } = this.props;

    return (
      <Form>
        <Col md={6}>
          Email:
          <Input name="email" type="email" value={email} onChange={handleChange} />
          <div className="text-danger mb-3">{emailError}</div>
          <button className="btn btn-primary" onClick={handleSubmit}>Submit</button>
        </Col>
      </Form>
    );
  }
}

export default AddUser;
