import React, { Component } from 'react';
import { toast } from 'react-toastify';
import ExclamationIcon from 'mdi-react/WarningCircleOutlineIcon';
import CheckIcon from 'mdi-react/CheckBoldIcon';
import { Row, Col } from 'reactstrap'

class Toaster extends Component {

  static getSuccessToaster(message, toastId = "success") {
    toast.success(() => {
      if (!toast.isActive(toastId))
        return (
          <Row>
            <Col xs={2} className="d-flex justify-content-center align-items-center">
              <CheckIcon />
            </Col>
            <Col xs={10} className="text-left">
              <span className="pl-3">{`${message}`}</span>
            </Col>
          </Row>
        )
    }, { toastId });
  }

  static getErrorToaster(message, toastId = "error") {
    toast.error(() => {
      if (!toast.isActive(toastId))
        return (
          <Row>
            <Col xs={2} className="d-flex justify-content-center align-items-center">
              <ExclamationIcon />
            </Col>
            <Col xs={10} className="text-left">
              <span className="pl-3">{`${message}`}</span>
            </Col>
          </Row>
        )
    }, { toastId })
  }
}

export default Toaster;
