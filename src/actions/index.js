import axios from 'axios';
import { browserHistory } from 'react-router';
import { AUTH_USER, UNAUTH_USER, AUTH_ERROR, FETCH_MESSAGE } from './types';

const ROOT_URL = 'http://localhost:3090';

export function signinUser({ email, password }) {
  // Use redux-thunk to gain access to "dispatch" directly so we can also pipe functions through as actions
  // redux-thunk is async by nature.
  return function(dispatch) {
    // Submit email/password to the server
    axios
      .post(`${ROOT_URL}/signin`, { email, password })
      .then(response => {
        // If request is good...
        // - Update state to indicate user is authenticated
        dispatch({ type: AUTH_USER });
        // - Save the JWT
        // localStorage is available on window scope
        localStorage.setItem('token', response.data.token);
        // - Redirect to the route/feature programmatically
        browserHistory.push('/feature');
      })
      .catch(() => {
        // If request is bad...
        // - Show an error to the user
        dispatch(authError('Bad Login Info'));
      });
  };
}

// We don't need to send the password confirmation field to the back-end, just the email & password
export function signupUser({ email, password }) {
  // Make use of redux thunk by returning a function from this action creator
  return function(dispatch) {
    axios
      .post(`${ROOT_URL}/signup`, { email, password })
      .then(response => {
        dispatch({ type: AUTH_USER });
        localStorage.setItem('token', response.data.token);
        browserHistory.push('/feature');
      })
      .catch(response => dispatch(authError(response.data.error)));
  };
}

export function authError(error) {
  return {
    type: AUTH_ERROR,
    payload: error
  };
}

export function signoutUser() {
  // Delete token on sign out
  localStorage.removeItem('token');

  return { type: UNAUTH_USER };
}

export function fetchMessage() {
  // redux-promise is also possible here, but for consistency sake we'll use thunk
  return function(dispatch) {
    axios
      .get(ROOT_URL, {
        // To make an auth request with a token we need to include it in the headers of our request.
        headers: { authorization: localStorage.getItem('token') }
      })
      .then(response => {
        dispatch({
          type: FETCH_MESSAGE,
          payload: response.data.message
        });
      });
  };
}
