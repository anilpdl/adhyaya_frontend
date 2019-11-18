import React from 'react';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import { Input } from 'reactstrap';
import Panel from '../../Panel/Panel';
import 'react-datepicker/dist/react-datepicker.css';


class PersonalInfo extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      startDate: moment()
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(date) {
    this.setState({
      startDate: date
    });
  }

  render() {
    return (
      <Panel title="Personal Informations">
        <form className="form">
          <div className="form__form-group">
            <span className="form__form-group-label">Date of Birth</span>
            <div className="form__form-group-field">
              <DatePicker
                className="form__form-group-datepicker"
                selected={this.state.startDate}
                onChange={this.handleChange}
                dateFormat="LL"
              />
            </div>
          </div>
          <div className="form__form-group">
            <span className="form__form-group-label">Father's Name</span>
            <div className="form__form-group-field">
              <Input
                className="form__form-group-datepicker"
              />
            </div>
          </div>
          <div className="form__form-group">
            <span className="form__form-group-label">Mother's Name</span>
            <div className="form__form-group-field">
              <Input />
            </div>
          </div>
          <div className="form__form-group">
            <span className="form__form-group-label">Marital Status</span>
            <div className="form__form-group-field">
              <select className="form-control">
                <option className="form-control">Single</option>
                <option className="form-control">Married</option>
                <option className="form-control">Divorced</option>
              </select>
            </div>
          </div>
        </form>
      </Panel>
    );
  }
}

export default PersonalInfo;