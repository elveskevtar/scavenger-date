import React, { Component } from 'react';
import { DirectionsService, GoogleMap, LoadScript, DirectionsRenderer } from '@react-google-maps/api';
import './Map.css'

class Map extends Component {
  constructor(props) {
    super(props);
    this.state = {
      response: null,
      travelMode: 'WALKING'
    }
  }

  directionsCallback = (response) => {
    console.log(response);

    if (response !== null) {
      if (response.status === 'OK') {
        this.setState(() => ({response}));
      } else {
        console.log('response: ', response);
      }
    }
  }

  render() {
    return (
      <div className="Map-widget">
        <LoadScript id='script-loader' googleMapsApiKey='AIzaSyDmb1NUK6locvk6tCTbEeKJpRoVCiXYF74'>
          <GoogleMap id='start-map'
          center={this.props.center}
          zoom={this.props.zoom}
          mapContainerStyle={{width: "100%", height: "100%"}}>
            <DirectionsService options={{
              destination: this.props.destination,
              origin: this.props.center,
              travelMode: this.state.travelMode
            }} callback={this.directionsCallback}>
            </DirectionsService>
            {
              this.state.response !== null && (
                <DirectionsRenderer options={{directions: this.state.response}}>
                </DirectionsRenderer>
              )
            }
          </GoogleMap>
        </LoadScript>
      </div>
    )
  }
}

export default Map;
