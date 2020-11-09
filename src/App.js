import React, { useEffect, useState } from 'react';
import Nav from './components/Nav';
import Post from './components/Post';
import PostModal from './components/PostModal';

import './App.css';

import API from './api';

function App() {
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

  useEffect(() => {
      const fetchData = async () => {  
          const res = await API.get('posts/');
          setPosts(res.data);
      };
      fetchData();
  }, []);


  const renderItems = () => {
    return posts.map((post, index) => 
      <Post key={index} post={post}></Post>
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

export default App;
