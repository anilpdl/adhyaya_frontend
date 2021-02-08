import React, { Component } from 'react';
import { Card, CardBody, Col, Table } from 'reactstrap';
import LoadingIcon from 'mdi-react/LoadingIcon';
import moment from 'moment';

import Toaster from 'components/Toaster/ToastManager';
import UserApi from 'apis/User';
import { formatDate } from 'utils/dataFormatter';
import { insertIdToUrl } from '../../utils/routes';
import ROUTES from '../../constants/Routes';
import Filter from '../Filter/Filter';

class UsersList extends Component {
  constructor() {
    super();
    this.state = {
      users: [],
      isLoading: false,
      filter: {
        endDate: null,
        startDate: null,
      },
    };
  }

  componentDidMount = () => {
    this.setState({ isLoading: true });
    UserApi.getAll()
      .then(({ data }) => {
        const { users } = data;
        this.setState({ users, isLoading: false });
      })
      .catch(({ response }) => {
        const message = response
          ? response.data && response.data.message
          : 'Error occured';
        Toaster.getErrorToaster(message);
        this.setState({ isLoading: false });
      });
  };

  handleRoute = (id) => {
    const { history } = this.props;
    history.push(insertIdToUrl(ROUTES.STUDENT_DATA, id));
  };

  onDateChange = ({ startDate, endDate }) => {
    this.setState({
      filter: { startDate, endDate },
    });
  };

  renderTableContent = (content) => {
    if (content.length) {
      return content;
    }

    return (
      <tr>
        <td className="text-center" colSpan={4}>
          No data to display
        </td>
      </tr>
    );
  };

  navigateToFilesList = (id) => {
    const { history } = this.props;

    history.push(`${ROUTES.FILES_INDEX}?id=${id}`);
  };

  filterUsersList = (users) => {
    const {
      filter: { startDate, endDate },
    } = this.state;

    let filteredUsers = users;

    if (startDate && endDate) {
      filteredUsers = users.filter(({ created_at }) => {
        const createdDate = moment(created_at);
        const isBetween = createdDate.isBetween(
          moment(startDate).subtract(1, 'day'),
          moment(endDate).add(1, 'day')
        );

        return isBetween;
      });
    }

    return filteredUsers;
  };

  render() {
    const { users, isLoading } = this.state;

    const filteredUsers = this.filterUsersList(users);

    const usersList = filteredUsers.map(
      ({ id, first_name, last_name, email, created_at, last_login }, index) => {
        const name = `${first_name} ${last_name}`;
        const lastLogin = moment(formatDate(last_login || created_at))
          .startOf()
          .fromNow();

        return (
          <tr
            className="cursor-pointer"
            key={id}
            onClick={() => this.handleRoute(id)}
          >
            <td>{index + 1}</td>
            <td> {name} </td>
            <td> {email} </td>
            <td> {formatDate(created_at)} </td>
            <td> {lastLogin} </td>
            <td>
              <button
                className="btn btn-sm btn-primary"
                onClick={(e) => {
                  e.stopPropagation();
                  this.navigateToFilesList(id);
                }}
              >
                View files
              </button>
            </td>
          </tr>
        );
      }
    );
    if (isLoading) {
      return (
        <div className="panel__refresh">
          <LoadingIcon />
        </div>
      );
    }

    return (
      <Col md={12} lg={12}>
        <Card>
          <CardBody>
            <div className="card__title">
              <Col md={12} lg={6}>
                <h5 className="bold-text">Students List</h5>
                <h5 className="subhead">
                  Signed up <span className="red-text">students list</span>
                </h5>
              </Col>
              <Col md={12} lg={6}>
                <Filter onDateChange={this.onDateChange} />
              </Col>
            </div>
            <Table responsive className="table--bordered table-hover">
              <thead>
                <tr>
                  <th></th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Created Date</th>
                  <th>Last Login</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>{this.renderTableContent(usersList)}</tbody>
            </Table>
          </CardBody>
        </Card>
      </Col>
    );
  }
}

export default UsersList;
