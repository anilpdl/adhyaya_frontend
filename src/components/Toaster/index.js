import React, { Component } from 'react';
import { ToastContainer, Zoom } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

class Toaster extends Component {
  render() {
    const autoCloseTime = 3000;
    return (
      <ToastContainer
        position="top-right"
        transition={Zoom}
        autoClose={autoCloseTime}
        newestOnTop
        closeOnClick
        closeButton={false}
        pauseOnVisibilityChange={false}
        draggable
        pauseOnHover />
    )
  }
}

export default Toaster;
