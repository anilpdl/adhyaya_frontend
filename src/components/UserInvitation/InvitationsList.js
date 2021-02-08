import React, { Component } from 'react';
import { Card, CardBody, Col, Table } from 'reactstrap';
import LoadingIcon from 'mdi-react/LoadingIcon';
import MailIcon from 'mdi-react/EmailOutlineIcon';
import TrashIcon from 'mdi-react/TrashCanOutlineIcon';

import Toaster from 'components/Toaster/ToastManager';
import UserInvitationApi from 'apis/UserInvitation';
import { formatDate } from 'utils/dataFormatter';

import DeleteModal from './DeleteModal';
import Filter from '../Filter/Filter';
import moment from 'moment';

class InvitationsList extends Component {
  constructor() {
    super();
    this.state = {
      userInvitations: [],
      deleteId: undefined,
      isDeleteModalVisible: false,
      isLoading: false,
      filter: {},
    };
  }

  componentDidMount = () => {
    this.fetchUserInvitations();
  };

  cancelDelete = () => {
    this.setState({ deleteId: undefined, isDeleteModalVisible: false });
  };

  deleteInvitation = (id) => {
    this.setState({ deleteId: id, isDeleteModalVisible: true });
  };

  confirmDelete = (id) => {
    UserInvitationApi.deleteInvitation(id)
      .then(() => {
        Toaster.getSuccessToaster('Invitation link deleted successfully');
        this.setState({ isDeleteModalVisible: false });
        this.fetchUserInvitations();
      })
      .catch(() => Toaster.getErrorToaster('Error deleting invitation link '));
  };

  toggleDeleteModal = () => {
    this.setState(({ isDeleteModalVisible }) => ({
      isDeleteModalVisible: !isDeleteModalVisible,
    }));
  };

  fetchUserInvitations = () => {
    this.setState({ isLoading: true });
    UserInvitationApi.getAll()
      .then(({ data }) => {
        const { userInvitations } = data;
        this.setState({ userInvitations, isLoading: false });
      })
      .catch(({ response }) => {
        const message = response
          ? response.data && response.data.message
          : 'Error occured';
        Toaster.getErrorToaster(message);
        this.setState({ isLoading: false });
      });
  };

  resendInvitation = (id) => {
    UserInvitationApi.resendInvitation(id)
      .then(({ data }) => {
        const { userInvitation } = data;
        const { email } = userInvitation;

        this.fetchUserInvitations();
        Toaster.getSuccessToaster(`Invitation link resent to ${email}`);
      })
      .catch(() => Toaster.getErrorToaster('Error re-sending invitation link'));
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

  filterInvitationsList = (files) => {
    const {
      filter: { startDate, endDate },
    } = this.state;

    let filteredUsers = files;

    if (startDate && endDate) {
      filteredUsers = files.filter(({ created_at }) => {
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

  onDateChange = (filter) => {
    this.setState({ filter });
  };

  render() {
    const {
      userInvitations,
      isLoading,
      isDeleteModalVisible,
      deleteId,
    } = this.state;

    const filteredInvitations = this.filterInvitationsList(userInvitations);

    const userInvitationsList = filteredInvitations.map(
      ({ id, email, updated_at }, index) => {
        return (
          <tr key={id}>
            <td> {index + 1} </td>
            <td>{email}</td>
            <td>{formatDate(updated_at)}</td>
            <td>
              <button
                className="btn btn-secondary"
                onClick={() => this.resendInvitation(id)}
              >
                <MailIcon />
              </button>
              <button
                className="btn btn-danger"
                onClick={() => this.deleteInvitation(id)}
              >
                <TrashIcon />
              </button>
            </td>
          </tr>
        );
      }
    );

    return (
      <Col md={12} lg={12}>
        <DeleteModal
          deleteId={deleteId}
          isVisible={isDeleteModalVisible}
          toggleModal={this.toggleDeleteModal}
          confirmDelete={this.confirmDelete}
        />
        <Card>
          <CardBody>
            <div className="card__title">
              <Col md={12} lg={6}>
                <h5 className="bold-text">Pending Invitation</h5>
                <h5 className="subhead">
                  Invitations pending{' '}
                  <span className="red-text">confirmations</span>
                </h5>
              </Col>
              <Col md={12} lg={6}>
                <Filter onDateChange={this.onDateChange} />
              </Col>
            </div>
            <Table responsive className="table--bordered">
              <thead>
                <tr>
                  <th></th>
                  <th>Email</th>
                  <th>Invitation Date</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {isLoading ? (
                  <div className="panel__refresh">
                    <LoadingIcon />
                  </div>
                ) : (
                  this.renderTableContent(userInvitationsList)
                )}
              </tbody>
            </Table>
          </CardBody>
        </Card>
      </Col>
    );
  }
}

export default InvitationsList;
