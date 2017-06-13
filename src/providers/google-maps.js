import { GoogleMapsAPI } from '../configs/google-maps.js';
import GoogleMapsLoader from 'google-maps';
import $ from 'jquery';

GoogleMapsLoader.KEY = GoogleMapsAPI.KEY;

export const getGoogleMap = (lat, lng) => {
  const params = Params(query);
  return `${GoogleMapsAPI.URL}?key=${GoogleMapsAPI.KEY}&callback=initMap`;
};

export const loadGoogleMap = (el, { lat, lng }) => {
  const options = {
    zoom: 15,
    center: { lat, lng },
    mapTypeControl: false,
  }
  return GoogleMapsLoader.load(function(google) {
    new google.maps.Map(el, options);
  });
};

export const loadMapMarker = (el, { lat, lng }) => {
  const options = {
    position: { lat, lng },
    map: loadGoogleMap(el, { lat,lng }),
  }
}

export const unloadGoogleMap = () => {
  return GoogleMapsLoader.release(function() {
    console.log('No google maps api around');
  });
};