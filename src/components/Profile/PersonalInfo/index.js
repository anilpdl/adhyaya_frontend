import React from 'react';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import { Input } from 'reactstrap';
import Panel from '../../Panel/Panel';
import 'react-datepicker/dist/react-datepicker.css';
import ListInfo from './ListInfo';


class PersonalInfo extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      formValues: {
        dob: {},
        father_name: {},
        mother_name: {},
        marital_status: {}
      }
    };
  }

  handleDateChange = (date) => {
    const formValues = { ...this.state.formValues };
    formValues.dob = { value: date };

    this.setState({ formValues });
  }

  handleChange = (e) => {
    const { name, value } = e.target;
    const formValues = { ...this.state.formValues };
    formValues[name] = { value };

    this.setState({ formValues });
  }

  handleSubmit = (e) => {
    e.preventDefault();
  }

  cancel = (e) => {
    e.preventDefault();
  }

  render() {
    const { formValues } = this.state;
    const {
      dob, father_name, mother_name, marital_status
    } = formValues;

    return (
      <Panel title="Personal Information" md={12} lg={6}>
        {/* <ListInfo /> */}
        <form className="form">
          <div className="form__form-group">
            <span className="form__form-group-label">Date of Birth</span>
            <div className="form__form-group-field date-picker">
              <DatePicker
                className="form__form-group-datepicker"
                selected={dob.value}
                maxDate={moment()}
                showYearDropdown
                scrollableYearDropdown
                allowSameDay={false}
                onChange={this.handleDateChange}
                dateFormat="LL"
              />
            </div>
          </div>
          <div className="form__form-group">
            <span className="form__form-group-label">Father's Name</span>
            <div className="form__form-group-field">
              <Input
                name="father_name"
                value={father_name.value}
                onChange={this.handleChange}
              />
            </div>
          </div>
          <div className="form__form-group">
            <span className="form__form-group-label">Mother's Name</span>
            <div className="form__form-group-field">
              <Input
                name="mother_name"
                value={mother_name.value}
                onChange={this.handleChange} />
            </div>
          </div>
          <div className="form__form-group">
            <span className="form__form-group-label">Marital Status</span>
            <div className="form__form-group-field">
              <select className="form-control" name="marital_status" onChange={this.handleChange}>
                <option className="form-control">Single</option>
                <option className="form-control">Married</option>
                <option className="form-control">Divorced</option>
              </select>
            </div>
          </div>
          <div className="w-100 d-flex justify-content-center">
            <button className="btn btn-primary" onClick={this.handleSubmit}>
              Save
            </button>
            <button className="btn btn-secondary" onClick={this.cancel}>
              Cancel
            </button>
          </div>
        </form>
      </Panel>
    );
  }
}

export default PersonalInfo;