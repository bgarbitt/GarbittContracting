import React, { Component } from 'react';
import logo from './gcl-logo.png';
import './Homepage.css';

class Navigation extends Component {
  render () {
    return (
      <header className="navigation">
        <h1>
          Garbitt Contracting
        </h1>
        <img src={logo} className="logo" alt="logo" />
        <nav className="navigation-normal">
          <a href="#about">About Us</a><p>|</p>
          <a href="#services">Services</a><p>|</p>
          <a href="#safety">Safety</a><p>|</p>
          <a href="#fleet">Fleet</a><p>|</p>
          <a href="#contact">Contact Us</a><p>|</p>
          <a href="#quote">Request a Quote</a>
        </nav>
        <div className="navigation-dropdown">
          <button className="navigation-dropdown-button">Jump To</button>
          <div className="navigation-dropdown-content">
            <a href="#about">About Us</a>
            <a href="#services">Services</a>
            <a href="#safety">Safety</a>
            <a href="#fleet">Fleet</a>
            <a href="#contact">Contact Us</a>
            <a href="#quote">Request a Quote</a>
          </div>
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
            <p className="parallax-pretty">SERVICES</p>
          </div>
        </div>
        <p className="services-statement">At Garbitt Contracting, we offer services in: (click for more info)<br/></p>
        <ServicesList servicesList={this.state.servicesList}/>
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
            return <ModalButton name={service} index={index}/>
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
      <li key={this.props.index}>
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
    this.handleClick = this.handleClick.bind(this);
    this.handleOutsideClick = this.handleOutsideClick.bind(this);
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
        /*{"explanation":["s"],"image":["i","i"],"video":["v","v"]}*/
        description: data.explanation,
        videoUrls: data.video,
        imageUrls: data.image
        /*imageUrls: ["https://i.redd.it/5i25q234ce711.jpg", "https://i.imgur.com/Rf6kd2z.jpg"]*/
      })
      console.log(JSON.stringify(data));
    }).catch(error => console.error(error));
  }
  handleClick() {
    document.removeEventListener('click', this.handleOutsideClick, false);
    this.props.onSpanClick();
  }
  handleOutsideClick(e) {
    if (this.node.contains(e.target)) {
      console.log('not outside');
      return;
    }
    this.handleClick();
  }
  render () {
    return (
      //<div className="service-modal-backdrop" onClick={this.handleClick}>
      //<div className="service-modal-backdrop" onClick={this.handleClick} ref={node => {this.node = node; }}>
      //<div className="service-modal-content" onClick={this.handleModalClick}>
      <div className="service-modal-backdrop" >
        <div className="service-modal-content" ref={node => {this.node = node; }}>
          <p>test</p>
          <button 
            className="service-modal-close"
            onClick={this.handleClick}>
            &times;
          </button>
          <h2>{this.props.name}</h2>
          <p>{this.state.description[0]}</p>
          <h3>Video Example</h3>
          <iframe width="420" height="315" src="https://www.youtube.com/embed/PoKFSIWZkyo" allowfullscreen></iframe>
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
            {this.props.urls.map((url) => {
              return <li className="service-modal-images-crop"><img src={url} alt={this.state.imageTitle}/></li>
            })}
        </ul>
      </section>
    );
  }
}
class Safety extends Component {
  constructor (props) {
    super (props);
  }
  render() {
    return (
      <section className="safety" id="safety">
        <div className="safety-parallax">
          <div className="parallax-opacity">
            <p className="parallax-pretty">SAFETY</p>
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
class Fleet extends Component {
  constructor (props) {
    super(props);
  }
  render() {
    return (
      <p>Fleet</p>
    );
  }
}
class Homepage extends Component {
  constructor (props) {
    super (props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleSubmit () {
    return false;
  }
  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <Navigation />
        <About />
        <Services />
        <Safety />
        <Fleet />
      </form>
    );
  }
}

export default Homepage;
