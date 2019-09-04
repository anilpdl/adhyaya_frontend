import React, { Component } from 'react';
import { Input, Form, Col, Card, CardBody } from 'reactstrap';


class AddUser extends Component {
  render() {
    const { email, emailError, handleChange, handleSubmit } = this.props;

    return (
      <Col>
        <Card>
          <CardBody>
            <div className="card__title">
              <h5 className="bold-text">Invite user</h5>
              <h5 className="subhead">Enter email to invite user</h5>
            </div>
            <Form>
              <Col md={6}>
                Email:
                <Input
                  name="email"
                  type="email"
                  value={email}
                  onChange={handleChange}
                />
                <div className="text-danger mb-3">{emailError}</div>
                <button className="btn btn-primary" onClick={handleSubmit}>Submit</button>
              </Col>
            </Form>
          </CardBody>
        </Card></Col>
    );
  }
}

export default AddUser;
