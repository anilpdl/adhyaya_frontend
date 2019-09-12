import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import DownloadIcon from 'mdi-react/DownloadIcon';

import FileThumbnail from './FileThumbnail';
import { formatDate } from '../../utils/dataFormatter';

class FileRow extends Component {
  render() {
    const { file } = this.props;
    const { user, url, name, created_at } = file;
    const { first_name, last_name } = user;
    const fileType = name == 'pdf' ? 'PDF' : 'Image';

    return (
      <tr>
        <td></td>
        <td><FileThumbnail file={file} /></td>
        <td> {fileType} </td>
        <td>{first_name} {last_name}</td>
        <td>{formatDate(created_at)}</td>
        <td><a href={url} target='_blank' download><DownloadIcon /></a></td>
      </tr>
    );
  }
}

export default FileRow