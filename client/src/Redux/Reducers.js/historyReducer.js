import { initialState } from "../store";
import { FILL_HISTORY_DATA } from "../Actions/actionTypes.js";
import { FILL_HISTORY_DATA_LOADING } from "../Actions/actionTypes.js";
import { FILL_HISTORY_DATA_ERROR } from "../Actions/actionTypes.js";


const locationsReducer = (state = initialState.history, action) => {
    switch (action.type) {
        case FILL_HISTORY_DATA:
            return {
                ...state,
                data: action.payload
            }
        case FILL_HISTORY_DATA_LOADING:
            return {
                ...state,
                loading: action.payload
            }
        case FILL_HISTORY_DATA_ERROR:
            return {
                ...state,
                error: action.payload
            }
        default:
            return state
    }
}

export default locationsReducer