import React, { Component } from 'react';
import CameraIcon from 'mdi-react/CameraIcon';

import logo from 'assets/img/logo.png';
import AvatarUploadForm from '../Form/AvatarUploadForm';

class UserAvatar extends Component {
  constructor() {
    super();
    this.state = {

    };
  }

  render() {
    const { userAvatar, uploadAvatar } = this.props;
    const { url } = userAvatar || { url: undefined };
    const imageUrl = url ? url : logo;
    console.log(imageUrl)
    return (
      <div className="avatar-container">
        <div className="avatar-image" style={{
          backgroundImage: `url(${imageUrl})`,
          backgroundSize: 'cover'
        }}>
          <div className="avatar-upload cursor-pointer">
            <AvatarUploadForm name="avatar" uploadAvatar={uploadAvatar} />
          </div>
        </div>
      </div>
    )
  }
}

export default UserAvatar;
