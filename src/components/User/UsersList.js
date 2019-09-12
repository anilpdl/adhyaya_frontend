import React, { Component } from 'react';
import { Card, CardBody, Col, Table } from 'reactstrap';
import LoadingIcon from 'mdi-react/LoadingIcon';


import Toaster from 'components/Toaster/ToastManager';
import UserApi from 'apis/User';
import { formatDate } from 'utils/dataFormatter';

class UsersList extends Component {
  constructor() {
    super();
    this.state = {
      users: [],
      isLoading: false,
    }
  }

  componentDidMount = () => {
    this.setState({ isLoading: true })
    UserApi.getAll().then(({ data }) => {
      const { users } = data;
      this.setState({ users, isLoading: false });
    }).catch(({ response }) => {
      const message = response ? response.data && response.data.message : 'Error occured';
      Toaster.getErrorToaster(message);
      this.setState({ isLoading: false });
    });
  }

  renderTableContent = (content) => {
    if (content.length) {
      return content;
    }

    return <tr>
      <td className="text-center" colSpan={4}>No data to display</td></tr>;
  }

  render() {
    const { users, isLoading } = this.state;
    const usersList = users.map(({
      id, first_name, last_name, email, created_at, last_login
    }, index) => {
      const name = `${first_name} ${last_name}`;

      return (
        <tr key={id}>
          <td>{index + 1}</td>
          <td> {name} </td>
          <td> {email} </td>
          <td> {formatDate(created_at)} </td>
          <td> {formatDate(last_login || created_at)} </td>
        </tr>
      );
    })
    if (isLoading) {
      return (<div className="panel__refresh"><LoadingIcon /></div>)
    }

    return (
      <Col md={12} lg={12}>
        <Card>
          <CardBody>
            <div className="card__title">
              <h5 className="bold-text">Students List</h5>
              <h5 className="subhead">Signed up <span className="red-text">students list</span></h5>
            </div>
            <Table responsive className="table--bordered">
              <thead>
                <tr>
                  <th></th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Created Date</th>
                  <th>Last Login</th>
                </tr>
              </thead>
              <tbody>
                {
                  this.renderTableContent(usersList)
                }
              </tbody>
            </Table>
          </CardBody>
        </Card>
      </Col>
    );
  }
}

export default UsersList;
