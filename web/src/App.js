import React, { Component } from 'react';
import Typed from 'react-typed';
import Map from './Map';

import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      curr: {
        lat: 42.28,
        lng: -83.74
      },
      palio: {
        lat: 42.278278,
        lng: -83.748444
      },
      literati: {
        lat: 42.280264,
        lng: -83.747464
      },
      blankslate: {
        lat: 42.279692,
        lng: -83.751307
      },
      zoom: 16,
      watchId: 0,
      riddle1answer: 'book',
      riddle2answer: 'ice cream',
      dateProgress: 'idle'
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

  checkIn = () => {
    let watchId = navigator.geolocation.watchPosition(this.updateMap);
    this.setState({
      watchId: watchId,
      dateProgress: "otw-palio"
    });
  }

  arrivedPalio = () => {
    this.setState({
      dateProgress: "riddle1"
    });
  }

  arrivedLiterati = () => {
    this.setState({
      dateProgress: "riddle2"
    });
  }

  updateRiddle = (event) => {
    if (this.state.dateProgress === "riddle1"
        && event.target.value === this.state.riddle1answer) {
      this.setState({dateProgress: "otw-literati"});
    }
    if (this.state.dateProgress === "riddle2"
        && event.target.value === this.state.riddle2answer) {
      this.setState({dateProgress: "final"});
    }
  }

  render() {
    return (
      <div className="App">
        { this.state.dateProgress === "idle" && (
          <div className="App-content">
            <Typed className="App-update" strings={[
              'Hello special agent Dhriti'
            ]} showCursor={false} typeSpeed={40}></Typed><br />
            <Typed className="App-update" strings={[
              'Your mission should you choose to accept it',
              'To go on a date with Kevin',
              'To have a good time',
              'To get to the next checkpoint'
            ]}
              typeSpeed={40}
              backSpeed={50}
              startDelay={2000}
              backDelay={1600}></Typed><br />
            <button className="App-checkin-button" onClick={this.checkIn}>Check In</button>
          </div>
        )}
        { this.state.dateProgress === "otw-palio" && (
          <div className="App-content">
            <button className="App-arrived-button" onClick={this.arrivedPalio}>Arrived</button>
            <Map destination={this.state.palio} center={this.state.curr} zoom={this.state.zoom}></Map>
          </div>
        )}
        { this.state.dateProgress === "riddle1" && (
          <div className="App-content">
            <p className="App-riddle1">My spine is stiff</p>
            <p className="App-riddle1">My body is pale</p>
            <p className="App-riddle1">I'm always ready to tell a tale</p>
            <input className="App-riddlebox" onChange={this.updateRiddle} type="text" name="answer"></input>
          </div>
        )}
        { this.state.dateProgress === "otw-literati" && (
          <div className="App-content">
            <button className="App-arrived-button" onClick={this.arrivedLiterati}>Arrived</button>
            <Map destination={this.state.literati} center={this.state.curr} zoom={this.state.zoom}></Map>
          </div>
        )}
        { this.state.dateProgress === "riddle2" && (
          <div className="App-content">
            <p className="App-riddle1">Once arrived, go downstairs</p>
            <p className="App-riddle1">The trail starts with the Great Goddesses</p>
            <p className="App-riddle1">Page. 105</p>
            <input className="App-riddlebox" onChange={this.updateRiddle} type="text" name="answer"></input>
          </div>
        )}
        { this.state.dateProgress === "final" && (
          <div className="App-content">
            <Map destination={this.state.blankslate} center={this.state.curr} zoom={this.state.zoom}></Map>
          </div>
        )}
      </div>
    );
  }
}

export default App;
