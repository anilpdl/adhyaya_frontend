import React, { Component } from 'react';
import { Table, Col, Card, CardBody } from 'reactstrap';

import Toaster from 'components/Toaster/ToastManager';
import FileApi from 'apis/File';
import FileRow from 'components/Files/FileRow';
import { getUserObject } from '../../constants/LocalStorageManager';

class FileList extends Component {
  constructor() {
    super();
    this.state = {
      files: []
    }
  }

  componentDidMount = () => {
    this.fetchAllFiles();
  }

  fetchAllFiles = async () => {
    try {
      const { data } = await FileApi.getAll();
      this.setState({ files: data, isLoading: false });
    } catch (err) {
      Toaster.getErrorToaster("Error fetchinf files");
      this.setState({ isLoading: false });
    }
  }

  render() {
    const { files } = this.state;
    const fileList = files.map(file => <FileRow key={file.id} file={file} />);
    return (
      <Col>
        <Card>
          <CardBody>
            <div className="card__title">
              <h5 className="bold-text">Files</h5>
              <h5 className="subhead">Files List</h5>
            </div>
            <Table responsive className="table--bordered">
              <thead>
                <tr>
                  <th></th>
                  <th>Preview</th>
                  <th>Name</th>
                  <th>Type</th>
                  <th>Uploaded By</th>
                  <th>Upload Date</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {fileList}
              </tbody>
            </Table>
          </CardBody>
        </Card>
      </Col>
    );
  }
}

export default FileList;
