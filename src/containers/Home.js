import React from 'react';


import "assets/appy/css/bootstrap.min.scss";
import "assets/appy/css/owl.carousel.min.css";
import "assets/appy/css/linearicons.css";
import "assets/appy/css/magnific-popup.css";
import "assets/appy/css/animate.css";
import "assets/appy/css/normalize.css";
import "assets/appy/style.scss";
import "assets/appy/css/responsive.css";
import logo from 'assets/img/logo.png';
import UserApi from '../apis/User';

class Home extends React.Component {
  constructor() {
    super();
    this.state = {
      email: ''
    }
  };

  handleChange = (e) => {
    const { value } = e.target;
    this.setState({ email: value })
  }

  handleSubmit = (e) => {
    const { email } = this.state;
    e.preventDefault();
    UserApi.subscribe(email).then().catch();
  }

  render() {
    const { email } = this.state;

    return (
      <div className="home">
        <header class="home-area overlay" id="home_page">
          <div class="container">
            <div class="row">
              <div class="col-xs-12 hidden-sm col-md-5">
                <figure class="mobile-image wow fadeInUp" data-wow-delay="0.2s">
                  <img src={require("assets/appy/images/header-mobile.png")} alt="" />
                </figure>
              </div>
              <div class="col-xs-12 col-md-7">
                <div class="space-80 hidden-xs"></div>
                <h1 class="wow fadeInUp" data-wow-delay="0.4s">Start your abroad study today.</h1>
                <div class="space-20"></div>
                <div class="desc wow fadeInUp" data-wow-delay="0.6s">
                  <p>
                    We provide comprehensive guidance to our students from selecting a university to searching for  suitable accomodation facilities.
                  </p>
                </div>
                <div class="space-20"></div>
                <a href="#feedback-form" class="bttn-white wow fadeInUp" data-wow-delay="0.8s">
                  Enquire Now
                </a>
              </div>
            </div>
          </div>
        </header>
        <section class="section-padding" id="about_page">
          <div class="container">
            <div class="row">
              <div class="col-xs-12 col-md-10 col-md-offset-1">
                <div class="page-title text-center">
                  <img src={require("assets/img/logo.png")} style={{ borderRadius: 50, width: 50 }} alt="About Logo" />
                  <div class="space-20"></div>
                  <h5 class="title">About Us</h5>
                  <div class="space-30"></div>
                  <p class="blue-color">
                    Adhyaya is a team of experienced individuals providing excellent servies to the students wishing to pursue international degree. We guide you through the pathway to your desired destination.
                  </p>
                  <div class="space-20"></div>
                  <p>
                    As we value your time, we believe in a service that is both responsive and efficient.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/*  About-Area-End */}
        <section class="feature-area section-padding-top" id="features_page">
          <div class="container">
            <div class="row">
              <div class="col-xs-12 col-sm-8 col-sm-offset-2">
                <div class="page-title text-center">
                  <h5 class="title">Services</h5>
                  <div class="space-10"></div>
                  <h3>Quality Services As Always</h3>
                  <div class="space-60"></div>
                </div>
              </div>
            </div>
            <div class="row">
              <div class="col-xs-12 col-sm-6 col-md-4">
                <div class="service-box wow fadeInUp" data-wow-delay="0.2s">
                  <div class="box-icon">
                    <i class="lnr lnr-paperclip"></i>
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
                <div class="space-60"></div>
              </div>
              <div class="hidden-xs hidden-sm col-md-4">
                <figure class="mobile-image">
                  <img src={require("assets/appy/images/feature-image.png")} alt="Feature Photo" />
                </figure>
              </div>
              <div class="col-xs-12 col-sm-6 col-md-4">
                <div class="service-box wow fadeInUp" data-wow-delay="0.2s">
                  <div class="box-icon">
                    <i class="lnr lnr-clock"></i>
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
                <div class="space-60"></div>
                <div class="service-box wow fadeInUp" data-wow-delay="0.4s">
                  <div class="box-icon">
                    <i class="lnr lnr-laptop-phone"></i>
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
                <div class="space-60"></div>
              </div>
            </div>
          </div>
        </section>
        <section class="section-padding">
          <div class="container">
            <div class="row">
              <div class="col-xs-12 col-sm-6">
                <div class="page-title">
                  <h5 class="title wow fadeInUp" data-wow-delay="0.2s">Our Services</h5>
                  <div class="space-10"></div>
                  <h3 class="dark-color wow fadeInUp" data-wow-delay="0.4s">
                    Wide Range of Options
                  </h3>
                </div>
                <div class="space-20"></div>
                <div class="desc wow fadeInUp" data-wow-delay="0.6s">
                  <p>
                    We represent range of destinations and universities from Australia, USA, New Zealand, Canada, India to other European countries to fulfill your affordability and requirements.
                  </p>
                </div>
                <div class="space-50"></div>
              </div>
              <div class="col-xs-12 col-sm-6 col-md-5 col-md-offset-1">
                <div class="space-60 hidden visible-xs"></div>
                <div class="service-box wow fadeInUp" data-wow-delay="0.2s">
                  <div class="box-icon">
                    <i class="lnr lnr-clock"></i>
                  </div>
                  <h4>Easy Processing</h4>
                  <p>
                    We provide you hassle free services
                  </p>
                </div>
                <div class="space-50"></div>
                <div class="service-box wow fadeInUp" data-wow-delay="0.2s">
                  <div class="box-icon">
                    <i class="lnr lnr-laptop-phone"></i>
                  </div>
                  <h4>Responsive</h4>
                  <p>
                    We communicate and help our students in every aspects possible.
                  </p>
                </div>
                <div class="space-50"></div>
                <div class="service-box wow fadeInUp" data-wow-delay="0.2s">
                  <div class="box-icon">
                    <i class="lnr lnr-cog"></i>
                  </div>
                  <h4>Efficient</h4>
                  <p>
                    We perform the tasks efficiently
                  </p>
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
        <div class="subscribe-area section-padding" id="feedback-form">
          <div class="container">
            <div class="row">
              <div class="col-xs-12 col-sm-8 col-sm-offset-2">
                <div class="subscribe-form text-center">
                  <h3 class="blue-color">Want to know more?</h3>
                  <p>Send us your email and we will reach you.</p>
                  <div class="space-20"></div>
                  <form id="mc-form" onSubmit={this.handleSubmit}>
                    <input onChange={this.handleChange} type="email" name="email" value={email} class="control" placeholder="Enter your email" required="required" id="mc-email" />
                    <button class="bttn-white active" type="submit"><span class="lnr lnr-location"></span> Send</button>
                    <label class="mt10" for="mc-email"></label>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/*  Subscribe-Form-Area */}
        {/*  Footer-Area */}
        <footer class="footer-area" id="contact_page">
          <div class="section-padding">
            <div class="container">
              <div class="row">
                <div class="col-xs-12">
                  <div class="page-title text-center">
                    <h5 class="title">Contact US</h5>
                    <h3 class="dark-color">Find Us By Bellow Details</h3>
                    <div class="space-60"></div>
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="col-xs-12 col-sm-4">
                  <div class="footer-box">
                    <div class="box-icon">
                      <span class="lnr lnr-map-marker"></span>
                    </div>
                    <p>
                      Nepal Office <br />
                      Adhyaya Educational Services <br />
                      Baburam Acharya Marg, Old Baneshwor<br />
                      Kathmandu,  Nepal <br />
                      Phone: 977-1-4489536, 977-1-4489537 <br />
                      Email: adhyaya.admissions@gmail.com
                            </p>
                  </div>
                  <div class="space-30 hidden visible-xs"></div>
                </div>
                <div class="col-xs-12 col-sm-4">
                  <div class="footer-box">
                    <div class="box-icon">
                      <span class="lnr lnr-map-marker"></span>
                    </div>
                    <p>
                      Australia Office (Melbourne) <br />
                      Level 1, 334 King Street <br />
                      Melbourne Victoria, Australia<br />
                      Phone: +61390778300 <br />
                      Email: enquiry@anzglobal.com.au
                    </p>
                  </div>
                  <div class="space-30 hidden visible-xs"></div>
                </div>
                <div class="col-xs-12 col-sm-4">
                  <div class="footer-box">
                    <div class="box-icon">
                      <span class="lnr lnr-map-marker"></span>
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
    )
  }
}

export default Home;
