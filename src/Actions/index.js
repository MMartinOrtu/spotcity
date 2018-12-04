import {store} from '../index';
import L from 'leaflet';

const cities = [
    {
        "capitalCity": "Zurich",
        "lat": "47.451542",
        "long": "8.564572"
    },
    {
        "capitalCity": "Paris",
        "lat": "48.864716",
        "long": "2.349014"
    },
    {
        "capitalCity": "Madrid",
        "lat": "40.415363",
        "long": "-3.707398"
    },
    {
        "capitalCity": "London",
        "lat": "51.509865",
        "long": "-0.118092"
    },
    {
        "capitalCity": "Berlin",
        "lat": "52.520008",
        "long": "13.404954"
    },
    {
        "capitalCity": "Amsterdam",
        "lat": "52.377956",
        "long": "4.897070"
    },
    {
        "capitalCity": "Rome",
        "lat": "41.902782",
        "long": "12.496366"
    },
    {
        "capitalCity": "Oslo",
        "lat": "59.911491",
        "long": "10.757933"
    },
    {
        "capitalCity": "Vienna",
        "lat": "48.210033",
        "long": "16.363449"
    }
];
export const getCitiesFromJSON = () =>{
    cities.map( city => city.spotted = false)
    return {type: 'LOAD_CITIES', payload: cities}
}

export const getCityToFind = () => {
    const citiesCopy = [...store.getState().cities];

    let cityToFind = citiesCopy.find( city => city.spotted == false)
    console.log('citiiit', cityToFind)
    return {type: 'SELECTED_CITY', payload: cityToFind}

}

export const calculateDistance = (e) => {
    let firstPoint={x: 634.0966322122982, y: 94};
    let secondPoint={x: 700.0966322122982, y: 94};
    let length = L.GeometryUtil.length([firstPoint, secondPoint])
    console.log(length)
return {type:'Calculate'}

}
