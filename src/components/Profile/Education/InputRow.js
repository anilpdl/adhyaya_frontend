import React, { Component } from 'react';
import CheckIcon from 'mdi-react/CheckIcon';
import TimesIcon from 'mdi-react/MultiplyIcon';

class InputRow extends Component {
  constructor() {
    super();
  }

  render() {
    const {
      handleChange, confirmEdit, clearEdit, isVisible, data, errors
    } = this.props;
    const { institution, level, board, passed_year } = data;

    if (!isVisible)
      return null;
    return (
      <tr>
        <td></td>
        <td>
          <input
            value={institution}
            className="form-control"
            name="institution"
            onChange={handleChange}
          />
          {errors.institution}
        </td>
        <td>
          <select
            name="level"
            className="form-control"
            value={level}
            defaultValue={"SLC/SEE"}
            onChange={handleChange}>
            <option>SLC/SEE</option>
            <option>+2/PCL</option>
            <option>Bachelors</option>
            <option>Masters</option>
          </select>
        </td>
        <td>
          <input
            name="board"
            value={board}
            className="form-control"
            onChange={handleChange}
          />
          {errors.board}
        </td>
        <td>
          <input
            value={passed_year}
            name="passed_year"
            type="number"
            className="form-control"
            onChange={handleChange}
          />
          {errors.passed_year || ('(Leave empty if pending)')}
        </td>
        <td>
          <span className="btn-group">
            <button className="btn btn-sm p-2 px-3" onClick={confirmEdit}>
              <CheckIcon />
            </button>
            <button className="btn btn-danger btn-sm p-2 px-3" onClick={clearEdit}>
              <TimesIcon />
            </button>
          </span>
        </td>
      </tr >
    );
  }
}

export default InputRow;
