import React, { Component } from 'react';
import AddIcon from 'mdi-react/AddIcon';

class ListInfo extends Component {
  constructor() {
    super();
  }

  render() {
    const {
      province,
      district,
      municipality,
      tole,
      ward,
      isNotUpdated,
      toggleEdit
    } = this.props;

    if (isNotUpdated) {
      return (
        <div className='d-flex flex-column justify-content-between align-items-center'>
          <h3>Oops!</h3>
          <p>You haven't updated your contact details.</p>
          <button className='btn btn-primary m-5' onClick={toggleEdit}>
            <AddIcon /> Update
          </button>
        </div>
      );
    }

    return (
      <div className='container'>
        <div className='form__form-group'>
          <span className='form__form-group-label'>Province </span>
          <div className='form__form-group-field'>
            <div>{province.value}</div>
          </div>
        </div>
        <div className='form__form-group'>
          <span className='form__form-group-label'>District </span>
          <div className='form__form-group-field'>
            <div>{district.value}</div>
          </div>
        </div>
        <div className='form__form-group'>
          <span className='form__form-group-label'>Municipality/VDC </span>
          <div className='form__form-group-field'>
            <div>{municipality.value}</div>
          </div>
        </div>
        <div className='form__form-group'>
          <span className='form__form-group-label'>Ward</span>
          <div className='form__form-group-field'>
            <div>{ward.value}</div>
          </div>
        </div>
        <div className='form__form-group'>
          <span className='form__form-group-label'>Tole</span>
          <div className='form__form-group-field'>
            <div>{tole.value}</div>
          </div>
        </div>
      </div>
    );
  }
}

export default ListInfo;
