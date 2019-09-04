import React from 'react';
import { Modal, ButtonToolbar, Button } from 'reactstrap';

const DeleteModal = ({
  deleteId, confirmDelete, toggleModal, isVisible, deleteModal
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
        <h4 className="bold-text  modal__title">Delete Invitation</h4>
      </div>
      <div className="modal__body">
        Are you sure you want to delete invitation?
      </div>
      <ButtonToolbar className="modal__footer">
        <Button onClick={toggleModal}>Cancel</Button>{' '}
        <Button outline onClick={() => confirmDelete(deleteId)}>Ok</Button>
      </ButtonToolbar>
    </Modal>
  );
}

export default DeleteModal;
