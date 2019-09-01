import React, { PureComponent } from 'react';
import { Link } from 'react-router-dom';
import { Row, Col } from 'reactstrap';
import AlertOctagonIcon from 'mdi-react/AlertOctagonIcon';
import AlertIcon from 'mdi-react/AlertIcon';
import BackIcon from 'mdi-react/KeyboardBackspaceIcon';

import FormWrapper from '../Wrapper/FormWrapper';
import ROUTES from '../../constants/Routes';

class InvalidToken extends PureComponent {
  constructor() {
    super();
    this.state = {
      showPassword: false,
    };
  }

  render() {
    return (
      <FormWrapper>
        <Row className="d-flex justify-content-center align-items-center">
          <Col sm={6} className="text-center">
            <AlertOctagonIcon size={200} color="red" />
          </Col>
          <Col sm={6}>
            <h2 className="text-center">Error!</h2>
            <h4 className="text-danger text-center">
              The link has expired or does not exist.
            </h4>
          </Col>
        </Row>
        <Row>
          <Col className="p-3 bg-secondary">
            <p className="text-white">
              <AlertIcon />
              Please ask admin to send an email with valid link.
            </p>
          </Col>
        </Row>
        <Row className="mt-3">
          <Link to={ROUTES.INDEX}>
            <BackIcon />
            Back to homepage
          </Link>
        </Row>
      </FormWrapper>
    );
  }
}

export default InvalidToken;
