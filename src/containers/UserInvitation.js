import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

import UserInvitationApi from '../apis/UserInvitation';
import ROUTES from '../constants/Routes';
import FormWrapper from '../components/Wrapper/FormWrapper';
import SignUpForm from '../components/SignUp/SignUpForm';
import SignUp from './SignUp';

class UserInvitation extends Component {
  constructor() {
    super();
    this.state = {
      expired: false
    };
  }

  componentDidMount = () => {
    this.fetchUserInvitation();
  }

  fetchUserInvitation = () => {
    const { invitationId } = this.props.match.params;
    UserInvitationApi.getDetails(invitationId).then(({ data }) => {
      const { expired, userInvitation } = data;
      this.setState({ expired, userInvitation});
  
    }).catch((e) => {
      this.setState({ expired: true })
    })
  }

  render() {
    const { expired } = this.state;

    if(expired)
      return <Redirect to={ROUTES.INVALID_INVITATION} />
    return(
      <div>
        <SignUp />
      </div>
    );
  }
}

export default UserInvitation;
