import React, { useEffect, useState } from 'react';
import Nav from './components/Nav';
import Post from './components/Post';
import PostModal from './components/PostModal';
import Login from './components/Login';


import './App.css';

import { getAllPosts } from './actions';
import { userLogin, userLogout } from './redux/auth/actions';


import { useDispatch, connect } from 'react-redux';


function App(props) {
  const dispatch = useDispatch();

  const [open, setOpen] = useState(false);
  const [posts, setPosts] = useState([]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handlePostUpdate = (post) => {
    // Append a single item
    setPosts(posts => [post, ...posts]);
  }

  useEffect( () => {

      const fetchData = async () => {
        const result = await getAllPosts()
        setPosts(result.data);
      };
      fetchData();
  }, []);


  const renderItems = () => {
    return posts.map((post, index) => 
      <Post key={index} obj={post}></Post>
    )
  };
  
  return (
    <div className="App">
      <Nav handleClickOpen={handleClickOpen}></Nav>
      <PostModal open={open} handleClickOpen={handleClickOpen} handleClose={handleClose} handlePostUpdate={handlePostUpdate}></PostModal>
      <div className="container">
        {renderItems()}
      </div>
    </div>
  )
}


const mapStateToProps = (state, ownProps) => {
  const { user } = state;
  return {user}
}

export default connect(mapStateToProps, {
})(App);
