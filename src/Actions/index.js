import {store} from '../index';

const cities = [
    {
        "capitalCity": "Zurich",
        "lat": 47.451542,
        "long": 8.564572
    },
    {
        "capitalCity": "Paris",
        "lat": 48.864716,
        "long": 2.349014
    },
    {
        "capitalCity": "Madrid",
        "lat": 41.415363,
        "long": -3.707398
    },
    {
        "capitalCity": "London",
        "lat": 51.509865,
        "long": -0.118092
    },
    {
        "capitalCity": "Berlin",
        "lat": 52.520008,
        "long": 13.404954
    },
    {
        "capitalCity": "Amsterdam",
        "lat": 52.377956,
        "long": 4.897070
    },
    {
        "capitalCity": "Rome",
        "lat": 41.902782,
        "long": 12.496366
    },
    {
        "capitalCity": "Oslo",
        "lat": 59.911491,
        "long": 10.757933
    },
    {
        "capitalCity": "Vienna",
        "lat": 48.210033,
        "long": 16.363449
    }
];
export const getCitiesFromJSON = () =>{
    cities.map( city => city.spotted = false)
    return {type: 'LOAD_CITIES', payload: cities}
}

const updateCities = (cityToFind) => {
    const citiesCopy = [...store.getState().cities];

    citiesCopy.map( city => {
        if (city.capitalCity === cityToFind.capitalCity){
            city.spotted = true;
        }
    })
    console.log(citiesCopy)
    return {type: 'LOAD_CITIES', payload: citiesCopy}
}

export const getCityToFind = () => {
    const citiesCopy = [...store.getState().cities];

    let cityToFind = citiesCopy.find( city => city.spotted === false)
    console.log('citiiit', cityToFind)
    return {type: 'SELECTED_CITY', payload: cityToFind}

}

const updateScore = (distance)=> {
    const actualScore = store.getState().score;
    console.log(actualScore)
    if (distance <= 50){
        console.log('entra en menor')
        return {km: actualScore.km, spottedCities: ++actualScore.spottedCities}
    }else {
        console.log('entra en mayor')
        return {km: actualScore.km - distance, spottedCities: actualScore.spottedCities}
    }

}

export const calculateDistance = (e) => dispatch => {
    const {lat:cityToFindLat, long:cityToFindLong} = store.getState().cityToFind;
    updateCities(store.getState().cityToFind);
    const {lat:userLat, lng:userLong} = e.latlng;
    console.log(userLat, userLong)
    console.log(cityToFindLat, cityToFindLong)
    const rad = function(x) {return x*Math.PI/180;}
    var R = 6378.137; //Radio de la tierra en km
    var dLat = rad( userLat - cityToFindLat );
    var dLong = rad( userLong - cityToFindLong );
    var a = Math.sin(dLat/2) * Math.sin(dLat/2) + Math.cos(rad(cityToFindLat)) * Math.cos(rad(userLat)) * Math.sin(dLong/2) * Math.sin(dLong/2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    var d = R * c;
    var distance = d.toFixed(3)
    console.log(distance)
    dispatch(getCityToFind())
    const updatedScore = updateScore(distance);
    dispatch ({type:'UPDATE_SCORE', payload: updatedScore})
}
