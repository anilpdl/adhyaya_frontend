import React, { Component } from 'react';
import { Form, Col, Card, CardBody } from 'reactstrap';

import Toaster from 'components/Toaster/ToastManager';
import FileApi from 'apis/File';
import FilePreview from '../../components/Files/FileThumbnail';
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
    try{
      const { data } = await FileApi.getAll();
      this.setState({ files: data, isLoading: false });
    } catch(err) {
      this.setState({ isLoading: false });
    }
  }

  render() {
    const { files } = this.state;
    const fileList = files.map(file => <FilePreview file={file} />);
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
            {fileList}
          </CardBody>
        </Card>
      </Col>
    );
  }
}

export default FileList;
