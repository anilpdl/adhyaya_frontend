import React, { Component } from 'react';
import { Table, Col, Card, CardBody } from 'reactstrap';

import Toaster from 'components/Toaster/ToastManager';
import FileApi from 'apis/File';
import FileRow from 'components/Files/FileRow';
import { getUserObject } from '../../constants/LocalStorageManager';
import FileModal from '../../components/Files/FileModal';

class FileList extends Component {
  constructor() {
    super();
    this.state = {
      files: [],
      file: {},
      isFileModalVisible: false,
      fileId: undefined
    }
  }

  componentDidMount = () => {
    this.fetchAllFiles();
  }

  fetchFile = async () => {
    const { fileId } = this.state;
    if (!fileId)
      return;
    this.setState({ isFetchingFile: true });
    try {
      const { data } = await FileApi.getDetails(fileId);
      this.setState({ file: data, isFetchingFile: false });
    } catch (err) {
      Toaster.getErrorToaster("Error fetching file data");
      this.setState({ isFetchingFile: false });
      this.toggleApproveModal();
    }
  }

  fetchAllFiles = async () => {
    this.setState({ isLoading: true })
    try {
      const { data } = await FileApi.getAll();
      this.setState({ files: data, isLoading: false });
    } catch (err) {
      Toaster.getErrorToaster("Error fetching files");
      this.setState({ isLoading: false });
    }
  }

  approveFile = async () => {
    const { fileId } = this.state;
    const { id: approverId } = getUserObject();
    if (!fileId)
      return;
    this.setState({ isFetchingFile: true });
    try {
      const { data } = await FileApi.approveFile(fileId, approverId);
      if (data)
        this.fetchAllFiles();
      this.toggleApproveModal();
    } catch (err) {
      Toaster.getErrorToaster("Error approving file");
      this.setState({ isFetchingFile: false });
      this.toggleApproveModal();
    }
  }

  toggleApproveModal = (id) => {
    let fileId;
    if (typeof id == "number") fileId = id;
    this.setState(prevState => ({
      fileId,
      isFileModalVisible: !prevState.isFileModalVisible
    }), this.fetchFile);
  }

  render() {
    const { files, isFileModalVisible, file, isFetchingFile } = this.state;
    const fileList = files.map(file => <FileRow toggleApproveModal={this.toggleApproveModal} key={file.id} file={file} />);
    return (
      <Col>
        <Card>
          <FileModal
            isVisible={isFileModalVisible}
            toggleModal={this.toggleApproveModal}
            isFetchingFile={isFetchingFile}
            approveFile={this.approveFile}
            file={file}
          />
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
                  <th>Approve Status</th>
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
