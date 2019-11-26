import React, { Component } from 'react';
import { Input, Label } from 'reactstrap';

import Panel from '../../Panel/Panel';

class ContactInfo extends Component {
  constructor() {
    super();
    this.state = {
      formValues: {
        province: {},
        district: {},
        vdc: {},
        ward: {},
        tole: {},
      }
    }
  }

  render() {
    return (
      <Panel title="Contact Information" md={12} lg={6}>
        <form className="form">
          <div className="form__form-group">
            <span className="form__form-group-label">Province</span>
            <div className="form__form-group-field">
              <Input
                className="form__form-group-datepicker"
              />
            </div>
          </div>
          <div className="form__form-group">
            <span className="form__form-group-label">District</span>
            <div className="form__form-group-field">
              <Input />
            </div>
          </div>
          <div className="form__form-group">
            <label className="form__form-group-label">Municipality/VDC</label>
            <div className="form__form-group-field">
              <Input />
            </div>
          </div>
          <div className="form__form-group">
            <Label htmlFor="password" className="form__form-group-label">Ward</Label>
            <div className="form__form-group-field">
              <Input />
            </div>
          </div>
          <div className="form__form-group">
            <span className="form__form-group-label">Tole</span>
            <div className="form__form-group-field">
              <Input />
            </div>
          </div>
          <div className="w-100 d-flex justify-content-center">
            <button className="btn btn-primary">
              Save
            </button>
            <button className="btn btn-secondary">
              Cancel
            </button>
          </div>
        </form>
      </Panel>
    )
  }
}

export default ContactInfo;
