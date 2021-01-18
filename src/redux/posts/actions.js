import API from '../../api';

export const setCollections= (posts) => {
  return {
    type: 'SET_COLLECTIONS',
    posts
  }
}

export const getUserCollections = (username) => {
  return (dispatch) => {
    return API.get(`accounts/${username}/posts/`).then( resp => {
        dispatch(setCollections(resp.data));
    }, (err) => {
      console.log(err);
    });
  }
}

// ============================================== //
export const setPosts = (posts) => {
  return {
    type: 'SET_POSTS',
    posts
  }
}

export const insertItem = (post) => {
  return {
    type: 'ADD_POST',
    post
  }
}

export const getPosts = () => {
  return (dispatch) => {
    return API.get('posts/').then( resp => {
        dispatch(setPosts(resp.data));
    }, (err) => {
      console.log(err);
    });
  }
}

export const addPost = (data, callback) => {
  return (dispatch) => {
    return API.post('posts/', data).then( resp => {
      dispatch(insertItem(resp.data));
      callback();
    }, (err) => {
      console.log(err);
    });
  }
}

export const getPostDetail = (postId, callback) => {
  return API.get(`posts/${postId}/`).then( resp => {
    callback(resp.data);
  });
}