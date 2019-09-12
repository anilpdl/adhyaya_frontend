import React, { Component } from 'react';
import { Form, Col, Card, CardBody } from 'reactstrap';
import Toaster from 'components/Toaster/ToastManager';
import DropZoneMultipleField from 'components/Form/DropZoneMultiple';
import FileApi from 'apis/File';
import { getUserObject } from '../../constants/LocalStorageManager';

class Files extends Component {
  constructor() {
    super();
    this.state = {
      value: [],
      numPages: 0,
      disabled: false
    }
  }

  handleUpload = (e) => {
    e.preventDefault();
    const { value } = this.state;
    const { id } = getUserObject();
    if (value.length) {
      this.setState({ disabled: true });
      const files = new FormData();

      for (var x = 0; x < value.length; x++) {
        files.append('file', value[x])
      }

      FileApi.upload(files, id).then(() => {
        Toaster.getSuccessToaster('Files Uploaded Successfully')
        this.setState({ value: [], disabled: false });
      }).catch(({ response }) => {
        const { data } = response;
        Toaster.getErrorToaster(data.message);
        this.setState({ disabled: false });
      });
    }
  }

  onChange = (value) => {
    this.setState({ value });
  }

  onDocumentLoadSuccess = ({ numPages }) => {
    this.setState({ numPages });
  }

  onLoadError = (e) => {
    console.log(e)
  }

  render() {
    const { value, disabled, numPages } = this.state;

    return (
      <Col>
        <Card>
          <CardBody>
            <div className="card__title">
              <h5 className="bold-text">Files</h5>
              <h5 className="subhead">Files List</h5>
            </div>
            Note:
            <div className="text-info">
              Naming files with file type and student name is preferred.
              Eg:
              SOP_Adhyaya.pdf
            </div>
            <Form onSubmit={this.handleUpload}>
              <Col sm={12}>
                <DropZoneMultipleField name="file" value={value} onChange={this.onChange} />
                <button disabled={disabled} className="btn btn-primary mt-3">
                  {disabled ? 'Uploading' : 'Upload'}
                </button>
              </Col>
            </Form>
          </CardBody>
        </Card>
      </Col>
    );
  }
}

export default Files;
