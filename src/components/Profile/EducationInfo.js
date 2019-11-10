import React, { Component } from 'react';
import {
  Table, Input
} from 'reactstrap';

import Panel from '../Panel/Panel';

const educations = [{
  id: 1,
  institution: "Kathmandu English Academy",
  level: "Bachelors",
  board: "Government of Nepal",
  passed_year: 2069,
}]

class EducationInfo extends Component {
  constructor() {
    super();
    this.state = {
      educations: educations,
      editField: {}
    }
  }

  editEducation = (education) => {
    this.setState(prevState => {
      const editField = prevState.editField.id ? {} : education;
      return ({
        editField
      })
    });
  }

  confirmEdit = () => {
    alert(this.state.editField);
    const updatedEducations = this.state.educations.push(this.state.editField);
    this.setState({})
    this.clearEdit();
  }

  handleChange = (e) => {
    console.log(e)
    const { value, name } = e.target;
    const { editField } = this.state;
    const updatedField = { ...editField };
    updatedField[name] = value;
    console.log(updatedField)
    this.setState({
      editField: updatedField
    });
  }

  clearEdit = () => {
    this.setState({ editField: {} });
  }

  addNew = () => {
    
  }

  render() {
    const { educations, editField } = this.state;
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
              const disabled = editField.id !== education.id;
              const displayData = disabled ? education : editField;
              const { institution, level, board, passed_year } = displayData;
              const className = disabled ? "bg-transparent border-0 w-100" : "form-control";

              return (
                <tr>
                  <td>{++index}</td>
                  <td>
                    <input
                      value={institution}
                      className={className}
                      name="institution"
                      onChange={this.handleChange}
                      disabled={disabled}
                    />
                  </td>
                  <td>
                    {disabled ? level : <select name="level" className="form-control" defaultValue={level} onChange={this.handleChange}>
                      <option>SLC/SEE</option>
                      <option>+2/PCL</option>
                      <option>Bachelors</option>
                      <option>Masters</option>
                    </select>}
                  </td>
                  <td>
                    <input
                      name="board"
                      value={board}
                      className={className}
                      onChange={this.handleChange}
                      disabled={disabled}
                    />
                  </td>
                  <td>
                    <input
                      value={passed_year}
                      name="passed_year"
                      type="number"
                      className={className}
                      onChange={this.handleChange}
                      disabled={disabled}
                    />
                  </td>
                  <td>
                    {
                      disabled ? <span className="btn-group">
                        <button className="btn btn-sm">Delete</button>
                        <button className="btn btn-sm" onClick={() => this.editEducation(education)}>Edit</button>
                      </span> : <span className="btn-group">
                          <button className="btn btn-sm" onClick={this.confirmEdit}>Confirm</button>
                          <button className="btn btn-sm" onClick={this.clearEdit}>Cancel</button>
                        </span>
                    }
                  </td>
                </tr>
              );
            })}
          </tbody>
        </Table>
        <div className="w-100 d-flex justify-content-center border-top pt-4">
          <button className="btn btn-primary" onPress={this.addNew}> + Add new</button>
        </div>
      </Panel>
    );
  }
}

export default EducationInfo;
