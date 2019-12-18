import React, { Component } from 'react';
import { Input, Label } from 'reactstrap';

import Panel from '../../Panel/Panel';
import ContactApi from '../../../apis/User/Contact';
import { getUserObject } from '../../../constants/LocalStorageManager';
import ListInfo from './ListInfo';
import Toaster from '../../Toaster/ToastManager';

const ContactDetailsForm = ({
  province,
  district,
  municipality,
  tole,
  ward,
  handleChange,
  handleSubmit,
  onCancel
}) => {
  return (
    <form className='form'>
      <div className='form__form-group'>
        <span className='form__form-group-label'>Province</span>
        <div className='form__form-group-field'>
          <Input
            name='province'
            value={province.value}
            onChange={handleChange}
          />
        </div>
      </div>
      <div className='form__form-group'>
        <span className='form__form-group-label'>District</span>
        <div className='form__form-group-field'>
          <Input
            name='district'
            value={district.value}
            onChange={handleChange}
          />
        </div>
      </div>
      <div className='form__form-group'>
        <label className='form__form-group-label'>Municipality/VDC</label>
        <div className='form__form-group-field'>
          <Input
            name='municipality'
            value={municipality.value}
            onChange={handleChange}
          />
        </div>
      </div>
      <div className='form__form-group'>
        <Label htmlFor='password' className='form__form-group-label'>
          Ward
        </Label>
        <div className='form__form-group-field'>
          <Input name='ward' value={ward.value} onChange={handleChange} />
        </div>
      </div>
      <div className='form__form-group'>
        <span className='form__form-group-label'>Tole</span>
        <div className='form__form-group-field'>
          <Input name='tole' value={tole.value} onChange={handleChange} />
        </div>
      </div>
      <div className='w-100 d-flex justify-content-center'>
        <button className='btn btn-primary' onClick={handleSubmit}>
          Save
        </button>
        <button className='btn btn-secondary' onClick={onCancel}>
          Cancel
        </button>
      </div>
    </form>
  );
};

class ContactInfo extends Component {
  constructor() {
    super();
    this.state = {
      formValues: {
        province: {},
        district: {},
        municipality: {},
        ward: {},
        tole: {}
      },
      isEditable: false,
      isNotUpdated: false
    };
  }

  componentDidMount() {
    this.fetchContactDetails();
  }

  fetchContactDetails() {
    const { userId } = this.props;

    ContactApi.getAll(userId)
      .then(({ data }) => {
        if (!data) {
          this.setState({ isNotUpdated: true });
          return;
        }
        const formKeys = [
          'province',
          'district',
          'municipality',
          'tole',
          'ward'
        ];
        const formValues = {};
        formKeys.forEach(key => (formValues[key] = { value: data[key] }));
        this.setState({ formValues, isEditable: false, isNotUpdated: false });
      })
      .catch(() => {
        Toaster.getErrorToaster('Failed to fetch details');
      });
  }

  handleChange = e => {
    const { name, value } = e.target;
    const formValues = { ...this.state.formValues };

    formValues[name] = { value };
    this.setState({ formValues });
  };

  handleSubmit = e => {
    e.preventDefault();
    const { formValues } = this.state;
    const { userId } = this.props;

    const formData = {};
    Object.keys(formValues).forEach(
      key => (formData[key] = formValues[key].value)
    );
    ContactApi.addNew(formData, userId)
      .then(() => {
        this.fetchContactDetails();
        Toaster.getSuccessToaster('Successfully updated details');
      })
      .catch(() => {
        Toaster.getErrorToaster('Failed to update details');
      });
  };

  onCancel = () => {
    this.setState({ isEditable: false });
    this.fetchContactDetails();
  };

  toggleEdit = () => {
    this.setState(prevState => ({
      isEditable: !prevState.isEditable
    }));
  };

  render() {
    const { formValues, isEditable, isNotUpdated } = this.state;
    const { province, district, municipality, tole, ward } = formValues;

    return (
      <Panel
        title='Contact Information'
        md={12}
        lg={6}
        editBtn
        onEdit={this.toggleEdit}
      >
        {!isEditable ? (
          <ListInfo
            province={province}
            district={district}
            municipality={municipality}
            tole={tole}
            ward={ward}
            isNotUpdated={isNotUpdated}
            toggleEdit={this.toggleEdit}
          />
        ) : (
          <ContactDetailsForm
            province={province}
            district={district}
            municipality={municipality}
            tole={tole}
            ward={ward}
            handleChange={this.handleChange}
            handleSubmit={this.handleSubmit}
            onCancel={this.onCancel}
          />
        )}
      </Panel>
    );
  }
}

export default ContactInfo;
