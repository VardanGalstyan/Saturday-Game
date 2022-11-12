import { initialState } from "../store";
import { FILL_PLAYERS_DATA } from "../Actions/actionTypes.js";
import { FILL_PLAYERS_DATA_LOADING } from "../Actions/actionTypes.js";
import { FILL_PLAYERS_DATA_ERROR } from "../Actions/actionTypes.js";


const allPlayersReducer = (state = initialState.players, action) => {
    switch (action.type) {
        case FILL_PLAYERS_DATA:
            return {
                ...state,
                data: action.payload
            }
        case FILL_PLAYERS_DATA_LOADING:
            return {
                ...state,
                loading: action.payload
            }
        case FILL_PLAYERS_DATA_ERROR:
            return {
                ...state,
                error: action.payload
            }
        default:
            return state
    }
}

export default allPlayersReducer