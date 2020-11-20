import API from './api';


export const getAllPosts = async () => { 
  try {
    return await API.get('posts/');
  } catch (err) {
    return err;
  }
}

export const createPost = async (data) => {
    return await API.post('posts/', data);
}

export const likePost = async (data) => {
    return await API.post(`posts/${data.id}/`, data);
}
