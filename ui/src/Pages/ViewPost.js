import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './Posts.css';

const ViewPost = () => {
    let [posts, setPosts] = useState([]);
    let { userid, blogid} = useParams();
    let [isToggled, setIsToggled] = useState(false);
    let [input, setInput] = useState({
        title: "",
        content: ""
    });
    const navigate = useNavigate();

    useEffect(() => {
        fetch(`http://localhost:8082/${userid}/blog/${blogid}`)
        .then(response => response.json())
        .then(data => {
            setPosts(data);
        })
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
        setInput(posts[0])
    }

    const handleChange = (e) => {
        const { id, innerText } = e.target
        
        console.log('id', id);
        console.log('value', innerText)
        setInput((currentState) => ({
            ...currentState,
            [id]: innerText,
        }));
        console.log("After set input", input);
        e.preventDefault();
    }

    const handleSubmit = async (event) => {
        
        console.log("input", input.title)
        console.log("content", input.content)
        //console.log(posts[0])
        event.preventDefault()
        
        let res = await fetch(`http://localhost:8082/${userid}/blog/${blogid}`, {
            method: "PATCH",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(input)
        });
       console.log('Submitted successfully!')
       console.log(res)
       //navigate(lastLocation)

    }

    
  
    return (
        <>
            <button onClick={handleToggle}>Edit</button>
            <h1>Blogger Home</h1>
            <div className="posts-container">
                {posts.map((post, index) => {
                    
                    return (<div key={index} className="post-container">
                    <h1 onInput={handleChange} id="title" suppressContentEditableWarning={true} contentEditable={isToggled} className="heading">{post.title}</h1>
                    <p onInput={handleChange} id="content" suppressContentEditableWarning={true} contentEditable={isToggled}>{post.content}</p>
                    
                    {isToggled ? <button onClick={handleSubmit}>Submit</button>: <button onClick={() => deleteClick(post.id)}>Delete</button>}
                    </div>)
                })}
            </div>

            <button onClick={clickHandler}>Back</button>
            
        </>
    )
}

export default ViewPost;