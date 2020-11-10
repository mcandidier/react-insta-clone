import API from './api';


export const getAllPosts = async () => {  
    return await API.get('posts/');
}

export const createPost = async (data) => {
    return await API.post('posts/', data);
}