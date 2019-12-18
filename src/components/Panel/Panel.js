import React, { PureComponent } from 'react';
import { Badge, Card, CardBody, Col, Collapse } from 'reactstrap';

import PencilIcon from 'mdi-react/PencilIcon';
import MinusIcon from 'mdi-react/MinusIcon';
import AutorenewIcon from 'mdi-react/AutorenewIcon';
import LoadingIcon from 'mdi-react/LoadingIcon';

export default class Panel extends PureComponent {
  static defaultProps = {
    divider: false,
    color: '',
    title: '',
    subhead: '',
    label: '',
    icon: '',
    md: 0,
    lg: 0,
    xl: 0,
    sm: 0,
    xs: 0
  };

  constructor() {
    super();

    this.state = {
      visible: true,
      collapse: true,
      loading: false
    };
  }

  onShow = () => {
    this.setState({ visible: true });
  };

  onDismiss = () => {
    this.setState({ visible: false });
  };

  onCollapse = () => {
    this.setState({ collapse: !this.state.collapse });
  };

  render() {
    const {
      md,
      lg,
      xl,
      sm,
      xs,
      color,
      divider,
      icon,
      title,
      label,
      subhead,
      editBtn,
      onEdit,
      children
    } = this.props;
    const { visible, loading, collapse } = this.state;

    if (visible) {
      return (
        <Col md={md} lg={lg} xl={xl} sm={sm} xs={xs}>
          <Card
            className={`row panel${color ? ` panel--${color}` : ''}
            ${divider ? ' panel--divider' : ''}${
              collapse ? '' : ' panel--collapse'
            }`}
          >
            <CardBody className='panel__body w-100'>
              {loading ? (
                <div className='panel__refresh'>
                  <LoadingIcon />
                </div>
              ) : (
                ''
              )}
              <div className='panel__btns'>
                <button className='panel__btn' onClick={this.onCollapse}>
                  <MinusIcon />
                </button>
                <button className={`panel__btn && ${!editBtn && 'd-none' }`} onClick={onEdit}>
                  <PencilIcon />
                </button>
              </div>
              <div className='panel__title'>
                <h5 className='bold-text'>
                  {icon ? (
                    <span className={`panel__icon lnr lnr-${icon}`} />
                  ) : (
                    ''
                  )}
                  {title}
                  <Badge className='panel__label'>{label}</Badge>
                </h5>
                <h5 className='subhead'>{subhead}</h5>
              </div>
              <Collapse isOpen={collapse}>
                <div className='panel__content'>{children}</div>
              </Collapse>
            </CardBody>
          </Card>
        </Col>
      );
    }

    return '';
  }
}
