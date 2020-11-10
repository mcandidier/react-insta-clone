import API from './api';


export const getAllPosts = async () => {  
    return await API.get('posts/');
}

export const createPost = async (data) => {
    return await API.post('posts/', data);
}

export const likePost = async (id) => {
    return await API.post(`posts/${id}/`, {'action': 'like'});
}