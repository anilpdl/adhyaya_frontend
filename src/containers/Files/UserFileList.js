import React, { Component } from 'react';
import { Table, Col, Card, CardBody } from 'reactstrap';

import Toaster from 'components/Toaster/ToastManager';
import FileApi from 'apis/File';
import FileRow from 'components/Files/FileRow';
import { getUserObject } from '../../constants/LocalStorageManager';
import FileModal from '../../components/Files/FileModal';
import DeleteModal from '../../components/Files/FileDeleteModal';

class UserFileList extends Component {
  constructor() {
    super();
    this.state = {
      files: [],
      file: {},
      isFileModalVisible: false,
      fileId: undefined,
      isDeleteModalVisible: false,
      deleteFile: {}
    }
  }

  componentDidMount = () => {
    this.fetchAllFiles();
  }

  fetchAllFiles = async () => {
    const { id } = getUserObject();
    this.setState({ isLoading: true });

    try {
      const { data } = await FileApi.fetchUserFiles(id);
      this.setState({ files: data, isLoading: false });
    } catch (err) {
      Toaster.getErrorToaster("Error fetching files");
      this.setState({ isLoading: false });
    }
  }

  toggleDeleteModal = (file) => {
    let deleteFile;
    if (typeof file == "object" && file.id) deleteFile = file;
    this.setState(prevState => ({
      deleteFile,
      isDeleteModalVisible: !prevState.isDeleteModalVisible
    }));
  }

  confirmDelete = async () => {
    const { deleteFile } = this.state;
    if (!deleteFile.id)
      return;
    try {
      const status = await FileApi.deleteFile(deleteFile.id);
      Toaster.getSuccessToaster("File deleted successfully");
      this.fetchAllFiles();
    } catch (e) {
      console.log(e)
      Toaster.getErrorToaster("Error deleting file");
    }

    this.toggleDeleteModal();
  }

  render() {
    const { files, isDeleteModalVisible, deleteFile } = this.state;
    const fileList = files.map(file => (
      <FileRow
        isUser
        toggleApproveModal={this.toggleApproveModal}
        key={file.id}
        file={file}
        toggleDeleteModal={this.toggleDeleteModal}
      />
    ));
    return (
      <Col>
        <Card>
          <DeleteModal
            isVisible={isDeleteModalVisible}
            toggleModal={this.toggleDeleteModal}
            confirmDelete={this.confirmDelete}
            file={deleteFile}
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

export default UserFileList;
