import React, { Component, Fragment } from "react";
import "./first_page.css";
import Calendar from 'react-calendar';
import Chart from "chart.js";
// import { API_URL } from '../../../root.js'
import axios from "axios";
import { IconContext } from "react-icons";
import { MdViewQuilt } from "react-icons/md";
import { FaUsersCog, FaListAlt, FaUsers, FaMapMarkerAlt, FaGlasses } from "react-icons/fa";
var moment = require('moment');
class FirstPage extends Component {
  constructor(props) {
    super(props);
    this.state = { 
        map: false, home: true};
        this.about = React.createRef() 
  }

    
  componentDidMount() {
  }

  home(){
    
    this.setState({home: true, map: false})
  }

  about_(){
    this.setState({home: true, map: false})
  //  this.scrollToMyRef()
  }

  map(){
    this.setState({map: true, home: false})
  }


  render() {
    const FadeInSection = (props) => {
      const [isVisible, setVisible] = React.useState(true);
      const domRef = React.useRef();
      React.useEffect(() => {
        const observer = new IntersectionObserver(entries => {
          entries.forEach(entry => setVisible(entry.isIntersecting));
        });
        observer.observe(domRef.current);
        return () => observer.unobserve(domRef.current);
      }, []);
      return (
        <div
          className={`col-sm-3 sub-divs ${isVisible ? 'is-visible' : ''}`}
          ref={domRef}
        >
          {props.children}
        </div>
      );
    }
    return (
      <div className="parent">
      <div className="header">
        <div className="left-div">
          <img onClick={this.home.bind(this)} src={require('../images/logo.png')} className="logo" />
          <button onClick={this.about_.bind(this)}  className="nav-text">About</button>
          <button onClick={this.home.bind(this)}  className="nav-text">Price</button>
       <button onClick={this.home.bind(this)}  className="nav-text">Contact</button>
         <button onClick={this.map.bind(this)}  className="nav-text">Dropbox Map</button>
        </div>
        <div className="header-button">Sign Up</div>
      </div>
      <div className="middle-div">
      {this.state.map?
      <img src={require('../images/dropboxmap.png')} 
        className="map"
      />
      :       <Fragment>
        <div className="col-sm-5">
          <p className="easy-text">Easy Laundry And Drycleaning Solutions</p>
          <div className="row">
            <img className="appleImage" src={require('../images/playstore.png')} />
            <img className="appleImage playstoreImage" src={require('../images/googlePlay.png')} />
          </div>
        </div>
        <div className="col-sm-7 row justify-content-end">
        <img className="back-white" src={require('../images/whiteBack.png')} />
        <img className="phone" src={require('../images/phoneAsset.png')} />
        </div></Fragment>
      }
      </div>
      {this.state.map ? null
      : 
      <Fragment>
      <div className="row justify-content-space-between white-div">
      <div className="w-100"></div>
        <div className="col-sm-12 align-items-center justify-content-center under-div-text">
        Why You Should Use us
        </div>
        <div className="col-sm-12 align-items-center justify-content-center offer-div-text">
        We offer
        </div>
        <FadeInSection>
        <img src={require('../images/check.png')} width={40} height={40} />
          <div>The Cheapest </div>
          Prices
</FadeInSection>
                <FadeInSection>
         <img src={require('../images/check.png')} width={40} height={40} />
          <div>Digital Punch</div>
          Cards
          </FadeInSection>
          <FadeInSection>
         <img src={require('../images/check.png')} width={40} height={40} />
          <div>Eco</div>
          Friendly
          </FadeInSection>
        <div className="w-100" style={{marginTop: 58}}></div>
        <FadeInSection>
         <img src={require('../images/check.png')} width={40} height={40} />
          <div>24 hour</div>
          Service
          </FadeInSection>
          <FadeInSection>
         <img src={require('../images/check.png')} width={40} height={40} />
          <div>Customer Service</div>
          <div style={{color: '#1bc47d'}}>C</div>
          </FadeInSection>
          <FadeInSection>
         <img src={require('../images/check.png')} width={40} height={40} />
         <p style={{fontSize: 18}}>We donate a portion
 of our profit to provide legal representation
 to people who cant afford legal representation.</p>
       </FadeInSection>
      </div>
      <div className="how-it-works-div">
       <img
       className="col-sm-6 how-it-works-image"
        src={require('../images/howWorks.png')} />
        <div className="col-sm-5">
        <div className="how-it-works">How it works</div>
        <div className="row" style={{marginTop: 41}}>
         <img
          className="check-image"
          src={require('../images/greencheck.png')}
          />
          <div className="col how-text-div">
            <div className="how-header">
              Download App
            </div>
            <div className="how-subheader">
            download our cool app and register your information
            </div>
          </div>
        </div>
        <div className="row" style={{marginTop: 41}}>
         <img
          className="check-image"
          src={require('../images/greencheck.png')}
          />
          <div className="col how-text-div">
            <div className="how-header">
              Schedule
            </div>
            <div className="how-subheader">
            schedule a time to  drop off and delivery of your laundry and drycleaning on the app.
            </div>
          </div>
        </div>
        <div className="row" style={{marginTop: 41}}>
         <img
          className="check-image"
          src={require('../images/greencheck.png')}
          />
          <div className="col how-text-div">
            <div className="how-header">
              Proceed
            </div>
            <div className="how-subheader">
            Proceed to your chosen dropbox, place clothes in the box and lock the box with the last 4 digit of your phone number
            clothes will be picked up, cleaned and returned to the box to be picked up by you at the delivery time.

            </div>
          </div>
        </div>
        </div>
      </div>
      <div className="row about-us-div">
      <div ref={this.about} className="col-sm-12 about-us-text">
        About Us
      </div>
      <div className="col-sm-12 about-us-content">
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Rutrum mauris ornare aliquam ullamcorper dui hendrerit volutpat in
. Faucibus ut lacus hendrerit ut urna, eu pellentesque nisl consequat. Mattis egestas integer mattis amet, etiam. Proin vel enim
 ultrices iaculis velit mattis magna. Amet quis nunc consequat pulvinar interdum dui at aliquet bibendum. Rhoncus, id posuere
 blandit urna ornare. Ultricies maecenas sit senectus non faucibus viverra venenatis at ac.
      </div>
      <div className="row-between">
        <div className="get-started-button">
           Get Started For Free
        </div>
        <img src={require('../images/teams.png')} 
        className="about-absolute-image" />
        </div>
      </div>
      <img src={require('../images/downCurve.png')} className="about-us-under-div" />
      <div className="row justify-content-space-between price-list-div">
      <div className="col-sm-12 price-list-text">
      PriceList
      </div>
      <div className="w-100" />
      <div className="row-between">
         <img src={require('../images/firstpricelist.png')}
          className="col-sm-4"
          height={518}
          />
                   <img src={require('../images/secondpricelist.png')}
          className="col-sm-4"
          height={518}
          />
                   <img src={require('../images/todo.png')}
          className="col-sm-4"
          style={{zIndex: -1}}
          height={518}
          />
      </div>
      </div>
      </Fragment>
      }
      
      <div className="footer-div">
       <div className="col-sm-3 normal-text">
       Operational Office: No 10, BlaBla Close Lagos<br/>
+234(0) 123 4567<br/> 
Mon - Fri (9am - 5pm)<br/> 
contact GW@Gmail.com
       </div>
       <div className="col-sm-3">
       <div className="col-sm-12 bold-text">
         Legal
       </div>
       <div className="normal-text">
       Terms of Use<br/>
       Privacy Policy
       </div>
      </div>
      <div className="col-sm-3">
       <div className="col-sm-12 bold-text">
         Useful Links
       </div>
       <div className="normal-text">
       Useful Links<br/>
       Faqs<br/>
       Blog<br/>
       About Us<br/>
       Contact Us
       </div>
      </div>
      <div className="col-sm-3 bold-text">
          Download Apps
      </div>
      </div>
      </div>
    );
  }
}

export default FirstPage;
