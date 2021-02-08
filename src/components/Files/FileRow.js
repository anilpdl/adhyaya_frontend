import React, { Component } from 'react';
import EyeIcon from 'mdi-react/EyeIcon';
import DownloadIcon from 'mdi-react/DownloadIcon';
import TrashIcon from 'mdi-react/TrashOutlineIcon';
import FileSaver from 'file-saver';

import FileThumbnail from './FileThumbnail';
import { formatDate } from '../../utils/dataFormatter';

class FileRow extends Component {
  downloadFile = (url, name) => {
    FileSaver.saveAs(url, name);
  };
  render() {
    const { file, toggleApproveModal, toggleDeleteModal, isUser } = this.props;
    const {
      id,
      user,
      url,
      name,
      format,
      created_at,
      is_approved,
      approved_by,
    } = file;
    const { first_name, last_name } = user;
    const fileType = format == 'pdf' ? 'PDF' : 'Image';

    if (isUser) {
      return (
        <tr className="file-list-row">
          <td></td>
          <td>
            <FileThumbnail file={file} />
          </td>
          <td>{name}</td>
          <td> {fileType} </td>
          <td>{formatDate(created_at)}</td>
          <td className="d-flex justify-content-around">
            <a href={url} target="_blank">
              <EyeIcon />
            </a>
            <div
              className="cursor-pointer"
              onClick={() => this.downloadFile(url, name)}
            >
              <DownloadIcon color="red" />
            </div>
            <div
              className="cursor-pointer"
              onClick={() => toggleDeleteModal(file)}
            >
              <TrashIcon color="red" />
            </div>
          </td>
          <td>
            {is_approved
              ? `Approved by ${approved_by ? approved_by.first_name : 'Admin'}`
              : 'Pending Approval'}
          </td>
        </tr>
      );
    }

    return (
      <tr className="file-list-row">
        <td></td>
        <td>
          <FileThumbnail file={file} />
        </td>
        <td>{name}</td>
        <td> {fileType} </td>
        <td>
          {first_name} {last_name}
        </td>
        <td>{formatDate(created_at)}</td>
        <td className="d-flex justify-content-around">
          <a href={url} target="_blank">
            <EyeIcon />
          </a>
          <div
            className="cursor-pointer"
            onClick={() => this.downloadFile(url, name)}
          >
            <DownloadIcon color="red" />
          </div>
          <div
            className="cursor-pointer"
            onClick={() => toggleDeleteModal(file)}
          >
            <TrashIcon color="red" />
          </div>
        </td>
        <td>
          {is_approved ? (
            `Approved by ${
              approved_by ? approved_by.first_name || 'Admin' : 'Admin'
            }`
          ) : (
            <button
              onClick={() => toggleApproveModal(id)}
              className="btn btn-primary"
            >
              Approve
            </button>
          )}
        </td>
      </tr>
    );
  }
}

export default FileRow;
