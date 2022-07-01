import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './Posts.css';

const ViewPost = () => {
    let [posts, setPosts] = useState([]);
    let { userid, blogid} = useParams();
    let [isToggled, setIsToggled] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        fetch(`http://localhost:8082/${userid}/blog/${blogid}`)
        .then(response => response.json())
        .then(data => setPosts(data))
        .catch(err => console.log(err))
    })

    const clickHandler = () => {
        navigate(`/home/${userid}`)
    }

    const deleteClick = async (post_id) => {
        console.log(post_id);
        await fetch(`http://localhost:8082/${userid}/blog/${blogid}`, { method: 'DELETE' })
            .then(() => console.log('Delete successful'))
            navigate(`/home/${userid}`)
    }

    const handleToggle = () => {
        setIsToggled(!isToggled)
    }

    return (
        <>
            <button onClick={handleToggle}>Edit</button>
            <h1>Blogger Home</h1>
            <div className="posts-container">
                {posts.map((post, index) => {
                    return (<div key={index} className="post-container">
                    <h1 suppressContentEditableWarning={true} contentEditable={isToggled} className="heading">{post.title}</h1>
                    <p suppressContentEditableWarning={true} contentEditable={isToggled}>{post.content}</p>
                    
                    {isToggled ? <button>Submit</button>: <button onClick={() => deleteClick(post.id)}>Delete</button>}
                    </div>)
                })}
            </div>

            <button onClick={clickHandler}>Back</button>
            
        </>
    )
}

export default ViewPost;