import React from 'react';
import { Modal, ButtonToolbar, Button } from 'reactstrap';
import FileThumbnail from './FileThumbnail';

const DeleteModal = ({
  confirmDelete, toggleModal, isVisible, file = {}
}) => {
  return (
    <Modal
      isOpen={isVisible}
      toggle={toggleModal}
      className="modal-dialog--danger"
    >
      <div className="modal__header">
        <button className="lnr lnr-cross modal__close-btn" onClick={toggleModal} />
        <span className="lnr lnr-cross-circle modal__title-icon" />
        <h4 className="bold-text  modal__title">Delete File</h4>
      </div>
      <div className="modal__body">
        Are you sure you want to delete file "{file.name}"?
        <div className="d-flex justify-content-center">
          <FileThumbnail file={file} />
        </div>
      </div>
      <ButtonToolbar className="modal__footer">
        <Button onClick={toggleModal}>Cancel</Button>{' '}
        <Button className="btn-danger text-light" outline onClick={confirmDelete}>Ok</Button>
      </ButtonToolbar>
    </Modal>
  );
}

export default DeleteModal;
