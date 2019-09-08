/* eslint-disable react/no-array-index-key */
import React, { PureComponent } from 'react';
import Dropzone from 'react-dropzone';
import { Alert } from 'reactstrap';

import FilePreview from 'components/FileUpload/FilePreview';
import FileUploadBlock from 'components/FileUpload/FileUploadBlock';
import FileUploadInline from 'components/FileUpload/FileUploadInline';

class DropZoneMultipleField extends PureComponent {
  constructor() {
    super();
    this.state = {
      alert: false,
    };
    this.rejected = this.rejected.bind(this);
  }

  onDrop = (files) => {
    const { value, onChange } = this.props;
    const prevFiles = [...value];
    files.forEach((file) => {
      file.preview = URL.createObjectURL(file);
    });
    const newFiles = [...prevFiles, ...files];
    onChange(newFiles);
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
          File is not acceptable or exceeds file size limit (&gt;12mb).
        </Alert>
        <Dropzone
          accept="image/*, application/pdf"
          name={name}
          onDrop={this.onDrop}
          multiple
          maxSize={12000000}
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

export default DropZoneMultipleField;
