import React from 'react';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import { Input } from 'reactstrap';
import Panel from '../../Panel/Panel';
import 'react-datepicker/dist/react-datepicker.css';
import ListInfo from './ListInfo';
import PersonalInfoApi from '../../../apis/User/PersonalInfo';
import { getUserObject } from '../../../constants/LocalStorageManager';
import Toaster from '../../Toaster/ToastManager';

const PersonalInfoForm = ({
  dob,
  father_name,
  mother_name,
  marital_status,
  handleChange,
  handleDateChange,
  handleSubmit,
  cancel
}) => {
  return (
    <form className='form'>
      <div className='form__form-group'>
        <span className='form__form-group-label'>Date of Birth</span>
        <div className='form__form-group-field date-picker'>
          <DatePicker
            className='form__form-group-datepicker'
            selected={dob.value}
            maxDate={moment().subtract(5, 'years')}
            showYearDropdown
            scrollableYearDropdown
            allowSameDay={false}
            onChange={handleDateChange}
            dateFormat='LL'
          />
        </div>
      </div>
      <div className='form__form-group'>
        <span className='form__form-group-label'>Father's Name</span>
        <div className='form__form-group-field'>
          <Input
            name='father_name'
            value={father_name.value}
            onChange={handleChange}
          />
        </div>
      </div>
      <div className='form__form-group'>
        <span className='form__form-group-label'>Mother's Name</span>
        <div className='form__form-group-field'>
          <Input
            name='mother_name'
            value={mother_name.value}
            onChange={handleChange}
          />
        </div>
      </div>
      <div className='form__form-group'>
        <span className='form__form-group-label'>Marital Status</span>
        <div className='form__form-group-field'>
          <select
            className='form-control'
            name='marital_status'
            onChange={handleChange}
            value={marital_status.value}
          >
            <option className='form-control'>Single</option>
            <option className='form-control'>Married</option>
            <option className='form-control'>Divorced</option>
          </select>
        </div>
      </div>
      <div className='w-100 d-flex justify-content-center'>
        <button className='btn btn-primary' onClick={handleSubmit}>
          Save
        </button>
        <button className='btn btn-secondary' onClick={cancel}>
          Cancel
        </button>
      </div>
    </form>
  );
};

class PersonalInfo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      formValues: {
        dob: {},
        father_name: {},
        mother_name: {},
        marital_status: {
          value: 'Single'
        }
      },
      isEditing: false
    };
  }

  componentDidMount() {
    this.fetchPersonalInfo();
  }

  fetchPersonalInfo = () => {
    const { id } = getUserObject();
    PersonalInfoApi.getAll(id)
      .then(({ data }) => {
        if (!data) {
          this.setState({ isNotUpdated: true });
          return;
        }
        const formKeys = [
          'dob',
          'father_name',
          'mother_name',
          'marital_status'
        ];
        const { dob } = data;
        const formValues = {};
        formKeys.forEach(key => (formValues[key] = { value: data[key] }));
        formValues.dob.value = dob ? moment(dob) : null;
        this.setState({ formValues, isEditing: false, isNotUpdated: false });
      })
      .catch(() => {
        Toaster.getErrorToaster('Failed to fetch details');
      });
  };

  handleDateChange = date => {
    const formValues = { ...this.state.formValues };
    formValues.dob = { value: date };

    this.setState({ formValues });
  };

  handleChange = e => {
    const { name, value } = e.target;
    const formValues = { ...this.state.formValues };
    formValues[name] = { value };
    this.setState({ formValues });
  };

  handleSubmit = e => {
    e.preventDefault();
    const { formValues } = this.state;
    const { id } = getUserObject();
    const formData = {};
    Object.keys(formValues).forEach(
      key => (formData[key] = formValues[key].value)
    );
    PersonalInfoApi.addNew(formData, id)
      .then(() => {
        Toaster.getSuccessToaster('Successfully updated details');
        this.fetchPersonalInfo();
        this.setState({ isEditing: false, isNotUpdated: false });
      })
      .catch(() => {
        Toaster.getErrorToaster('Failed to update details');
      });
  };

  cancel = e => {
    this.setState({ isEditing: false });
    this.fetchPersonalInfo();
  };

  toggleEdit = () => {
    this.setState(prevState => ({
      isEditing: !prevState.isEditing
    }));
  };

  render() {
    const { formValues, isEditing, isNotUpdated } = this.state;
    const { dob, father_name, mother_name, marital_status } = formValues;

    return (
      <Panel
        title='Personal Information'
        md={12}
        lg={6}
        editBtn
        onEdit={this.toggleEdit}
      >
        {!isEditing ? (
          <ListInfo
            dob={dob}
            father_name={father_name}
            mother_name={mother_name}
            marital_status={marital_status}
            isNotUpdated={isNotUpdated}
            toggleEdit={this.toggleEdit}
          />
        ) : (
          <PersonalInfoForm
            dob={dob}
            father_name={father_name}
            mother_name={mother_name}
            marital_status={marital_status}
            handleChange={this.handleChange}
            handleDateChange={this.handleDateChange}
            handleSubmit={this.handleSubmit}
            cancel={this.cancel}
          />
        )}
      </Panel>
    );
  }
}

export default PersonalInfo;
