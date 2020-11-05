import React, { useState, useEffect } from 'react';
import Avatar from '@material-ui/core/Avatar';

import Icon from '@material-ui/core/Icon';

import moment from 'moment';

function Post({post}){
    const baseUrl = 'http://localhost:8000';
    const timestamp = moment(post.timestamp, "YYYYMMDD").fromNow();

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
                        <Icon fontSize="24">thumb_up_alt</Icon>
                    </div>
                    <div className="bookmark">
                        <Icon fontSize="24">bookmark_bord</Icon>
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