import React, { Component } from 'react';
import {connect} from 'react-redux';
import '../Styles/map.css';
import L from 'leaflet';
import {getCitiesFromJSON, getCityToFind, calculateDistance} from '../Actions/index';

const bounds = new L.LatLngBounds(new L.LatLng(70, -16), new L.LatLng(35, 25));

class MapView extends Component {

  componentWillMount  () {
    this.props.getCities();
    this.props.getCityToFind();
  }

  componentDidMount () {
    var map = L.map('map', {
      center: bounds.getCenter(),
      zoom: 4,
      maxZoom:8,
      minZoom: 4,
      maxBounds: bounds,
      bounceAtZoomLimits: false,
      zoomControl:false
    })

    L.tileLayer('http://{s}.basemaps.cartocdn.com/light_nolabels/{z}/{x}/{y}.png', {
      attribution: '©OpenStreetMap, ©CartoDB'
    }).addTo(map);

    var pinIcon = L.icon({
      iconUrl: require('../Images/pin.png'),
      iconSize: [36, 36],
    });
    var marker = L.marker([46, 4],{icon: pinIcon, draggable: true})
      .addTo(map)
    marker.on('dragend', this.props.calculateDistance);

    var popup = L.popup();
    const popupMessage = (e) =>{
      popup
      .setLatLng(e.target._latlng)
      .setContent(this.props.score.message)
      .openOn(map);
    }
    marker.on('dragend', popupMessage);
  }

  render() {
    return <div id="map" className="map"></div>
    ;
  }
}

const Map = connect( state => ({
  cities: state.cities,
  score: state.score
}), dispatch => ({
  getCities: () => dispatch(getCitiesFromJSON()),
  getCityToFind: () => dispatch(getCityToFind()),
  calculateDistance: (e) => dispatch(calculateDistance(e))
}))(MapView);

export default Map;