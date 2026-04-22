import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'

const Feed = () => {

    const [posts, setPosts] = useState([
        {
            id: 1,
            image: 'https://thumbs.dreamstime.com/b/time-change-above-mountain-river-forest-day-night-concept-beautiful-nature-scenery-autumn-spruce-trees-shore-synevyr-154708434.jpg',
            caption: 'Beautiful sunset',

        }

    ])
    
    /*
        likes: 10,
            comments: 5,
            shares: 2,
            createdAt: '2022-01-01T12:00:00.000Z',
            updatedAt: '2022-01-01T12:00:00.000Z',
            userId: 1,
            user: {
                id: 1,
                name: 'John Doe',
                email: [EMAIL_ADDRESS],
                createdAt: '2022-01-01T12:00:00.000Z',
                updatedAt: '2022-01-01T12:00:00.000Z',
            },
    */

    useEffect(()=>{
        fetch('http://localhost:3000/posts')
        .then(res=> res.json())
        .then(data=> {
            if (data.posts) {
                setPosts(data.posts)
            }
        })
    },[])

  return (
    <section className="feed-section">
        <h1>Feed</h1>
        {/* {console.log(posts)} */}
        <div className="posts-grid">
            {
                posts.length > 0 ? (
                    posts.map(post=>(
                <div key={post._id || post.id}>
                    <img src={post.image} alt="" />
                    <p>{post.caption}</p>
                </div>
            ))
                ) : (
                    <p style={{ gridColumn: '1 / -1', textAlign: 'center', margin: '3rem 0' }}>No posts yet</p>
                )
            }
        </div>
    </section>
  )
}

export default Feed