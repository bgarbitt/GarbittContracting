import React, { Component } from 'react';
import logo from './gcl-logo.png';
import './Homepage.css';

class Navigation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      clicked: false
    };
    this.handleClick = this.handleClick.bind(this);
  }
  handleClick(e) {
    e.preventDefault();
    if (this.state.clicked === true) {
      this.setState({
        clicked: false
      });
    } else {
      this.setState({
        clicked: true
      });
    }
  }
  render () {
    return (
      <header className="navigation">
        <h1>
          Garbitt Contracting Ltd.
        </h1>
        <img src={logo} className="logo" alt="logo" />
        <nav className="navigation-normal">
          <a href="#about">About Us</a><p>|</p>
          <a href="#services">Services</a><p>|</p>
          <a href="#safety">Safety</a><p>|</p>
          <a href="#fleet">Fleet</a><p>|</p>
          <a href="#contact">Contact Us</a>
        </nav>
        <div className="navigation-dropdown">
          <button className="navigation-dropdown-button" onClick={this.handleClick}>Nav</button>
          {this.state.clicked ?
            <div className="navigation-dropdown-content">
              <a href="#about">About Us</a>
              <a href="#services">Services</a>
              <a href="#safety">Safety</a>
              <a href="#fleet">Fleet</a>
              <a href="#contact">Contact Us</a>
              <a href="#quote">Request a Quote</a>
            </div>
            : '' 
          }
        </div>
      </header>
    )
  }
}
class About extends Component {
  render () {
    return (
      <section className="about" id="about">
        <div className="about-parallax">
          <div className="parallax-opacity">
            <p className="parallax-pretty">ABOUT GARBITT CONTRACTING</p>
          </div>
        </div>
        <p className="about-statement">
          Garbitt Contracting is a 100% Aboriginal owned company. Hugh Garbitt, 
          owner/operator started Garbitt Contracting Ltd. in July of 1998 having
          previously worked mulching right of ways, removing hazard trees,
          supervising crews, repairing & installing chain link fencing and operating
          equipment. Through hands on ownership and personal accountability Hugh
          Garbitt now maintains full time employment for several Sturgeon Lake
          community members and has at your disposal various Mulchers, Bucket Trucks,
          chippers, 2 ton flatdeck, 1 ton flat deck, trailer (20 feet to 50 feet),
          Snow Cat, Skid Steer, Quads, Ski-doos and Side by Sides.<br/><br/>
          His team of qualified and ticketed crews also have Enform safety
          tickets and have various Oilfield experience. We are also ISN and
          Comply Works certified.
        </p>
      </section>
    );
  }
}
//#region Services
class Services extends Component {
  constructor (props) {
    super (props);
    this.state = {
      servicesList: [
        "service title 1", "Mulching", "Oilfiled Labour Crews", "Tree Trimming", "Tree Removal",
        "Tree Transplanting", "Chainlink Fencing", "Snow Plowing (Snowcat)",
        "Skid Steers", "Labour Crews", "Pipeline Clearing", "Fenceline Clearing",
        "General Excavating", "Commercial / Residential Land Clearing",
        "Disaster / Debris Clean-up", "Overgrowth Clean-Up", "Mulchsite Projects",
        "Powerline Clearing"
      ]
    }
  }
  render () {
    return (
      <section className="services">
        <div className="services-parallax">
          <div className="parallax-opacity">
            <p className="services-pretty">SERVICES</p>
          </div>
        </div>
        <p className="services-statement">At Garbitt Contracting, we offer services in: (click for more info)<br/></p>
        <ServicesList servicesList={this.state.servicesList}/>
        <br/>
      </section>
    );
  }
}
class ServicesList extends Component {
  render () {
    return (
      <section className="horizonatal-list-container">
        <ul className="services-list">
          {this.props.servicesList.map((service, index) => {
            return <ModalButton name={service} key={index}/>
          })}
        </ul>
      </section>
    );
  }
}
class ModalButton extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: false
    };
    this.handleClick = this.handleClick.bind(this);
  }
  handleClick (e) {
    if (this.state.showModal === false) {
      e.preventDefault();
      this.setState({showModal:true});
    } else {
      this.setState({showModal:false});
    }
  }
  render() {
    return (
      <li>
        <button 
          name="services-button"
          onClick={this.handleClick}>
          {this.props.name}
        </button>
        {this.state.showModal ? <Modal name={this.props.name} onSpanClick={this.handleClick}/> : null }
      </li>
    );
  }
}
/*
This is where a database will be needed. In order to have individual
modals pop up without manually creating an unknown amount, a database
will be needed.
Note: the iframe for the video needs a youtube url of the form:
      https://www.youtube.com/embed/v6H2HmKDbZA
*/
class Modal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      url: "http://127.0.0.1:5000/services/retrieve",
      title: this.props.name,
      description: "Description Loading...",
      videoUrls: ["about:blank"],
      resources: "Resources Loading...",
      imageUrls: [""]
    }
    this.handleOutsideClick = this.handleOutsideClick.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }
  componentDidMount() {
    document.addEventListener('click', this.handleOutsideClick, false);
    this.getServices(this.state.url, "service="+encodeURIComponent(this.state.title));
  }
  getServices(url, service) {
    return fetch(url, {
      body: service,
      cache: 'no-cache',
      headers: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      method: 'POST'
    }).then(response => {
      return response.json();
    }).then(data => {
      this.setState({
        //data = {"explanation":["s"],"image":["i","i"],"video":["v","v"]}
        description: data.explanation,
        videoUrls: data.video,
        imageUrls: data.image
      })
    }).catch(error => console.error(error));
  }
  
  handleOutsideClick(e) {
    if (this.node.contains(e.target)) {
      return;
    }
    document.removeEventListener('click', this.handleOutsideClick, false);
    this.props.onSpanClick();
  }
  handleClick(e) {
    document.removeEventListener('click', this.handleOutsideClick, false);
    this.props.onSpanClick();
  }
  render () {
    return (
      <div className="service-modal-backdrop" >
        <div className="service-modal-content" ref={node => {this.node = node;}}>
          <button 
            className="service-modal-close"
            type="button"
            onClick={this.handleClick}>
            &times;
          </button>
          <h2>{this.props.name}</h2>
          <p>{this.state.description[0]}</p>
          <h3>Video Example</h3>
          <iframe 
            width="420" 
            height="315" 
            src="https://www.youtube.com/embed/PoKFSIWZkyo" 
            title={this.props.name + "Video"} allowFullScreen>
            </iframe>
          <h3>Gallery</h3>
          <ModalImages urls={this.state.imageUrls} {...this.state}/>
          
        </div>
      </div>
    );
  }
}
/*
This is for the images that will be populating each modal.
They will work by linking to a image hosting site (most likely
imgur) by way of url's. I'm worried about links dying after
awhile, but that should be a minor problem and requires changing
the url's in the database. 
*/
class ModalImages extends Component {
  constructor(props) {
    super(props);
    this.state = {
      imageTitle: this.props.title + " image"
    };
  }
  render() {
    return(
      <section className="horizontal-list-container">
        <ul className="service-modal-images">
            {this.props.urls.map((url, index) => {
              return (
                <li className="service-modal-images-crop" key={index}>
                  <a href={url} target="_blank"><img src={url} alt={this.state.imageTitle + index}/></a>
                </li>
              );
            })}
        </ul>
      </section>
    );
  }
}
//#endregion Services
//#region Safety
class Safety extends Component {
  render() {
    return (
      <section className="safety" id="safety">
        <div className="safety-parallax">
          <div className="parallax-opacity">
            <p className="safety-pretty">SAFETY</p>
          </div>
        </div>
        <p className="safety-statement">
          Temporary safety message. Be sure to mention about comply works and
          the other stuff.
        </p>
      </section>
    );
  }
}
//#endregion Safety
//#region Fleet
class Fleet extends Component {
  constructor (props) {
    super (props);
    this.state = {
      url: "http://127.0.0.1:5000/",
      fleet: {}
    }
  }
  componentDidMount () {
    this.getFleet(this.state.url);
  }
  getFleet(url) {
    return fetch(url, {
      cache: 'no-cache',
      headers: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      method: 'GET'
    }).then(response => {
      return response.json();
    }).then(data => {
      this.setState({
        //{"machine 1":["url", "url",...], "machine 2":...}
        fleet: data
      })
    }).catch(error => console.error(error));
  }
  render () {
    return (
      <section className="fleet">
        <div className="fleet-parallax">
          <div className="parallax-opacity">
            <p className="fleet-pretty">FLEET</p>
          </div>
        </div>
        <FleetImages fleetList={this.state.fleet}/>
      </section>
    );
  }
}
class FleetImages extends Component {
  render () {
    return (
      <section className="horizonatal-list-container">
        <ul className="fleet-list">
          {Object.keys(this.props.fleetList).map((key, index) => 
            <FleetModalImageButton 
              name={key} 
              key={index} 
              urls={this.props.fleetList[key]}
              />
          )}
        </ul>
      </section>
    );
  }
}
class FleetModalImageButton extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: false
    };
    this.backgroundImg = {
      backgroundImage: "url(" + this.props.urls[0] + ")"
    };
    this.handleClick = this.handleClick.bind(this);
  }
  handleClick (e) {
    if (this.state.showModal === false) {
      e.preventDefault();
      this.setState({showModal:true});
    } else {
      this.setState({showModal:false});
    }
  }
  render() {
    return (
      <li>
        <p className="fleet-button-title">{this.props.name}</p>
        <button 
          name="fleet-button"
          onClick={this.handleClick}
          style={this.backgroundImg ? this.backgroundImg : ""}>
        </button>
        {this.state.showModal ? <FleetModal name={this.props.name} urls={this.props.urls} onSpanClick={this.handleClick}/> : null }
      </li>
    );
  }
}
class FleetModal extends Component {
  constructor(props) {
    super(props);
    this.handleOutsideClick = this.handleOutsideClick.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.clicked = this.clicked.bind(this);
  }
  componentDidMount() {
    document.addEventListener('click', this.handleOutsideClick, false);
  }
  
