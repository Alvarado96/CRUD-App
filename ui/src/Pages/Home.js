import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
//import Post from './Post';
import './Posts.css'
import './Post.css'

const Home = () => {
    let [posts, setPosts] = useState([]);
    let { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        fetch(`http://localhost:8082/posts/${id}`)
        .then(response => response.json())
        .then(data => setPosts(data))
        .catch(err => console.log(err))
    })

    const clickHandler = () => {
        navigate(`/${id}/create`)
    }

    const clickView = (post_id) => {
        navigate(`/${id}/blog/${post_id}`)
        //console.log(title);
    }

    return (
        <>
        <button onClick={clickHandler}>Create New Blog Post</button>
            <h1>Blogger Home</h1>
            <div className="posts-container">
                {posts.map((post, index) => {
                    return (<div key={index} className="post-container">
                    <h1 className="heading">{post.title}</h1>
                    <p maxLength='100' >{post.content}</p>
                    <button onClick={() => clickView(post.id)}>View</button>
                    </div>)
                })}
            </div>
        </>
    )
}


export default Home;