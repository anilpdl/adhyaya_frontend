import React, { Component } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

class FileThumbnail extends Component {
  constructor() {
    super();
    this.state = {

    }
  }

  onDocumentLoadSuccess = () => {

  }

  onLoadError = () => {

  }

  render() {
    const { file } = this.props;
    const { name, url } = file;
    if (name === 'pdf') {
      return (
        <Document
          className="pdf-container"
          file={url}
          onLoadSuccess={this.onDocumentLoadSuccess}
          onLoadError={this.onLoadError}
        >
          <Page pageNumber={1} height={100} />
        </Document>
      )
    }

    return (
      <div>
        <img src={url} alt={"File"} height={100} width={100} />
      </div>
    )
  }
}

export default FileThumbnail;
