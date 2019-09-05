import React, { PureComponent } from 'react';
import Select from 'react-select';
import PropTypes from 'prop-types';

class MultiSelectField extends PureComponent {
  handleChange = (value) => {
    this.props.onChange(value);
  };

  render() {
    const {
      value, name, placeholder, options,
    } = this.props;

    return (
      <Select
        isMulti
        name={name}
        value={value}
        onChange={this.handleChange}
        options={options}
        clearable={false}
        // className="form__form-group-select"
        closeOnSelect={false}
        removeSelected={false}
        placeholder={placeholder}
      />
    );
  }
}

const renderMultiSelectField = props => (
  <div className="form__form-group-input-wrap">
    <MultiSelectField
      {...props.input}
      options={props.options}
      placeholder={props.placeholder}
    />
    {props.meta.touched && props.meta.error && <span className="form__form-group-error">{props.meta.error}</span>}
  </div>
);

export default renderMultiSelectField;
