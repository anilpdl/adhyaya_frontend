import React from 'react';

import ToastManager from 'components/Toaster/ToastManager';
import 'assets/appy/css/bootstrap.min.scss';
import 'assets/appy/css/owl.carousel.min.css';
import 'assets/appy/css/linearicons.css';
import 'assets/appy/css/magnific-popup.css';
import 'assets/appy/css/animate.css';
import 'assets/appy/css/normalize.css';
import 'assets/appy/style.scss';
import 'assets/appy/css/responsive.css';
import UserApi from '../apis/User';

class Home extends React.Component {
  constructor() {
    super();
    this.state = {
      email: ''
    };
  }

  handleChange = e => {
    const { value } = e.target;
    this.setState({ email: value });
  };

  handleSubmit = e => {
    const { email } = this.state;
    e.preventDefault();
    UserApi.subscribe(email)
      .then(({ data }) => {
        ToastManager.getSuccessToaster('Thank you for enquiring');
        this.setState({ email: '' });
      })
      .catch(() => {
        ToastManager.getErrorToaster(
          'Something went wrong. Please try again later'
        );
      });
  };

  render() {
    const { email } = this.state;

    return (
      <div className='home'>
        <header className='home-area overlay' id='home_page'>
          <div className='container'>
            <div className='row'>
              <div className='col-xs-12 hidden-sm col-md-5'>
                <figure
                  className='mobile-image wow fadeInUp'
                  data-wow-delay='0.2s'
                >
                  <img
                    style={{ opacity: 0 }}
                    src={require('assets/appy/images/header-mobile.png')}
                  />
                </figure>
              </div>
              <div className='col-xs-12 col-md-7'>
                <div className='space-80 hidden-xs'></div>
                <h1 className='wow fadeInUp' data-wow-delay='0.4s'>
                  Start your abroad study today.
                </h1>
                <div className='space-20'></div>
                <div className='desc wow fadeInUp' data-wow-delay='0.6s'>
                  <p>
                    We provide comprehensive guidance to our students from
                    selecting a university to searching for suitable
                    accomodation facilities.
                  </p>
                </div>
                <div className='space-20'></div>
                <a
                  href='#feedback-form'
                  className='bttn-white wow fadeInUp'
                  data-wow-delay='0.8s'
                >
                  Enquire Now
                </a>
              </div>
            </div>
          </div>
        </header>
        <section className='section-padding' id='about'>
          <div className='container'>
            <div className='row'>
              <div className='col-xs-12 col-md-10 col-md-offset-1'>
                <div className='page-title text-center'>
                  <img
                    src={require('assets/img/logo.png')}
                    style={{ borderRadius: 50, width: 50 }}
                    alt='About Logo'
                  />
                  <div className='space-20'></div>
                  <h5 className='title'>About Us</h5>
                  <div className='space-30'></div>
                  <p className='blue-color'>
                    Adhyaya is a team of experienced individuals providing
                    excellent servies to the students wishing to pursue
                    international degree. We guide you through the pathway to
                    your desired destination.
                  </p>
                  <div className='space-20'></div>
                  <p>
                    As we value your time, we believe in a service that is both
                    responsive and efficient.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/*  About-Area-End */}
        <section className='feature-area section-padding-top' id='services'>
          <div className='container'>
            <div className='row'>
              <div className='col-xs-12 col-sm-8 col-sm-offset-2'>
                <div className='page-title text-center'>
                  <h5 className='title'>Services</h5>
                  <div className='space-10'></div>
                  <h3>Quality Services As Always</h3>
                  <div className='space-60'></div>
                </div>
              </div>
            </div>
            <div className='row'>
              <div className='col-xs-12 col-sm-6 col-md-4'>
                <div className='service-box wow fadeInUp' data-wow-delay='0.2s'>
                  <div className='box-icon'>
                    <i className='lnr lnr-paperclip'></i>
                  </div>
                  <h4>Visa services</h4>
                  <ul>
                    <li>Student Visa</li>
                    <li>General Skilled Migration</li>
                    <li>TR/PR/State</li>
                    <li>ENS/RSMS</li>
                    <li>EOI/Skill Assessment</li>
                    <li>Partner Visa</li>
                    <li>Visitor Visa and other visas</li>
                    <li>Professional Development Workshops</li>
                    <li>Personal Development Workshops</li>
                    <li>Creative Classes</li>
                    <li>Vocational Classes</li>
                    <li>Career Counselling</li>
                    <li>Language Classes</li>
                  </ul>
                </div>
                <div className='space-60'></div>
              </div>
              <div className='hidden-xs hidden-sm col-md-4'>
                <figure className='mobile-image'>
                  <img
                    style={{ opacity: 0 }}
                    src={require('assets/appy/images/feature-image.png')}
                    alt='Feature Photo'
                  />
                </figure>
              </div>
              <div className='col-xs-12 col-sm-6 col-md-4'>
                <div className='service-box wow fadeInUp' data-wow-delay='0.2s'>
                  <div className='box-icon'>
                    <i className='lnr lnr-clock'></i>
                  </div>
                  <h4>Educational Services</h4>
                  <ul>
                    <li>Free Consultation</li>
                    <li>SSVF Admission</li>
                    <li>Change of course/university</li>
                    <li>Release Letters Issues</li>
                    <li>Professional Year Program</li>
                    <li>ELICOS/High School courses</li>
                  </ul>
                </div>
                <div className='space-60'></div>
                <div className='service-box wow fadeInUp' data-wow-delay='0.4s'>
                  <div className='box-icon'>
                    <i className='lnr lnr-laptop-phone'></i>
                  </div>
                  <h4>Other Services</h4>
                  <ul>
                    <li>Student Tax Return Service</li>
                    <li>Authorized Tax Agent</li>
                    <li>Health Insurance</li>
                    <li>Internship</li>
                    <li>Job Placement Assistance</li>
                  </ul>
                </div>
                <div className='space-60'></div>
              </div>
            </div>
          </div>
        </section>
        <section className='section-padding'>
          <div className='container'>
            <div className='row'>
              <div className='col-xs-12 col-sm-6'>
                <div className='page-title'>
                  <h5 className='title wow fadeInUp' data-wow-delay='0.2s'>
                    Our Services
                  </h5>
                  <div className='space-10'></div>
                  <h3 className='dark-color wow fadeInUp' data-wow-delay='0.4s'>
                    Wide Range of Options
                  </h3>
                </div>
                <div className='space-20'></div>
                <div className='desc wow fadeInUp' data-wow-delay='0.6s'>
                  <p>
                    We represent range of destinations and universities from
                    Australia, USA, New Zealand, Canada, India to other European
                    countries to fulfill your affordability and requirements.
                  </p>
                </div>
                <div className='space-50'></div>
              </div>
              <div className='col-xs-12 col-sm-6 col-md-5 col-md-offset-1'>
                <div className='space-60 hidden visible-xs'></div>
                <div className='service-box wow fadeInUp' data-wow-delay='0.2s'>
                  <div className='box-icon'>
                    <i className='lnr lnr-clock'></i>
                  </div>
                  <h4>Easy Processing</h4>
                  <p>We provide you hassle free services</p>
                </div>
                <div className='space-50'></div>
                <div className='service-box wow fadeInUp' data-wow-delay='0.2s'>
                  <div className='box-icon'>
                    <i className='lnr lnr-laptop-phone'></i>
                  </div>
                  <h4>Responsive</h4>
                  <p>
                    We communicate and help our students in every aspects
                    possible.
                  </p>
                </div>
                <div className='space-50'></div>
                <div className='service-box wow fadeInUp' data-wow-delay='0.2s'>
                  <div className='box-icon'>
                    <i className='lnr lnr-cog'></i>
                  </div>
                  <h4>Efficient</h4>
                  <p>We perform the tasks efficiently</p>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/*  How-To-Use-End */}
        {/* Price-Area */}
        {/* Price-Area-End */}
        {/* Questions-Area */}
        {/*  Subscribe-Form */}
        <div className='subscribe-area section-padding' id='feedback-form'>
          <div className='container'>
            <div className='row'>
              <div className='col-xs-12 col-sm-8 col-sm-offset-2'>
                <div className='subscribe-form text-center'>
                  <h3 className='blue-color'>Want to know more?</h3>
                  <p>Send us your email and we will reach you.</p>
                  <div className='space-20'></div>
                  <form id='mc-form' onSubmit={this.handleSubmit}>
                    <input
                      onChange={this.handleChange}
                      type='email'
                      name='email'
                      value={email}
                      className='control'
                      placeholder='Enter your email'
                      required='required'
                      id='mc-email'
                    />
                    <button className='bttn-white active' type='submit'>
                      <span className='lnr lnr-location'></span>{' '}
                      <span className='d-none d-md-inline-block'>Send</span>
                    </button>
                    <label className='mt10' htmlFor='mc-email'></label>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/*  Subscribe-Form-Area */}
        {/*  Footer-Area */}
        <footer className='footer-area' id='contact'>
          <div className='section-padding'>
            <div className='container'>
              <div className='row'>
                <div className='col-xs-12'>
                  <div className='page-title text-center'>
                    <h5 className='title'>Contact US</h5>
                    <h3 className='dark-color'>Find Us By Bellow Details</h3>
                    <div className='space-60'></div>
                  </div>
                </div>
              </div>
              <div className='row'>
                <div className='col-xs-12 col-sm-4'>
                  <div className='footer-box'>
                    <div className='box-icon'>
                      <span className='lnr lnr-map-marker'></span>
                    </div>
                    <p>
                      Nepal Office <br />
                      Adhyaya Educational Services <br />
                      Baburam Acharya Marg, Old Baneshwor
                      <br />
                      Kathmandu, Nepal <br />
                      Phone: 977-1-4489536, 977-1-4489537 <br />
                      Email: adhyaya.admissions@gmail.com
                    </p>
                  </div>
                  <div className='space-30 hidden visible-xs'></div>
                </div>
                <div className='col-xs-12 col-sm-4'>
                  <div className='footer-box'>
                    <div className='box-icon'>
                      <span className='lnr lnr-map-marker'></span>
                    </div>
                    <p>
                      Australia Office (Melbourne) <br />
                      Level 1, 334 King Street <br />
                      Melbourne Victoria, Australia
                      <br />
                      Phone: +61390778300 <br />
                      Email: enquiry@anzglobal.com.au
                    </p>
                  </div>
                  <div className='space-30 hidden visible-xs'></div>
                </div>
                <div className='col-xs-12 col-sm-4'>
                  <div className='footer-box'>
                    <div className='box-icon'>
                      <span className='lnr lnr-map-marker'></span>
                    </div>
                    <p>
                      Australia Office (Sydney) <br />
                      17 Haldon St, Lakemba NSW 2195 <br />
                      Phone: +61390778300 <br />
                      Email: enquiry@anzglobal.com.au
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </footer>
      </div>
    );
  }
}

export default Home;
