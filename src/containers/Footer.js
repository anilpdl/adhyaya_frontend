import React from 'react';

class Footer extends React.Component {
  render() {
    return (
      <div className="row bg-light p-3 .landing__footer " style={{ width: '100%' }}>
        <div className="">
          &copy; {new Date().getFullYear()} Adhyaya Educational Services
        </div>
      </div>
    );
  }
}

export default Footer;
