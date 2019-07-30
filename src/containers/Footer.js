import React from 'react';

class Footer extends React.Component {
  render() {
    return(
      <div className="row bg-light p-3 " style={{position: 'absolute', bottom: 0, width: '100%'}}>
        &copy; {new Date().getFullYear()} Adhyaya Educational Services
      </div>
    );
  }
}

export default Footer;
