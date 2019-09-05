/* eslint-disable react/no-array-index-key */
import React, { PureComponent } from 'react';
import Dropzone from 'react-dropzone';
import PropTypes from 'prop-types';
import { Alert } from 'reactstrap';

import FilePreview from 'components/FileUpload/FilePreview';
import FileUploadBlock from 'components/FileUpload/FileUploadBlock';
import FileUploadInline from 'components/FileUpload/FileUploadInline';

// import toBase64Encoder from 'utils/toBase64Encoder';

class DropZoneMultipleField extends PureComponent {
  static propTypes = {
    onChange: PropTypes.func.isRequired,
    name: PropTypes.string.isRequired,
    value: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.arrayOf(PropTypes.shape({
        name: PropTypes.string,
      })),
    ]).isRequired,
  };

  constructor() {
    super();
    this.state = {
      alert: false,
    };
    this.rejected = this.rejected.bind(this);
  }

  onDrop = (files) => {
    const { value, onChange } = this.props;
    files.forEach((file) => {
      file.preview = URL.createObjectURL(file);
      onChange(value ? value.concat(file) : [file]);
    });
  }

  stopParentEvent = (e) => {
    e.stopPropagation();
  }

  removeFile = (index, e) => {
    e.preventDefault();
    e.stopPropagation();
    this.props.onChange(this.props.value.filter((val, i) => i !== index));
  };

  // eslint-disable-next-line class-methods-use-this
  rejected = () => {
    this.setState({ alert: true });
  }

  dismissAlert = () => {
    this.setState({ alert: false });
  }

  render() {
    const { name, value: files } = this.props;
    return (
      <div className="col-md-12">
        <Alert color="danger" isOpen={this.state.alert} toggle={this.dismissAlert}>
          File is not acceptable or exceeds file size limit (&gt;5mb).
        </Alert>
        <Dropzone
          accept="image/png, image/jpg, application/pdf"
          name={name}
          onDrop={this.onDrop}
          multiple={false}
          maxSize={5000000}
          onDropRejected={this.rejected}
        >
          {({ getRootProps, getInputProps, open }) => (
            <div role="presentation" className="dropzone dropzone--multiple" onClick={open}>
              {files.length === 0 && (
                <FileUploadBlock getRootProps={getRootProps} getInputProps={getInputProps} />
              )}
              {files.length > 0 && Array.isArray(files) && (
                <div
                  role="presentation"
                  className="dropzone__imgs-wrapper"
                  {...getRootProps()}
                  onClick={this.stopParentEvent}
                >
                  {files.map((file, i) => (
                    <FilePreview key={i} file={file} removeFile={this.removeFile} index={i} />
                  ))}
                  <FileUploadInline open={open} getRootProps={getRootProps} getInputProps={getInputProps} />
                </div>
              )}
            </div>
          )
          }
        </Dropzone>
      </div>
    );
  }
}

const renderDropZoneMultipleField = props => (
  <DropZoneMultipleField
    {...props.input}
  />
);

renderDropZoneMultipleField.propTypes = {
  input: PropTypes.shape({
    onChange: PropTypes.func,
    name: PropTypes.string,
  }).isRequired,
};

export default DropZoneMultipleField;
