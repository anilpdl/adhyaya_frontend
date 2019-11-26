import React, { Component } from 'react';

class ListInfo extends Component {
  constructor() {
    super();
  }

  render() {
    return (
      <div className="container">
        <div className="row">
          <div>Date of birth: </div>
          <div>2345/6/8</div>
        </div>
        <div className="row">
          <div>Father's Name: </div>
          <div>Afgh Sfgh</div>
        </div>
        <div className="row">
          <div>Mother's Name: </div>
          <div>Lkjh Dhj</div>
        </div>
        <div className="row">
          <div>Marital Status</div>
          <div>Single</div>
        </div>
      </div>
    )
  }
}

export default ListInfo;
