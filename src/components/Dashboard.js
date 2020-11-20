import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';

import{
  Nav,
  Post,
  PostModal,
} from '../components';

import { getAllPosts } from '../actions';


function Dashboard(props) {
  const [open, setOpen] = useState(false);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);

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

  const fetchData = async () => {
    setLoading(true);
    const result = await getAllPosts();
    if(result.data) {
      setPosts(result.data);
    }
  };

  useEffect( () => {
      fetchData();

      return () => {
        setLoading(false);
      }
  }, []);


  const renderPosts = () => {
    return posts.map((post, index) => 
      <Post key={index} obj={post}></Post>
    )
  };


  return (
    <div className="app__dashboard">
      <Nav handleClickOpen={handleClickOpen}></Nav>
      <PostModal open={open} handleClickOpen={handleClickOpen} handleClose={handleClose} handlePostUpdate={handlePostUpdate}></PostModal>
      <div className="container">
        {renderPosts()}
      </div>
    </div>
  )
}

export default connect()(Dashboard);