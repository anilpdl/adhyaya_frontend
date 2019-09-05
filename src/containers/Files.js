import React, { Component } from 'react';
import { Form, Col, Card, CardBody } from 'reactstrap';
import DropZoneMultipleField from '../components/Form/DropZoneMultiple';
import FileApi from '../apis/File';


class Files extends Component {
  constructor() {
    super();
    this.state = {
      value: [],
    }
  }

  handleUpload = (e) => {
    e.preventDefault();
    const { value } = this.state;
    const files = new FormData();

    value.forEach(file => {
      files.append('file', file);
    });

    FileApi.upload(files).then(console.log)
      .catch(console.log);
  }

  onChange = (value) => {
    this.setState({ value });
  }

  render() {
    const { value } = this.state;

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
            <Form>
              <Col sm={12}>
                <DropZoneMultipleField value={value} onChange={this.onChange} />
                <button className="btn btn-primary mt-3" onClick={this.handleUpload}>Upload</button>
              </Col>
            </Form>
          </CardBody>
        </Card>
      </Col>
    );
  }
}

export default Files;
