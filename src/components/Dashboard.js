import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';

import { 
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
  Link,
} from 'react-router-dom';


import{
  Post,
  PostModal,
  Profile,
} from '../components';

import { getAllPosts } from '../actions';


function Dashboard(props) {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);

  // Todo: use redux for hanlding posts list

  
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
      <div className="container">
        <Router>
          <Switch>
            <Route exact path="/">
              {renderPosts()}
            </Route>
            <Route exact path="/profile/" component={Profile}/>
          </Switch>
        </Router>
          {renderPosts()}
      </div>
    </div>
  )
}

export default connect()(Dashboard);