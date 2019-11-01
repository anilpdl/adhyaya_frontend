import React from 'react';
import { Modal, ButtonToolbar, Button } from 'reactstrap';
import LoadingIcon from 'mdi-react/LoadingIcon';
import FileThumbnail from './FileThumbnail';


const ModalBody = ({ file, isLoading }) => {
  if (isLoading)
    return <div className="panel__refresh"><LoadingIcon /></div>
  return (
    <div>
      Are you sure you want to approve "{file.name}" file ?
     <div className="d-flex justify-content-center">
        <FileThumbnail file={file} />
      </div>
    </div>
  );
}

const FileModal = ({
  approveFile, toggleModal, isVisible, isFetchingFile, file
}) => {
  return (
    <Modal
      isOpen={isVisible}
      toggle={toggleModal}
      backdrop
      className="modal-dialog--danger"
    >
      <div className="modal__header">
        <button className="lnr lnr-cross modal__close-btn" onClick={toggleModal} />
        {!isFetchingFile && <h4 className="bold-text  modal__title">Approve File</h4>}
      </div>
      <div className="modal__body">
        <ModalBody file={file} isLoading={isFetchingFile} />
      </div>
      <ButtonToolbar className="modal__footer">
        <Button onClick={toggleModal}>Cancel</Button>{' '}
        {!isFetchingFile && <Button outline onClick={approveFile}>Ok</Button>}
      </ButtonToolbar>
    </Modal>
  );
}

export default FileModal;
