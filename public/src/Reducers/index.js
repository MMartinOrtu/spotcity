import { LOAD_CITIES, SELECTED_CITY, UPDATE_SCORE } from '../Actions/actionsTypes';
import {combineReducers} from 'redux';

const getCitiesReducer = (state= null, action) =>{
    switch (action.type) {
        case LOAD_CITIES:
            return action.payload;
        case SELECTED_CITY:
            return action.payload.cities
        default:
            return state
    }
}

const scoreReducer = (state= { km:1500, spottedCities: 0, message: null, counter: 0}, action) =>{
    switch (action.type) {
        case UPDATE_SCORE:
            return action.payload;
        default:
            return state
    }
}

const cityToFindReducer = (state= {}, action) =>{
     switch (action.type){
        case SELECTED_CITY:
            return action.payload.cityToFind
        default:
            return state;
     }
}

const rootReducer = combineReducers({
    cities: getCitiesReducer,
    score: scoreReducer,
    cityToFind: cityToFindReducer
});

export default rootReducer;