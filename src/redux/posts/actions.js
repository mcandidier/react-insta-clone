import API from '../../api';

export const setCollections= (posts) => {
  return {
    type: 'SET_COLLECTIONS',
    posts
  }
}

export const getUserCollections = () => {
  console.log('getUserCollections')
  return (dispatch) => {
    return API.get('posts/').then( resp => {

        dispatch(setCollections(resp.data));
    }, (err) => {
      console.log(err);
    });
  }
}