import React, { Component } from 'react';
import {connect} from 'react-redux';
import '../Styles/map.css';
import L from 'leaflet';
import {getCitiesFromJSON, getCityToFind, calculateDistance} from '../Actions/index';

class MapView extends Component {

  componentWillMount  () {
    this.props.getCities();
    this.props.getCityToFind();
    console.log('will mount')
  }

  componentDidMount () {
    console.log('did mount')
    var map = L.map('map', {
      center: [45.505, 10.5],
      zoom: 4.8,
     dragging: false
   });
    L.tileLayer('http://{s}.basemaps.cartocdn.com/light_nolabels/{z}/{x}/{y}.png', {
      attribution: '©OpenStreetMap, ©CartoDB'
    }).addTo(map);
    L.marker([41.66, -4.71],{draggable: true}).addTo(map);


  map.on('mouseup', this.props.onMapClick);
  }

  render() {
    return <div id="map" className="map"></div>
    ;
  }
}


const Map = connect( state => ({
  cities: state.cities
}), dispatch => ({
  getCities: () => dispatch(getCitiesFromJSON()),
  getCityToFind: () => dispatch(getCityToFind()),
  onMapClick: (e) => dispatch(calculateDistance(e))
}))(MapView)

export default Map;