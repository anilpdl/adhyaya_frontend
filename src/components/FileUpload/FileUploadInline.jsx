import React from 'react';
import PropTypes from 'prop-types';

import PlusIcon from 'mdi-react/PlusCircleOutlineIcon';

const FileUploadInline = ({ getRootProps, getInputProps, open }) => (
  <div
    role="presentation"
    className="dropzone__img d-flex
    justify-content-center align-items-center"
    onClick={open}
    style={{
      width: 183,
      borderStyle: 'dotted',
      outline: 'none',
      borderColor: '#e9eaed',
    }
    }
    {...getRootProps()}
  >
    <input {...getInputProps()} />
    <div>
      <PlusIcon size="5em" color="#e9eaed" />
    </div>
  </div>
);

export default FileUploadInline;
