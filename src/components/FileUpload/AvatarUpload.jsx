import React from 'react';
import CameraIcon from 'mdi-react/CameraIcon';

const AvatarUpload = ({ getRootProps, getInputProps }) => (
  <div
    className="dropzone__drop-here"
    {...getRootProps()}
  >
    <input {...getInputProps()} />
      <CameraIcon />
      Change Avatar
  </div>
);

export default AvatarUpload;
