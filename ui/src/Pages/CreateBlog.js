import React from 'react';
import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
const CreateBlog = () => {
    let navigate = useNavigate();
    let { id } = useParams();

    const [blogInfo, setBlogInfo] = useState({
            id_user: parseInt(id),
            title: '',
            content: ''
    })

    const handleBlogInfoChange = (e) => {
        const { id, value } = e.target
        console.log('id', id);
        console.log('value', value)
        setBlogInfo((currentState) => ({
            ...currentState,
            [id]: value,
        }));
        console.log(blogInfo);
    }

    const handleSubmit = async (event) => { //make on Submit button for post request, return back to page to see updated info
        event.preventDefault()
        let res = await fetch('http://localhost:8082/blogs', {
          method: "POST",
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(blogInfo)
        })
        
        navigate(`/home/${id}`);
        console.log(res);
        
    }

    return (
        <>
        <div>
            <form onSubmit = {handleSubmit}>
                <label>Title : </label>
                <input type="textarea" 
                    name="textValue"
                    id='title'
                    onChange={handleBlogInfoChange}
                />
                <label>Blog Post : </label>
                <textarea id='content' onChange={handleBlogInfoChange}/>
                
                <div><button>Submit Blog Post</button></div>

            </form>
            </div>
        </>
      );
}

export default CreateBlog;