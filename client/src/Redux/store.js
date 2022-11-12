import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import allPlayersReducer from './Reducers.js/playersReducers';
import sessionsReducer from './Reducers.js/sessionsReducer';
import userReducer from './Reducers.js/userReducer';
import locationsReducer from './Reducers.js/locationsReducer';
import historyReducer from './Reducers.js/historyReducer';

export const initialState = {

    players: {
        data: [],
        loading: false,
        error: null
    },

    sessions: {
        data: [],
        loading: false,
        error: null
    },

    user: {
        data: {},
        loading: false,
        error: null
    },

    locations: {
        data: [],
        loading: false,
        error: null
    },

    history: {
        data: [],
        loading: false,
        error: null
    },
}

const combinedReducers = combineReducers({
    players: allPlayersReducer,
    sessions: sessionsReducer,
    user: userReducer,
    locations: locationsReducer,
    history: historyReducer


})

export const store = createStore(
    combinedReducers,
    initialState,
    process.env.REACT_APP_DEVELOPMENT ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__(applyMiddleware(thunk)) : compose(applyMiddleware(thunk))
)



export default store