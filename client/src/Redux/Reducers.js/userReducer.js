import { initialState } from "../store";
import { FILL_USER_DATA } from "../Actions/actionTypes.js";
import { FILL_USER_DATA_LOADING } from "../Actions/actionTypes.js";
import { FILL_USER_DATA_ERROR } from "../Actions/actionTypes.js";


const userReducer = (state = initialState.user, action) => {
    switch (action.type) {
        case FILL_USER_DATA:
            return {
                ...state,
                data: action.payload
            }
        case FILL_USER_DATA_LOADING:
            return {
                ...state,
                loading: action.payload
            }
        case FILL_USER_DATA_ERROR:
            return {
                ...state,
                error: action.payload
            }
        default:
            return state
    }
}

export default userReducer