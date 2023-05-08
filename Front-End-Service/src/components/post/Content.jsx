import React from 'react'

function Content({ post }) {
  return (
    <div className='post__body'>
      <p>{post.content}</p>
      {post.imageUrl ? (
        <img className='post__image' src={post.imageUrl} alt='post content' />
      ) : null}
    </div>
  )
}

export default Content
