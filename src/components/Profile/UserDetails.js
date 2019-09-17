import React, { Component } from 'react';
import { Label, Input, Row, Col, ButtonGroup, Button } from 'reactstrap';

import UserAvatar from './UserAvatar';

class UserDetails extends Component {
  constructor() {
    super();
    this.state = {

    }
  }

  render() {
    const { profile, toggleChangePassword, toggleEditInfo, uploadAvatar } = this.props;
    const { email, first_name, middle_name, last_name, user_avatar } = profile;

    return (
      <Row className="mb-5">
        <Col md={4}>
          <UserAvatar
            userAvatar={user_avatar}
            uploadAvatar={uploadAvatar}
          />
        </Col>
        <Col className="card__title" md={8}>
          <Row>
            <Col>
              <h2 className="bold-text">
                {first_name} {middle_name} {last_name}
              </h2>
              <h4 className="subhead">
                {email}
              </h4>
            </Col>
          </Row>
          <Row className="mt-5">
            <Col>
              <Button onClick={toggleEditInfo} className="btn-primary text-white">Edit Info</Button>
              <Button onClick={toggleChangePassword} >Change Password</Button>
            </Col>
          </Row>
        </Col>
      </Row>
    );
  }
}

export default UserDetails;
