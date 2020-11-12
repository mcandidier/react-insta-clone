import React, { useEffect, useState } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Icon from '@material-ui/core/Icon';

import { likePost } from '../actions';

import moment from 'moment';

function Post({obj}){
  console.log(obj);
    const [post, setPost ] = useState(obj);
    const baseUrl = 'http://localhost:8000';
    const timestamp = moment(post.timestamp, "YYYYMMDD").fromNow();
    const user = {'id': 1 };

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

    return (
        <div className="app__post">
            <header>
                <Avatar>{post.username.slice(0, 1)}</Avatar>
            <h4><a href="">{post.username}</a></h4>
            </header>
            <div className="content">
                <section class="img-section">
                    <img src={baseUrl+post.image}/>
                </section>

                <section className="actions">
                    <div className="like">
                        <Icon fontSize="24" 
                              className={post.is_like?'':'material-icons-outlined'}
                              onClick={handleLike}>thumb_up</Icon>
                    </div>
                    <div className="bookmark">
                        <Icon fontSize="24">bookmark_border</Icon>
                    </div>
                </section>
                <section className="info">
                    <strong>{post.username} </strong><span>
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

export default Post;