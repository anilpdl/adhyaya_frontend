import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Icon from 'mdi-react/ArrowForwardIcon';
import { Col, Card, CardBody, CardFooter } from 'reactstrap';

const DashboardWidget = ({ title, subtitle, count, path }) => {
  return (
    <Col md={12} xl={3} lg={6} xs={12}>
      <Card>
        <CardBody className="dashboard__card-widget">
          <div className="card__title">
            <h5 className="bold-text">{title}</h5>
            <h5 className="subhead">{subtitle}</h5>
          </div>
          <div className="dashboard__total dashboard__total--area">
            <h1 className="text-center">{count}</h1>
          </div>
        </CardBody>
        <CardFooter>
          <Link to={path} className="row d-flex px-4"> View All <Icon size="18" /> </Link>
        </CardFooter>
      </Card>
    </Col>
  )
}

export default DashboardWidget;
