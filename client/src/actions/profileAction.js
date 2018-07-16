import {GET_PROFILE, LOAD_PROFILE, CLEAR_CURRENT_PROFILE, GET_ERRORS, SET_CURRENT_USER} from './types.js';
import axios from 'axios';

// get user profile
export const getUserProfile = () => dispatch => {
	dispatch(setProfileLoader());
	axios.get('/api/profile', {headers: {"Authorization": localStorage.getItem('jwtToken')}})
		.then(res => dispatch({
			type: GET_PROFILE,
			payload: res.data
		})).catch(err => dispatch({
			type: GET_PROFILE,
			payload: {}
		}));
};

// profile loading
export const setProfileLoader = () => {
	return {
		type: LOAD_PROFILE
	};
};

// clear current profile
export const clearProfile = () => {
	return {
		type: CLEAR_CURRENT_PROFILE
	};
};

// create profile
export const createNewProfile = (userData, history) => dispatch => {
	axios.post('/api/profile', userData, {headers: {"Authorization": localStorage.getItem('jwtToken')}})
		.then(res => history.push('/dashboard'))
		.catch(err => dispatch({
			type: GET_ERRORS,
			payload: err.response.data
		}));
}

// Delete Profile
export const deleteProfile = () => dispatch => {
	if(window.confirm("Are you sure you want to delete your profile?")) {
		axios.delete('/api/profile')
			.then(res => dispatch({
				type: SET_CURRENT_USER,
				payload: {}
			}))
	}

}