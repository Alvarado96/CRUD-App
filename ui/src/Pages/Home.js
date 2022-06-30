import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const Home = () => {
    let [posts, setPosts] = useState([]);
    let { id } = useParams();

    useEffect(() => {
        fetch(`http://localhost:8082/posts/${id}`)
        .then(response => response.json())
        .then(data => setPosts(data))
        .catch(err => console.log(err))
    })
    return (
        <>
            <h1>Blogger Home</h1>
            <ul>
                {posts.map((post) => {
                    return (<li key="{post.id}"> {post.title} </li>)
                })}
            </ul>
        </>
    )
}


export default Home;