import React, { Component } from 'react';
import { Table, Col, Card, CardBody } from 'reactstrap';

import * as LocalStorageManager from 'constants/LocalStorageManager';
import UserApi from 'apis/User';
import Toaster from 'components/Toaster/ToastManager';
import Profile from 'components/Profile/Profile';
import UserDetails from 'components/Profile/UserDetails';
import ChangePassword from 'components/Profile/ChangePassword';

class UserProfile extends Component {
  constructor() {
    super();
    this.state = {
      profile: {},
      editInfo: false
    }
  }

  componentDidMount = () => {
    this.fetchUserDetails();
  }

  toggleEditInfo = () => {
    this.setState(({ editInfo }) => ({ editInfo: !editInfo }));
    this.fetchUserDetails();
  }

  toggleChangePassword = () => {
    this.setState(({ changePassword }) => ({ changePassword: !changePassword }));
    this.fetchUserDetails();
  }

  fetchUserDetails = () => {
    const { id } = LocalStorageManager.getUserObject();
    UserApi.getDetails(id).then(({ data }) => {
      this.setState({ profile: data.user });
    }).catch(err => {
      Toaster.getErrorToaster('Error fetching profile');
    })
  }

  renderChildren = () => {
    const { editInfo, changePassword, profile } = this.state;
    if (editInfo) {
      return (
        <Profile
          toggleEditInfo={this.toggleEditInfo}
        />
      )
    } else if (changePassword) {
      return (
        <ChangePassword
          toggleChangePassword={this.toggleChangePassword}
        />
      )
    }

    return (
      <UserDetails
        toggleChangePassword={this.toggleChangePassword}
        toggleEditInfo={this.toggleEditInfo}
        profile={profile}
      />
    )
  }

  render() {
    return (
      <Col>
        <Card>
          <CardBody>
            <div className="card__title">
              <h5 className="bold-text">Profile</h5>
            </div>
            {this.renderChildren()}
          </CardBody>
        </Card>
      </Col>
    )
  }
}

export default UserProfile;
