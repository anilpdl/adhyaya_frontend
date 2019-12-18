import React, { Component } from 'react';
import { Container, Row, Col, Card, CardBody } from 'reactstrap';

import DashboardWidget from '../components/Dashboard/DashboardWidget';
import ROUTES from '../constants/Routes';
import DashboardApi from '../apis/Dashboard';
import { getUserObject } from '../constants/LocalStorageManager';
import UserApi from '../apis/User';
import { isAdminAccount } from '../utils/userHelpers';

class Dashboard extends Component {
  constructor() {
    super();
    this.state = {
      dashboard: {
        user_count: 0,
        file_count: 0,
        user_invitation_count: 0
      }
    };
  }

  componentDidMount() {
    this.fetchDashboardDetails();
  }

  fetchDashboardDetails = () => {
    const { id } = getUserObject();
    UserApi.getDetails(id)
      .then(console.log)
      .catch(console.log);
    DashboardApi.getDetails()
      .then(({ data }) => {
        this.setState({ dashboard: data });
      })
      .catch(console.log);
  };

  render() {
    const { dashboard } = this.state;
    const { user_count, user_invitation_count, file_count } = dashboard;
    const isAdmin = isAdminAccount();
    if (!isAdmin) return null;
    return (
      <Container>
        <Row>
          <DashboardWidget
            title='Students'
            subtitle='Total number of students registered'
            count={user_count}
            path={ROUTES.LIST_USERS}
          />
          <DashboardWidget
            title='Invitations'
            subtitle='Total number of pending invitations'
            count={user_invitation_count}
            path={ROUTES.USER_INVITATIONS_INDEX}
          />
          <DashboardWidget
            title='Files'
            subtitle='Total number of files uploaded'
            count={file_count}
            path={ROUTES.FILES_INDEX}
          />
        </Row>
      </Container>
    );
  }
}

export default Dashboard;
