import moment from 'moment';
import React, { useEffect, useState } from 'react';
import ReactDatePicker from 'react-datepicker';

export default function Filter({ onDateChange }) {
  const [toggle, setToggle] = useState(false);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  const propagateChange = ({ startDate, endDate }) => {
    if (typeof onDateChange == 'function') onDateChange({ startDate, endDate });
  };

  useEffect(() => {
    propagateChange({ startDate, endDate });
  }, [startDate, endDate]);

  useEffect(() => {
    if (toggle) {
      propagateChange({ startDate, endDate });
    } else {
      propagateChange({ startDate: null, endDate: null });
    }
  }, [toggle]);

  return (
    <form className="form">
      <div className="form__form-group">
        <span className="form__form-group-label">
          <button
            onClick={(e) => {
              e.preventDefault();
              setToggle(!toggle);
            }}
            className="btn btn-secondary"
          >
            <span className={`sidebar__link-icon lnr lnr-funnel text-dark`} />
            Filter: {toggle ? 'On' : 'Off'}
          </button>
        </span>
        {toggle && (
          <div className="form__form-group-field date-picker">
            <div className="m-1">
              <div>Start Date</div>
              <ReactDatePicker
                className="form__form-group-datepicker"
                selected={startDate}
                title="Start Date"
                showYearDropdown
                scrollableYearDropdown
                allowSameDay={false}
                onChange={(date) => setStartDate(date)}
                maxDate={endDate ? endDate : moment()}
                dateFormat="LL"
                isClearable
              />
            </div>{' '}
            <div className="m-1">
              <div>End Date</div>
              <ReactDatePicker
                className="form__form-group-datepicker"
                selected={endDate}
                showYearDropdown
                title="End Date"
                scrollableYearDropdown
                allowSameDay={false}
                onChange={(date) => setEndDate(date)}
                minDate={startDate}
                maxDate={moment()}
                dateFormat="LL"
                isClearable
              />
            </div>
          </div>
        )}
      </div>
    </form>
  );
}
