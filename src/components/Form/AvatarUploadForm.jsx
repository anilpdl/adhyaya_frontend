/* eslint-disable react/no-array-index-key */
import React, { PureComponent } from 'react';
import Dropzone from 'react-dropzone';
import { Alert } from 'reactstrap';

import FilePreview from 'components/FileUpload/FilePreview';
import FileUploadBlock from 'components/FileUpload/FileUploadBlock';
import FileUploadInline from 'components/FileUpload/FileUploadInline';
import AvatarUpload from '../FileUpload/AvatarUpload';

class AvatarUploadForm extends PureComponent {
  constructor() {
    super();
    this.state = {
      alert: false,
    };
    this.rejected = this.rejected.bind(this);
  }

  onDrop = (file) => {
    const { uploadAvatar } = this.props;
    uploadAvatar(file);
  }

  stopParentEvent = (e) => {
    e.stopPropagation();
  }

  rejected = () => {
    this.setState({ alert: true });
  }

  dismissAlert = () => {
    this.setState({ alert: false });
  }

  render() {
    const { name } = this.props;
    return (
      <div className="col-md-12">
        <Alert color="danger" isOpen={this.state.alert} toggle={this.dismissAlert}>
          File is not acceptable or exceeds file size limit (&gt;12mb).
        </Alert>
        <Dropzone
          accept="image/*"
          name={name}
          onDrop={this.onDrop}
          maxSize={12000000}
          onDropRejected={this.rejected}
        >
          {({ getRootProps, getInputProps }) => (
            <div role="presentation" className="">
              <AvatarUpload getRootProps={getRootProps} getInputProps={getInputProps} />
            </div>
          )
          }
        </Dropzone>
      </div>
    );
  }
}

export default AvatarUploadForm;
