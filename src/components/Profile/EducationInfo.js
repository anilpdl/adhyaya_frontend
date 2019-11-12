import React, { Component } from 'react';
import {
  Table, Input
} from 'reactstrap';
import AddIcon from 'mdi-react/AddIcon';

import Panel from '../Panel/Panel';
import EducationTableRow from './Education/EducationTableRow';
import InputRow from './Education/InputRow';
import EducationApi from '../../apis/User/Education';
import { getUserObject } from '../../constants/LocalStorageManager';
import Toaster from '../Toaster/ToastManager';
import DeleteModal from './Education/DeleteModal';

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
      educations: [],
      inputField: {},
      errors: {},
      isAddRowVisible: false,
      isDeleteModalVisible: false,
      deleteId: null
    }
  }

  componentDidMount() {
    this.fetchAll();
  }

  fetchAll() {
    const { id } = getUserObject();
    EducationApi.getAll(id).then(({ data }) => {
      this.setState({ educations: data });
    }).catch(() => {
      Toaster.getErrorToaster('Error fetching data');
    });
  }

  handleEdit = (education) => {
    this.setState(prevState => {
      const inputField = prevState.inputField.id ? {} : education;
      return ({
        inputField,
        isAddRowVisible: false
      });
    });
  }

  updateEducationField = () => {
    const { inputField } = this.state;
    const { id } = inputField;
    EducationApi.update(inputField, id).then(() => {
      Toaster.getSuccessToaster('Successfully updated education');
      this.clearEdit();
      this.fetchAll();
    }).catch(e => {
      Toaster.getErrorToaster('Failed to update education');
    })
  }

  addNewEducation = () => {
    const { inputField } = this.state;
    const { id } = getUserObject();
    EducationApi.addNew(inputField, id).then(({ data }) => {
      Toaster.getSuccessToaster('Successfully added education');
      this.toggleAddNew();
      this.fetchAll();
    });
  }

  confirmEdit = () => {
    const { inputField } = this.state;
    const isValid = this.validateFields(inputField);
    if (isValid) {
      this.updateEducationField();
    }
  }

  handleChange = (e) => {
    console.log(e.target)
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
    const { inputField } = this.state;
    const isValid = this.validateFields(inputField);

    if (isValid) {
      this.addNewEducation();
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
    const { level, institution, board, passed_year } = inputField;
    const data = { level, institution, board, passed_year };
    let isValid = true;
    const keys = Object.keys(data);
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

  toggleDeleteModal = (id) => {
    const idType = typeof id;
    const deleteId = (idType == 'string' || idType == 'number') ? id : undefined;
    this.setState((prevState) => ({
      deleteId,
      isDeleteModalVisible: !prevState.isDeleteModalVisible
    }));
  }

  confirmDelete = () => {
    const { deleteId } = this.state;
    if (deleteId) {
      EducationApi.delete(deleteId).then(() => {
        Toaster.getSuccessToaster('Education deleted successfully');
        this.fetchAll();
        this.toggleDeleteModal();
      }).catch(() => {
        Toaster.getErrorToaster('Error deleting field');
        this.toggleDeleteModal()
      })
    }
  }

  render() {
    const {
      educations, inputField, isAddRowVisible, errors, deleteId, isDeleteModalVisible
    } = this.state;

    return (
      <Panel title="Education" >
        <DeleteModal
          deleteId={deleteId}
          confirmDelete={this.confirmDelete}
          toggleModal={this.toggleDeleteModal}
          isVisible={isDeleteModalVisible}
        />
        <Input className=" float-right col-3 mb-3" />
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
                  toggleDeleteModal={this.toggleDeleteModal}
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
