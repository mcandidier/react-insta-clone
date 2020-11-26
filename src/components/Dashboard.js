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
import { getPosts } from '../redux/posts/actions';


function Dashboard(props) {
  const {posts} = props;
  const renderPosts = () => {
    return posts.map((post, index) => 
      <Post key={index} obj={post}></Post>
    )
  };

  return (
    <div className="app__dashboard">
      <div className="container">
          {renderPosts()}
      </div>
    </div>
  )
}

const mapStateToProps = (state) => {
  const { posts } = state;
  return {
    posts
  }
}

const mapDispatchToProps = (dispatch) => {
  dispatch(getPosts());
}

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);