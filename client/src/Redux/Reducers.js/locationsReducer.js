import { initialState } from "../store";
import { FILL_LOCATIONS_DATA } from "../Actions/actionTypes.js";
import { FILL_LOCATIONS_DATA_LOADING } from "../Actions/actionTypes.js";
import { FILL_LOCATIONS_DATA_ERROR } from "../Actions/actionTypes.js";


const locationsReducer = (state = initialState.locations, action) => {
    switch (action.type) {
        case FILL_LOCATIONS_DATA:
            return {
                ...state,
                data: action.payload
            }
        case FILL_LOCATIONS_DATA_LOADING:
            return {
                ...state,
                loading: action.payload
            }
        case FILL_LOCATIONS_DATA_ERROR:
            return {
                ...state,
                error: action.payload
            }
        default:
            return state
    }
}

export default locationsReducer