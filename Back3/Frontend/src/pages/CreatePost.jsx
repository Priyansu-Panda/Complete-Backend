import React from 'react'
import { useState } from 'react'
import axios from "axios"
import { useNavigate } from 'react-router-dom'

const CreatePost = () => {

    // const [image, setImage] = useState(null)
    // const [caption, setCaption] = useState("")

    const navigate = useNavigate();
    const handleSubmit = async (e)=>{
        e.preventDefault();

        const formData = new FormData(e.target);
        // const formData = new FormData();
        // formData.append("image", image);
        // formData.append("caption", caption); 
        // console.log(formData)

        // const response = await axios.post("http://localhost:3000/create-post", formData)
        // console.log(response.data);
        await axios.post("http://localhost:3000/create-post", formData)
                        .then((res)=>{
                            // console.log(res.data)
                            navigate("/feed")
                        });

        e.target.reset();
        
        // setImage(null);
        // setCaption("");
        
    }
  return (
    <section className="create-post-section">
        <h1>Create Post</h1>

        <form onSubmit={handleSubmit}>
            <input type="file" name="image" accept="image/*"/>
            <input type="text" name="caption" placeholder="Enter Caption Reqd." />
            <button type="submit">Create Post</button>
        </form>
    </section>
  )
}

export default CreatePost