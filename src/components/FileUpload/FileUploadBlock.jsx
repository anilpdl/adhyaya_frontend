import React from 'react';
import PropTypes from 'prop-types';

const FileUploadBlock = ({ getRootProps, getInputProps }) => (
  <div
    className="dropzone__drop-here"
    {...getRootProps()}
  >
    <input {...getInputProps()} />
    <span className="lnr lnr-upload" /> Drop files here to upload
  </div>
);

export default FileUploadBlock;
