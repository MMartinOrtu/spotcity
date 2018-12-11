import{ LOAD_CITIES, SELECTED_CITY, UPDATE_SCORE } from './actionsTypes';
import {store} from '../index';
import {clearStorage} from '../localStorage';
import {cities} from '../data';

export const getCitiesFromJSON = () =>{
    cities.map( city => city.spotted = false)
    return {type: LOAD_CITIES, payload: cities}
}

const updateCities = (cityToFind) => {
    const citiesCopy = [...store.getState().cities];
     citiesCopy.map( city => {
        if (city.capitalCity === cityToFind.capitalCity){
            city.spotted = true;
        }
        return true;
    })
    return {type: 'LOAD_CITIES', payload: citiesCopy}
}

export const getCityToFind = (cityToFind) => {

    const citiesCopy = [...store.getState().cities];
    let citiesToFind = citiesCopy.filter(city => city.spotted === false)
    let lastCityIndex = citiesToFind.indexOf(cityToFind) || 0;
    let index = lastCityIndex >= (citiesToFind.length-1) ? -1 : lastCityIndex
    let nextCityToFind = citiesToFind[++index];
    if (nextCityToFind === undefined){
        return {type: SELECTED_CITY, payload: {} }
    }else{
      return {type: SELECTED_CITY, payload: nextCityToFind}
    }
}

const updateScore = (distance, cityToFind)=> {
    const actualScore = store.getState().score;
    if (distance <= 50){
        updateCities(cityToFind)
        return {km: actualScore.km, spottedCities: ++actualScore.spottedCities, message: `Well done! Your pin is ${distance} kms away from the city`}
    }else {
        const newKmScore = actualScore.km - distance;
        return {km: newKmScore > 0 ? newKmScore : 0, spottedCities: actualScore.spottedCities, message: `Oppps! Your pin is ${distance} kms away from the city`}
    }
}

export const calculateDistance = (e) => dispatch => {
    const cityToFind = store.getState().cityToFind
    const {lat:cityToFindLat, long:cityToFindLong} = cityToFind;
    const {lat:userLat, lng:userLong} = e.target._latlng;
    const rad = function(x) {return x*Math.PI/180;}
    var R = 6378.137; //Radio de la tierra en km
    var dLat = rad( userLat - cityToFindLat );
    var dLong = rad( userLong - cityToFindLong );
    var a = Math.sin(dLat/2) * Math.sin(dLat/2) + Math.cos(rad(cityToFindLat)) * Math.cos(rad(userLat)) * Math.sin(dLong/2) * Math.sin(dLong/2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    var d = R * c;
    var distance = d.toFixed(0)
    dispatch(getCityToFind(cityToFind))
    const updatedScore = updateScore(distance, cityToFind);
    dispatch ({type: UPDATE_SCORE, payload: updatedScore})
}

export const restartGame = () => dispatch => {
    clearStorage();
    getCitiesFromJSON();
    dispatch ({type: UPDATE_SCORE, payload: { km:1500, spottedCities: 0, message: null}})
}