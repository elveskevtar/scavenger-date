import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import Typed from 'react-typed';
import Map from './Map';

import './App.css';


// --- The Great Escape Room - Sherlock Holmes' Library ---
// <iframe width="560" height="315" src="https://www.youtube.com/embed/Vf-QGXlUjts" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      curr: {
        lat: 42.28,
        lng: -83.74
      },
      nails: {
        lat: 42.2657,
        lng: -83.7346
      },
      comedyClub: {
        lat: 42.4876,
        lng: -83.1420
      },
      escapeRoom: {
        lat: 42.4870,
        lng: -83.1468
      },
      zoom: 16,
      watchId: 0,
      comedyRiddleAnswer: 'comedy',
      escapeRoomAnswer: 'sherlock',
      dateProgress: 'countdown',
      countDownDate: new Date("Jan 30, 2020 17:00:00").getTime()
    };
  }

  updateMap = (position) => {
    this.setState({
      curr: {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      },
      zoom: 16
    });
  }

  pad = (n, width, z) => {
    z = z || '0';
    n += '';
    return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;
  }

  checkIn = () => {
    let watchId = navigator.geolocation.getCurrentPosition(this.updateMap);
    this.setState({
      watchId: watchId,
      dateProgress: "nails-riddle"
    });
  }

  progressDate = () => {
    let watchId = navigator.geolocation.getCurrentPosition(this.updateMap);
    if (this.state.dateProgress === "nails-riddle") {
      this.setState({
        watchId: watchId,
        dateProgress: "otw-nails"
      });
    } else if (this.state.dateProgress === "otw-nails") {
      this.setState({
        watchId: watchId,
        dateProgress: "comedy-riddle"
      });
    } else if (this.state.dateProgress === "comedy-riddle") {
      this.setState({
        watchId: watchId,
        dateProgress: "otw-comedy"
      });
    } else if (this.state.dateProgress === "otw-comedy") {
      this.setState({
        watchId: watchId,
        dateProgress: "escape-riddle"
      });
    } else if (this.state.dateProgress === "escape-riddle") {
      this.setState({
        watchId: watchId,
        dateProgress: "otw-escape"
      });
    } else if (this.state.dateProgress === "otw-escape") {
      this.setState({
        watchId: watchId,
        dateProgress: "final"
      });
    }
  }

  updateRiddle = (event) => {
    if (this.state.dateProgress === "comedy-riddle"
        && event.target.value.toLowerCase() === this.state.comedyRiddleAnswer) {
      this.progressDate();
    } else if (this.state.dateProgress === "escape-riddle"
        && event.target.value.toLowerCase() === this.state.escapeRoomAnswer) {
      this.progressDate();
    }
  }

  render() {
    if (this.state.dateProgress === "countdown") {
      let now = new Date().getTime();
      let distance = this.state.countDownDate - now;
  
      var days = this.pad(Math.floor(distance / (1000 * 60 * 60 * 24)), 2);
      var hours = this.pad(Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)), 2);
      var minutes = this.pad(Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)), 2);
      var seconds = this.pad(Math.floor((distance % (1000 * 60)) / 1000), 2);
      
      if (distance < 0) this.setState({dateProgress: "idle"});
    }

    return (
      <div className="App">
        { this.state.dateProgress === "countdown" && (
          <div className="App-content">
            <div className="App-countdown">
              {days}:{hours}:{minutes}:{seconds}
            </div>
          </div>
        )}
        { this.state.dateProgress === "idle" && (
          <div className="App-content">
            <Typed className="App-update" strings={[
              'Hello special agent Dhriti'
            ]} showCursor={false} typeSpeed={40}></Typed><br />
            <Typed className="App-update" strings={[
              'Your mission should you choose to accept it'
            ]}
              typeSpeed={40}
              startDelay={2000}
              showCursor={false}></Typed><br />
            <Typed className="App-update" strings={[
              '> Go on date with Kevin (LOML)',
              '> Have lots of fun in each others company',
              '> Fall in love a little more each day'
            ]}
              typeSpeed={40}
              backSpeed={50}
              startDelay={6000}
              backDelay={3000}></Typed><br />

            <div className="App-centered">
              <Button className="App-checkin-button" variant="light" onClick={this.checkIn}>Check In</Button>
            </div>
          </div>
        )}
        { this.state.dateProgress === "nails-riddle" && (
          <div className="App-content">
            <div className="App-column">
              <h1 className="App-nails-riddle">You have three gems:</h1>
              <h1 className="App-red">one red</h1>
              <h1 className="App-blue">one blue</h1>
              <h1 className="App-green">one green</h1>
              <br />
              <h1 className="App-nails-riddle">You must choose the right one, here's a clue:</h1>
              <h1 className="App-blue">red under blue, yellow</h1>
              <Button className="riddle-button" variant="primary">blue</Button>
              <Button className="riddle-button" variant="danger" onClick={this.progressDate}>red</Button>
              <Button className="riddle-button" variant="success">green</Button>
            </div>
          </div>
        )}
        { this.state.dateProgress === "otw-nails" && (
          <div className="App-content">
            <div className="App-centered">
              <Button className="App-arrived-button" onClick={this.progressDate}>Arrived</Button>
            </div>
            <br />
            <Map destination={this.state.nails} center={this.state.curr} zoom={this.state.zoom}></Map>
          </div>
        )}
        { this.state.dateProgress === "comedy-riddle" && (
          <div className="App-content">
            <div className="App-centered">
              <p className="App-riddle">My first is in cribber but not in brier</p>
              <p className="App-riddle">My second is in nonprescription but not in reinspect</p>
              <p className="App-riddle">My third is in homer but not in hero</p>
              <p className="App-riddle">My fourth is in solace but not in colossal</p>
              <p className="App-riddle">My fifth is in ruddiness but not in insurer</p>
              <p className="App-riddle">My sixth is in equably but not in equable</p>
              <input className="App-riddlebox" onChange={this.updateRiddle} type="text" name="answer"></input>
            </div>
          </div>
        )}
        { this.state.dateProgress === "otw-comedy" && (
          <div className="App-content">
            <div className="App-centered">
              <Button className="App-arrived-button" onClick={this.progressDate}>Arrived</Button>
            </div>
            <br />
            <Map destination={this.state.comedyClub} center={this.state.curr} zoom={this.state.zoom}></Map>
          </div>
        )}
        { this.state.dateProgress === "escape-riddle" && (
          <div className="App-content">
          <div className="App-centered">
            <p className="App-riddle">Let's make an escape</p>
            <p className="App-riddle">I know a detective who smokes a pipe</p>
            <p className="App-riddle">He has an assitant: Watson</p>
            <input className="App-riddlebox" onChange={this.updateRiddle} type="text" name="answer"></input>
          </div>
        </div>
        )}
        { this.state.dateProgress === "otw-escape" && (
          <div className="App-content">
            <div className="App-centered">
              <Button className="App-arrived-button" onClick={this.progressDate}>Arrived</Button>
            </div>
            <br />
            <Map destination={this.state.escapeRoom} center={this.state.curr} zoom={this.state.zoom}></Map>
          </div>
        )}
        { this.state.dateProgress === "final" && (
          <div className="App-content">
            <div className="App-centered">
              <div className="video-wrapper">
                <iframe src="https://www.youtube.com/embed/Vf-QGXlUjts" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default App;
