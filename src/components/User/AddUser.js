import React, { Component } from 'react';
import { Input, Form, Col } from 'reactstrap';

class AddUser extends Component {
  render() {
    const { email, emailError, handleChange, handleSubmit } = this.props;

    return (
      <Form>
        <Col md={6}>
          Email:
          <Input className="mb-3" name="email" type="email" value={email} onChange={handleChange} />
          <div className="text-danger">{emailError}</div>
          <button className="btn btn-primary" onClick={handleSubmit}>Submit</button>
        </Col>
      </Form>
    );
  }
}

export default AddUser;
