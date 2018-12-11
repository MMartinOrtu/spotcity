import React, { Component } from 'react';
import {connect} from 'react-redux';
import '../Styles/map.css';
import L from 'leaflet';
import {getCitiesFromJSON, getCityToFind, calculateDistance} from '../Actions/index';

const bounds = new L.LatLngBounds(new L.LatLng(70, -16), new L.LatLng(30, 25));

class MapView extends Component {

  componentWillMount  () {
    this.props.getCities();
    this.props.getCityToFind();
  }

  componentDidMount () {
    let map = L.map('map', {
      center:  [45.505, 5.5],
      zoom: 4,
      maxZoom:5,
      minZoom: 4,
      maxBounds: bounds,
      bounceAtZoomLimits: false,
      zoomControl:false
    })

    L.tileLayer('http://{s}.basemaps.cartocdn.com/light_nolabels/{z}/{x}/{y}.png', {
      attribution: '©OpenStreetMap, ©CartoDB'
    }).addTo(map);

    let pinIcon = L.icon({
      iconUrl: require('../Images/pin.png'),
      iconSize: [36, 36],
    });
    let cityIcon = L.icon({
      iconUrl: require('../Images/pin2.png'),
      iconSize: [36, 36],
    });
    let marker = L.marker([46, 4],{icon: pinIcon, draggable: true})
      .addTo(map)

    let cityMarker = L.marker([45.5, 1.5], {icon: cityIcon})

    var popup = L.popup();

    const showResult = (e) =>{
      let newLatLng = new L.LatLng(this.props.cityToFind.lat, this.props.cityToFind.long)
      cityMarker.setLatLng(newLatLng).addTo(map)
      this.props.calculateDistance(e)
      popup
      .setLatLng(e.target._latlng)
      .setContent(this.props.score.message)
      .openOn(map);
    }
    const hideCityMarker = () => {
      cityMarker.removeFrom(map);
    }

    marker.on('dragend', showResult);
    marker.on('dragstart', hideCityMarker);
  }

  render() {
    return <div id="map" className="map"></div>
    ;
  }
}

const Map = connect( state => ({
  cities: state.cities,
  score: state.score,
  cityToFind: state.cityToFind
}), dispatch => ({
  getCities: () => dispatch(getCitiesFromJSON()),
  getCityToFind: () => dispatch(getCityToFind()),
  calculateDistance: (e) => dispatch(calculateDistance(e))
}))(MapView);

export default Map;