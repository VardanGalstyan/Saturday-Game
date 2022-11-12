import { initialState } from "../store";
import { FILL_SESSION_DATA } from "../Actions/actionTypes.js";
import { FILL_SESSION_DATA_LOADING } from "../Actions/actionTypes.js";
import { FILL_SESSION_DATA_ERROR } from "../Actions/actionTypes.js";


const sessionsReducer = (state = initialState.sessions, action) => {
    switch (action.type) {
        case FILL_SESSION_DATA:
            return {
                ...state,
                data: action.payload
            }
        case FILL_SESSION_DATA_LOADING:
            return {
                ...state,
                loading: action.payload
            }
        case FILL_SESSION_DATA_ERROR:
            return {
                ...state,
                error: action.payload
            }
        default:
            return state
    }
}

export default sessionsReducer