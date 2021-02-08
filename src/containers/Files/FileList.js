import React, { Component } from 'react';
import { Table, Col, Card, CardBody } from 'reactstrap';

import Toaster from 'components/Toaster/ToastManager';
import FileApi from 'apis/File';
import FileRow from 'components/Files/FileRow';
import { getUserObject } from '../../constants/LocalStorageManager';
import FileModal from '../../components/Files/FileModal';
import DeleteModal from '../../components/Files/FileDeleteModal';
import { fetchQueryParams } from '../../utils/routes';
import Filter from '../../components/Filter/Filter';
import moment from 'moment';

class FileList extends Component {
  constructor() {
    super();
    this.state = {
      files: [],
      file: {},
      isFileModalVisible: false,
      fileId: undefined,
      isDeleteModalVisible: false,
      deleteFile: {},
      filter: {},
    };
  }

  componentDidMount = () => {
    this.fetchAllFiles();
  };

  fetchFile = async () => {
    const { fileId } = this.state;
    if (!fileId) return;
    this.setState({ isFetchingFile: true });
    try {
      const { data } = await FileApi.getDetails(fileId);
      this.setState({ file: data, isFetchingFile: false });
    } catch (err) {
      Toaster.getErrorToaster('Error fetching file data');
      this.setState({ isFetchingFile: false });
      this.toggleApproveModal();
    }
  };

  fetchAllFiles = async () => {
    this.setState({ isLoading: true });
    try {
      const { data } = await FileApi.getAll();
      this.setState({ files: data, isLoading: false });
    } catch (err) {
      Toaster.getErrorToaster('Error fetching files');
      this.setState({ isLoading: false });
    }
  };

  approveFile = async () => {
    const { fileId } = this.state;
    const { id: approverId } = getUserObject();
    if (!fileId) return;
    this.setState({ isFetchingFile: true });
    try {
      const { data } = await FileApi.approveFile(fileId, approverId);
      if (data) this.fetchAllFiles();
      this.toggleApproveModal();
    } catch (err) {
      Toaster.getErrorToaster('Error approving file');
      this.setState({ isFetchingFile: false });
      this.toggleApproveModal();
    }
  };

  toggleApproveModal = (id) => {
    let fileId;
    if (typeof id == 'number') fileId = id;
    this.setState(
      (prevState) => ({
        fileId,
        isFileModalVisible: !prevState.isFileModalVisible,
      }),
      this.fetchFile
    );
  };

  toggleDeleteModal = (file) => {
    let deleteFile;
    if (typeof file == 'object' && file.id) deleteFile = file;
    this.setState((prevState) => ({
      deleteFile,
      isDeleteModalVisible: !prevState.isDeleteModalVisible,
    }));
  };

  confirmDelete = async () => {
    const { deleteFile } = this.state;
    if (!deleteFile.id) return;
    try {
      const status = await FileApi.deleteFile(deleteFile.id);
      Toaster.getSuccessToaster('File deleted successfully');
      this.fetchAllFiles();
    } catch (e) {
      console.log(e);
      Toaster.getErrorToaster('Error deleting file');
    }

    this.toggleDeleteModal();
  };

  filterFileList = (files) => {
    const {
      filter: { startDate, endDate },
    } = this.state;

    let filteredFiles = files;

    if (startDate && endDate) {
      filteredFiles = files.filter(({ created_at }) => {
        const createdDate = moment(created_at);
        const isBetween = createdDate.isBetween(
          moment(startDate).subtract(1, 'day'),
          moment(endDate).add(1, 'day')
        );

        return isBetween;
      });
    }

    return filteredFiles;
  };

  onDateChange = (filter) => {
    this.setState({ filter });
  };

  render() {
    const {
      files,
      isFileModalVisible,
      file,
      isFetchingFile,
      isDeleteModalVisible,
      deleteFile,
    } = this.state;
    const query = fetchQueryParams(this.props.location.search);
    const filteredFiles = this.filterFileList(files);

    const fileList = filteredFiles.map((file) => {
      if (query && file.user.id !== query) return null;
      return (
        <FileRow
          toggleApproveModal={this.toggleApproveModal}
          key={file.id}
          file={file}
          toggleDeleteModal={this.toggleDeleteModal}
        />
      );
    });
    const hasFiles = fileList.find((file) => file);

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
          <DeleteModal
            isVisible={isDeleteModalVisible}
            toggleModal={this.toggleDeleteModal}
            confirmDelete={this.confirmDelete}
            file={deleteFile}
          />
          <CardBody>
            <div className="card__title">
              <Col md={12} lg={6}>
                <h5 className="bold-text">Files</h5>
                <h5 className="subhead">Files List</h5>
              </Col>
              <Col md={12} lg={6}>
                <Filter onDateChange={this.onDateChange} />
              </Col>
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
                {hasFiles ? (
                  fileList
                ) : (
                  <tr>
                    <td colSpan="8"> No files to display</td>
                  </tr>
                )}
              </tbody>
            </Table>
          </CardBody>
        </Card>
      </Col>
    );
  }
}

export default FileList;
