import React, { Component } from 'react';
import EyeIcon from 'mdi-react/EyeIcon';
import DownloadIcon from 'mdi-react/DownloadIcon';
import FileSaver from 'file-saver';

import FileThumbnail from './FileThumbnail';
import { formatDate } from '../../utils/dataFormatter';

class FileRow extends Component {

  downloadFile = (url, name) => {
    FileSaver.saveAs(url, name);
  }
  render() {
    const { file } = this.props;
    const { user, url, name, format, created_at } = file;
    const { first_name, last_name } = user;
    const fileType = format == 'pdf' ? 'PDF' : 'Image';

    return (
      <tr>
        <td></td>
        <td><FileThumbnail file={file} /></td>
        <td>{name}</td>
        <td> {fileType} </td>
        <td>{first_name} {last_name}</td>
        <td>{formatDate(created_at)}</td>
        <td className="d-flex justify-content-around">
          <a href={url} target='_blank' download={name}><EyeIcon /></a>
          <div className="" onClick={() => this.downloadFile(url, name)}><DownloadIcon color="red" /></div>
        </td>
      </tr>
    );
  }
}

export default FileRow;
