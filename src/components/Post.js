import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import Avatar from '@material-ui/core/Avatar';
import Icon from '@material-ui/core/Icon';

import { likePost } from '../actions';

import moment from 'moment';
import CONFIG from '../config';


function Post(props){
    const {obj} = props;
    const [post, setPost ] = useState(obj);
    const [toDetail, setToDetail] = useState(false);
    const timestamp = moment(post.timestamp, "YYYYMMDD").fromNow();

    useEffect(() => {
      setPost(obj);
    }, [obj]);


    //todo: needs to optimize, move to utils
    const handleLike = async () => {
      let action = post.is_like? 'unlike': 'like';
      const data = {'id': post.id, 'action': action}
      try {
        const res = await likePost(data);
        setPost({...obj, 'is_like': !post.is_like});
      } catch (error) {
      }
    }

    const gotoPost = () => {
      setToDetail(true);
    }

    const username = post.user.username ? post.user.username : post.user.email;
    if(toDetail) {
      return <Redirect to={`p/${post.id}/`} />
    }

    return (
        <div className="app__post" onClick={gotoPost}>
            <header>
                <Avatar alt={username} src={CONFIG.apiHost+post.user.profile_photo}>{username.slice(0, 1)}</Avatar>
            <h4>{username}</h4>
            </header>
            <div className="content">
                <section class="img-section">
                    <img src={CONFIG.apiHost+post.image}/>
                </section>
                <section className="actions">
                    <div className="like">
                        <Icon fontSize="default" 
                              onClick={handleLike}>{post.is_like ? 'favorite': 'favorite_outlined'}</Icon>
                    </div>
                    <div className="bookmark">
                        <Icon fontSize="default">bookmark_border</Icon>
                    </div>
                </section>
                <section className="info">
                    <strong>{post.user.username} </strong><span>
                    {post.description}
                    </span>
                    <p>
                        <small className="timestamp">{timestamp}</small>
                    </p>
                </section>
            </div>
        </div>
    )
}

const mapStateToProps = (state, ownProps) => {
  return {}
}

export default connect(mapStateToProps, {})(Post);