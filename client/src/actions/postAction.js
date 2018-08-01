import {ADD_POST, GET_ERRORS, GET_POSTS, DELETE_POST} from './types';
import axios from 'axios';

// add post
export const addPost = (postData) => dispatch => {
  axios.post('/api/posts', postData, {headers: {"Authorization": localStorage.getItem('jwtToken')}})
    .then(res => dispatch({
      type: ADD_POST,
      payload: res.data
    }))
    .catch(err => dispatch({
      type: GET_ERRORS,
      payload: err.response.data
    }));
}

// get all posts
export const getPosts = () => dispatch => {
  axios.get('/api/posts')
    .then(res => dispatch({
      type: GET_POSTS,
      payload: res.data
    }))
    .catch(err => dispatch({
      type: GET_ERRORS,
      payload: err.response.data
    }));
}

// delete post
export const deletePost = (id) => dispatch => {
  if(window.confirm("Are you sure to delete this post?")) {
    axios.delete(`/api/posts/${id}`, {headers: {"Authorization": localStorage.getItem('jwtToken')}})
      .then(res => dispatch({
        type: DELETE_POST,
        payload: id
      }))
      .catch(err => dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      }));
  }
}