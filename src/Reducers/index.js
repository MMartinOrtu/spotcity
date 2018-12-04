import {combineReducers} from 'redux';

const getCitiesReducer = (state= null, action) =>{
    switch (action.type) {
        case 'LOAD_CITIES':
            return action.payload;
        default:
            return state
    }
}
 const scoreReducer = (state= { km:1500, score: 0}, action) =>{
    switch (action.type) {
        default:
            return state
    }
 }

 const cityToFindReducer = (state= {}, action) =>{
     switch (action.type){
        case 'SELECTED_CITY':
            return action.payload;
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