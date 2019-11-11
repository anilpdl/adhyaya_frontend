import React, { Component } from 'react';
import {
  Table, Input
} from 'reactstrap';
import AddIcon from 'mdi-react/AddIcon';

import Panel from '../Panel/Panel';
import EducationTableRow from './Education/EducationTableRow';
import InputRow from './Education/InputRow';

const educations = [{
  id: 1,
  institution: "Kathmandu English Academy",
  level: "Bachelors",
  board: "Government of Nepal",
  passed_year: 2069,
}];

const newData = {
  institution: '',
  level: 'SLC/SEE',
  passed_year: '',
  board: '',
}

class EducationInfo extends Component {
  constructor() {
    super();
    this.state = {
      educations: educations,
      inputField: {},
      errors: {},
      isAddRowVisible: false,
    }
  }

  handleEdit = (education) => {
    this.setState(prevState => {
      const inputField = prevState.inputField.id ? {} : education;
      return ({
        inputField,
        isAddRowVisible: false
      })
    });
  }

  confirmEdit = () => {
    const { inputField } = this.state;
    const isValid = this.validateFields(inputField);
    if (isValid) {
      alert('addNew')
      this.clearEdit();
    }
  }

  handleChange = (e) => {
    const { value, name } = e.target;
    const { inputField } = this.state;
    const updatedField = { ...inputField };
    updatedField[name] = value;
    this.setState({
      inputField: updatedField
    });
  }

  clearEdit = () => {
    this.setState({ inputField: {} });
  }

  toggleAddNew = () => {
    this.setState(({ isAddRowVisible }) => ({
      isAddRowVisible: !isAddRowVisible,
      inputField: newData
    }));
  }

  addNew = () => {
    const { educations } = this.state;
    const { inputField } = this.state;
    const isValid = this.validateFields(inputField);
    inputField.id = educations[educations.length - 1].id + 1;
    if (isValid) {
      this.setState({ educations: [...educations, inputField] })
      this.toggleAddNew()
    }
  }

  handleBlur = (e) => {
    const { value, name } = e.target;
    const { inputField } = this.state;
    const updatedField = { ...inputField };
    updatedField[name] = value.trim();
    this.setState({
      inputField: updatedField
    });
  }

  validateFields = (inputField) => {
    const errors = {};
    let isValid = true;
    const keys = Object.keys(inputField);
    keys.forEach(key => {
      if (key == "passed_year") {
        return
      }
      const value = inputField[key];
      const currentFieldIsValid = !!value;
      if (!currentFieldIsValid) errors[key] = "This field is required";
      isValid = isValid && currentFieldIsValid;
    });

    this.setState({ errors });

    return isValid;
  }

  render() {
    const {
      educations, inputField, isAddRowVisible, errors
    } = this.state;

    return (
      <Panel title="Education" >
        <Table responsive>
          <thead>
            <tr>
              <td></td>
              <td>
                Institution
              </td>
              <td>
                Level
                </td>
              <td>
                Board
                </td>
              <td>
                Passed Year
                </td>
              <td>
                Action
                </td>
            </tr>
          </thead>
          <tbody>
            {educations.map((education, index) => {
              return (
                <EducationTableRow
                  key={index}
                  count={++index}
                  handleChange={this.handleChange}
                  confirmEdit={this.confirmEdit}
                  clearEdit={this.clearEdit}
                  handleEdit={this.handleEdit}
                  education={education}
                  inputField={inputField}
                />
              );
            })}
            <InputRow
              isVisible={isAddRowVisible}
              clearEdit={this.toggleAddNew}
              handleChange={this.handleChange}
              confirmEdit={this.addNew}
              data={inputField}
              errors={errors}
            />
          </tbody>
        </Table>
        {
          !isAddRowVisible && (
            <div className="w-100 d-flex justify-content-center border-top pt-4">
              <button className="btn btn-primary" onClick={this.toggleAddNew}>
                <AddIcon /> Add new</button>
            </div>
          )
        }
      </Panel>
    );
  }
}

export default EducationInfo;
