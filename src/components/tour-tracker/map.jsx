import React, { Component, PropTypes } from 'react';
import { loadMapMarker } from '../../providers/google-maps.js';

class Map extends Component {
  componentDidMount() {
    const el = document.getElementById('map');
    const options = {
      lat: this.props.lat, 
      lng: this.props.lng,
    };
    loadMapMarker(el, options);
  }

  style() {
    return {
      height: 400,
    };
  }

  render() {
    return (
      <div 
        className="map-container"
        style={ this.style() }
        id="map" 
      />
    );
  }
}

Map.propTypes = {
  lat: PropTypes.number,
  lng: PropTypes.number,
};

export default Map;