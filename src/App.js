import React, { useEffect, useState } from 'react';
import Nav from './components/Nav';
import Post from './components/Post';


import './App.css';

import API from './api';

function App() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
      const fetchData = async () => {  
          const res = await API.get('posts/');
          console.log(res);
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
      <Nav></Nav>
      <div className="container">
        {renderItems()};
      </div>
    </div>
  )
}

export default App;