  handleOutsideClick(e) {
    if (this.node.contains(e.target)) {
      return;
    }
    document.removeEventListener('click', this.handleOutsideClick, false);
    this.props.onSpanClick();
  }
  handleClick(e) {
    document.removeEventListener('click', this.handleOutsideClick, false);
    this.props.onSpanClick();
  }
  clicked(e) {
    console.log("Click!");
    return
  }
  render () {
    return (
      <div className="fleet-modal-backdrop" >
        <div className="fleet-modal-content" ref={node => {this.node = node;}}>
          <div className="slider">
            <div className="slides">
              {this.props.urls.map((imgsrc, index) => {
                return (
                  <div className="slide" id={this.props.name + index} 
                  key={this.props.name + index}>
                    <a href={imgsrc} target="_blank">
                      <img src={imgsrc} alt={this.props.name + index}/></a></div>
                );
              })}
            </div>
            {this.props.urls.map((imgsrc, index) => 
              <a className="slide-buttons" href={"#" + this.props.name + index} onClick={this.clicked}>{index+1}</a>
            )}
          </div>
          <button 
            className="fleet-modal-close"
            onClick={this.handleClick}>
            &times;
          </button>
        </div>
      </div>
    );
  }
}
//#endregion Fleet
class Contact extends Component {
  constructor(props) {
    super(props);
    this.state = {
      url: "http://127.0.0.1:5000/contact",
      name: '',
      organization: '',
      email: '',
      phone: '',
      message: '',
      checked: false,
      warn: false,
      pressed: false,
      sent: false,
      confirmed: false,
      notified: false,
      cols: "50",
      rows: "5"
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.warningButton = this.warningButton.bind(this);
    this.okButton = this.okButton.bind(this);
    this.sendEmail = this.sendEmail.bind(this);
  }
  handleChange(e) {
    const name = e.target.name;
    this.setState({[name]: e.target.value});
  }
  handleSubmit(e) {
    e.preventDefault();
    if (this.state.phone === '' && this.state.email === '') {
      if (this.state.checked === false) {
        this.setState({warn: true});
        return;
      }
    }
    this.setState({ sent: true, pressed: true });
    this.sendEmail();
    window.setTimeout(() => {
      this.setState({
        sent: false, pressed: false
      });
    }, 5000);
  }
  sendEmail() {
    var data = 
      "name="+encodeURIComponent(this.state.name)+"&"+
      "organization="+encodeURIComponent(this.state.organization)+"&"+
      "email="+encodeURIComponent(this.state.email)+"&"+
      "phone="+encodeURIComponent(this.state.phone)+"&"+
      "message="+encodeURIComponent(this.state.message);
    console.log(this.state.name);
    return fetch(this.state.url, {
      body: data,
      cache: 'no-cache',
      headers: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      method: 'POST'
    }).then(response => {
      return response.json();
    }).then(data => {
      this.setState({
        //data = {"confirmed":[true/false]}
        confirmed: data.confirmed
      })
    }).catch(error => console.error(error));
  }
  warningButton(e) {
    e.preventDefault();
    this.setState({
      warn: false,
      checked: true
    });
  }
  okButton(e) {
    e.preventDefault();
    this.setState({
      confirmed: false,
      notified: true
    });
  }
  render() {
    return (
      <section className="contact">
        <div className="contact-parallax">
          <div className="parallax-opacity">
            <h1 className="contact-title">CONTACT US</h1>
          </div>
        </div>
        <div className="contact-information-area">
          <p>
            Create a message to send to us using the fields below, or
            use the contact information further below to send us a message 
            another time.<br/><br/>
            <i>
              Note: Sending a message using the fields below <b>will not </b> 
              send the message using your email account. Instead it sends an
              email to to our account using our account.
            </i>
          </p>
          <form className="contact-message-form" onSubmit={this.handleSubmit}>
            <label>
              <input type="text" name="name" value={this.state.name} onChange={this.handleChange} placeholder="Name"/><br/>
              <input type="text" name="organization"  value={this.state.organization} onChange={this.handleChange} placeholder="Organization (optional)"/><br/>
              <input type="text" name="email"  value={this.state.email} onChange={this.handleChange} placeholder="Email (optional)"/><br/>
              <input type="text" name="phone"  value={this.state.phone} onChange={this.handleChange} placeholder="Phone (optional)"/><br/>
              <textarea cols={this.state.cols} rows={this.state.rows} spellcheck="true" className="message" name="message"  value={this.state.message} onChange={this.handleChange} placeholder="Message..."/>
            </label>
            <br/>
            <input className="contact-submit-button" type="submit" value="Send Message" disabled={this.state.pressed}/>
            {this.state.warn ? <Warning warningButton = {this.warningButton}/> : ''}
            {this.state.sent ? <SentPopup/> : ''}
            {this.state.confirmed ? <EmailConfirmation okButton = {this.okButton}/> : ''}
          </form>
          <section className="contact-info">
            <h3>Contact Information</h3>
            <p>
            Owner: <i>(780) 524-8267</i> (Hugh Garbitt)<br/>
            Email: <i>garbitt@telus.net</i><br/>
            Office: <i>(780) 524-4754</i><br/>
            Fax: <i>(780) 524-4753</i><br/>
            Location: SW-21-70-23-W5<br/>
            </p>
          </section>
        </div>
      </section>
    );
  }
}
class Warning extends Component {
  constructor (props) {
    super(props);
  }
  render() {
    return(
      <div className="contact-backdrop">
        <div className="contact-box">
          <h3>one time heads up</h3>
          <p>
            Both the email and the phone fields were left blank. If there is not
            enough information in the message we may not be able to get back to
            you. This pop up won't appear again.
          </p>
          <button name="warning-button" onClick={this.props.warningButton}>ok</button>
        </div>
      </div>
    );
  }
}
class EmailConfirmation extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return(
      <div className="contact-backdrop">
        <div className="contact-box">
          <h3>Email has been sent!</h3>
          <button name="ok-button" onClick={this.props.okButton}>ok</button>
        </div>
      </div>
    );
  }
}
class SentPopup extends Component {
  render() {
    return (
      <div className="sent-box">
        <p>
          You're message has been sent! A confirmation popup will appear if
          the email has been successfully sent.
        </p>
      </div>
    );
  }
}
class Footer extends Component {
  render() {
    return (
      <footer></footer>
    );
  }
}
class Homepage extends Component {
  constructor (props) {
    super (props);
  }
  render() {
    return (
      <div>
        <Navigation />
        <About />
        <Services />
        <Safety />
        <Fleet />
        <Contact />
        <Footer />
      </div>
    );
  }
}

export default Homepage;
