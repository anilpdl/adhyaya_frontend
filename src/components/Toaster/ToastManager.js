import React, { Component } from 'react';
import { toast } from 'react-toastify';
import ExclamationIcon from 'mdi-react/WarningCircleOutlineIcon';
import CheckIcon from 'mdi-react/CheckIcon';

class Toaster extends Component {

  static getSuccessToaster(toastId, message) {
    toast.success(() => {
      if(! toast.isActive(toastId))
      return (
      <div>
        <CheckIcon />
        <span className="pl-3">{`${message}`}</span>
      </div>
    )}, { toastId });
  }

  static getErrorToaster(toastId, message) {
    toast.error(() => {
      if(! toast.isActive(toastId))
      return(
      <div>
        <ExclamationIcon />
        <span className="pl-3">{`${message}`}</span>
      </div>
    )}, { toastId })
  }
}

export default Toaster;
