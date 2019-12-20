import React, { Component } from 'react';
import TrashIcon from 'mdi-react/TrashOutlineIcon';
import EditIcon from 'mdi-react/PencilIcon';
import CheckIcon from 'mdi-react/CheckIcon';
import TimesIcon from 'mdi-react/MultiplyIcon';

class EducationTableRow extends Component {
  constructor() {
    super();

  }

  render() {
    const {
      handleChange,
      confirmEdit,
      clearEdit,
      handleEdit,
      education,
      inputField,
      count,
      toggleDeleteModal,
      errors
    } = this.props;

    console.log(errors)

    const disabled = inputField.id !== education.id;
    const displayData = disabled ? education : inputField;
    const { id, institution, level, board, passed_year } = displayData;
    const className = disabled ? "bg-transparent border-0 w-100" : "form-control";

    return (
      <tr>
        <td>{count}</td>
        <td>
          <input
            value={institution}
            className={className}
            name="institution"
            onChange={handleChange}
            disabled={disabled}
          />
          {!disabled && <div className='text-danger'>{errors.institution}</div>}
        </td>
        <td>
          {disabled ? level : (
            <select
              name="level"
              className="form-control"
              defaultValue={level}
              onChange={handleChange}>
              <option>SLC/SEE</option>
              <option>+2/PCL</option>
              <option>Bachelors</option>
              <option>Masters</option>
            </select>
          )}
        </td>
        <td>
          <input
            name="board"
            value={board}
            className={className}
            onChange={handleChange}
            disabled={disabled}
          />
          {!disabled && <div className='text-danger'>{errors.board}</div>}
        </td>
        <td>
          {
            passed_year || !disabled ? <input
              value={passed_year}
              name="passed_year"
              type="number"
              className={className}
              onChange={handleChange}
              disabled={disabled}
            /> : "Not completed"
          }
          {!disabled && ((errors.passed_year && (
            <div className='text-danger'>{errors.passed_year}</div>
          )) ||
            '(Leave empty if pending)')}
        </td>
        <td>
          {
            disabled ? <span className="btn-group">
              <button className="btn btn-sm p-2 px-3" onClick={() => handleEdit(education)}>
                <EditIcon size={30} />
              </button>
              <button className="btn btn-danger btn-sm p-2 px-3" onClick={() => toggleDeleteModal(id)}>
                <TrashIcon size={30} />
              </button>
            </span> : <span className="btn-group">
                <button className="btn btn-sm p-2 px-3" onClick={confirmEdit}>
                  <CheckIcon />
                </button>
                <button className="btn btn-danger btn-sm p-2 px-3" onClick={clearEdit}>
                  <TimesIcon />
                </button>
              </span>
          }
        </td>
      </tr>
    );
  }
}

export default EducationTableRow;
