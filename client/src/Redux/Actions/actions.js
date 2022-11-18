import {
  FILL_PLAYERS_DATA_ERROR,
  FILL_PLAYERS_DATA_LOADING,
  FILL_PLAYERS_DATA,
  FILL_SESSION_DATA_ERROR,
  FILL_SESSION_DATA_LOADING,
  FILL_SESSION_DATA,
  FILL_USER_DATA_ERROR,
  FILL_USER_DATA_LOADING,
  FILL_USER_DATA,
  FILL_LOCATIONS_DATA_ERROR,
  FILL_LOCATIONS_DATA_LOADING,
  FILL_LOCATIONS_DATA,
} from "./actionTypes";

export const fillPlayersDataAction = (token) => {
  return async (dispatch, getState) => {
    try {
      let response = await fetch(`${process.env.REACT_APP_URL}/players`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.ok) {
        let data = await response.json();
        dispatch({
          type: FILL_PLAYERS_DATA_LOADING,
          payload: false,
        });
        dispatch({
          type: FILL_PLAYERS_DATA,
          payload: data,
        });
      } else {
        dispatch({
          type: FILL_PLAYERS_DATA_LOADING,
          payload: false,
        });
        dispatch({
          type: FILL_PLAYERS_DATA_ERROR,
          payload: true,
        });
      }
    } catch (error) {
      dispatch({
        type: FILL_PLAYERS_DATA_LOADING,
        payload: false,
      });
      dispatch({
        type: FILL_PLAYERS_DATA_ERROR,
        payload: true,
      });
    }
  };
};

export const fillSessionData = (status = "active") => {
  return async (dispatch, getState) => {
    try {
      dispatch({
        type: FILL_SESSION_DATA_LOADING,
        payload: true,
      });
      let response = await fetch(
        `${process.env.REACT_APP_URL}/sessions/${status}`
      );
      if (response.ok) {
        let data = await response.json();
        dispatch({
          type: FILL_SESSION_DATA_LOADING,
          payload: false,
        });
        dispatch({
          type: FILL_SESSION_DATA,
          payload: data,
        });
      } else {
        dispatch({
          type: FILL_SESSION_DATA_LOADING,
          payload: false,
        });
        dispatch({
          type: FILL_SESSION_DATA_ERROR,
          payload: true,
        });
      }
    } catch (error) {
      dispatch({
        type: FILL_SESSION_DATA_LOADING,
        payload: false,
      });
      dispatch({
        type: FILL_SESSION_DATA_ERROR,
        payload: true,
      });
    }
  };
};

export const fillUserData = (token) => {
  return async (dispatch, getState) => {
    try {
      let response = await fetch(`${process.env.REACT_APP_URL}/players/me`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.ok) {
        let data = await response.json();
        dispatch({
          type: FILL_USER_DATA_LOADING,
          payload: false,
        });
        dispatch({
          type: FILL_USER_DATA,
          payload: data,
        });
      } else {
        dispatch({
          type: FILL_USER_DATA_LOADING,
          payload: false,
        });
        dispatch({
          type: FILL_USER_DATA_ERROR,
          payload: true,
        });
      }
    } catch (error) {
      dispatch({
        type: FILL_USER_DATA_LOADING,
        payload: false,
      });
      dispatch({
        type: FILL_USER_DATA_ERROR,
        payload: true,
      });
    }
  };
};

export const fillLocationsData = (token) => {
  return async (dispatch, getState) => {
    try {
      let response = await fetch(
        `${process.env.REACT_APP_URL}/players/locations`
      );
      if (response.ok) {
        let data = await response.json();
        dispatch({
          type: FILL_LOCATIONS_DATA_LOADING,
          payload: false,
        });
        dispatch({
          type: FILL_LOCATIONS_DATA,
          payload: data,
        });
      } else {
        dispatch({
          type: FILL_LOCATIONS_DATA_LOADING,
          payload: false,
        });
        dispatch({
          type: FILL_LOCATIONS_DATA_ERROR,
          payload: true,
        });
      }
    } catch (error) {
      dispatch({
        type: FILL_LOCATIONS_DATA_LOADING,
        payload: false,
      });
      dispatch({
        type: FILL_LOCATIONS_DATA_ERROR,
        payload: true,
      });
    }
  };
};
