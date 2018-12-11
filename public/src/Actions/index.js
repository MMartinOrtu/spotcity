import{ LOAD_CITIES, SELECTED_CITY, UPDATE_SCORE } from './actionsTypes';
import {store} from '../index';
import {clearStorage} from '../localStorage';
import {cities} from '../data';

export const getCitiesFromJSON = () =>{
    return {type: LOAD_CITIES, payload: cities}
}

export const getCityToFind = () => {
    const citiesCopy = [...store.getState().cities];
    let cityToFind = citiesCopy.shift();
    if (cityToFind === undefined){
        return {type: SELECTED_CITY, payload: {cityToFind: {}, cities: []} }
    }else{
      return {type: SELECTED_CITY, payload: {cityToFind: cityToFind, cities: citiesCopy}}
    }
}

const updateScore = (distance)=> {
    const actualScore = store.getState().score;
    console.log(actualScore)
    if (distance <= 50){
        return {km: actualScore.km, spottedCities: ++actualScore.spottedCities, message: `Well done! Your pin is ${distance} kms away from the city`, counter: ++actualScore.counter}
    }else {
        const newKmScore = actualScore.km - distance;
        return {km: newKmScore > 0 ? newKmScore : 0, spottedCities: actualScore.spottedCities, message: `Oppps! Your pin is ${distance} kms away from the city`, counter: ++actualScore.counter}
    }
}

export const calculateDistance = (e) => dispatch => {
    const {lat:cityToFindLat, long:cityToFindLong} = store.getState().cityToFind;
    const {lat:userLat, lng:userLong} = e.target._latlng;
    console.log(userLat, userLong)
    const rad = function(x) {return x*Math.PI/180;}
    var R = 6378.137; //Radio de la tierra en km
    var dLat = rad( userLat - cityToFindLat );
    var dLong = rad( userLong - cityToFindLong );
    var a = Math.sin(dLat/2) * Math.sin(dLat/2) + Math.cos(rad(cityToFindLat)) * Math.cos(rad(userLat)) * Math.sin(dLong/2) * Math.sin(dLong/2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    var d = R * c;
    var distance = d.toFixed(0)
    dispatch(getCityToFind())
    const updatedScore = updateScore(distance);
    dispatch ({type: UPDATE_SCORE, payload: updatedScore})
}

export const restartGame = () => dispatch => {
    clearStorage();
    getCitiesFromJSON();
    dispatch ({type: UPDATE_SCORE, payload: { km:1500, spottedCities: 0, message: null, counter: 0}})
}