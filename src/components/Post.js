import React, { useEffect, useState } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Icon from '@material-ui/core/Icon';

import { likePost } from '../actions';

import moment from 'moment';
import CONFIG from '../config';
import { connect } from 'react-redux';


function Post({obj}){
    const [post, setPost ] = useState(obj);
    const timestamp = moment(post.timestamp, "YYYYMMDD").fromNow();

    useEffect(() => {
      setPost(obj);
    }, [obj]);

    const handleLike = async () => {
      let action = post.is_like? 'unlike': 'like';
      const data = {'id': post.id, 'action': action}
      try {
        const res = await likePost(data);
        setPost({...obj, 'is_like': !post.is_like});
      } catch (error) {
      }
    }

    const username = post.user.username ? post.user.username : post.user.email;
    return (
        <div className="app__post">
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
                        <Icon fontSize="24" 
                              onClick={handleLike}>{post.is_like ? 'favorite': 'favorite_outlined'}</Icon>
                    </div>
                    <div className="bookmark">
                        <Icon fontSize="24">bookmark_border</Icon>
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

export default connect(null, {})(Post);