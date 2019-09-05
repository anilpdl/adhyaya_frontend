import React from 'react';
import PropTypes from 'prop-types';

const pdfPreview = require('assets/img/pdf.png');

const FilePreview = ({ file, removeFile, index }) => {
  const isPDF = file.type.includes('pdf');
  const preview = !isPDF? file.preview: pdfPreview;
  return (
  <div
    className="dropzone__img"
    style={{ width: 183, backgroundImage: `url(${preview})` }
    }
  >
    <p className="dropzone__img-name">{file.name}</p>
    <button className="dropzone__img-delete" onClick={e => removeFile(index, e)}>
      Remove
    </button>
  </div>
);}

FilePreview.propTypes = {
  file: PropTypes.shape({
    preview: PropTypes.string,
  }).isRequired,
  removeFile: PropTypes.func.isRequired,
  index: PropTypes.number.isRequired,
};

export default FilePreview;
