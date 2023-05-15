import React from 'react'
import AudioPlayer from 'react-h5-audio-player'
import 'react-h5-audio-player/lib/styles.css'

function Content({ post }) {
  return (
    <div className='post__body'>
      <p>{post.content}</p>
      {post.imageUrl ? (
        <img
          className='post__image'
          loading='lazy'
          src={post.imageUrl}
          alt='post content'
        />
      ) : null}
      {post.audioUrl ? (
        <AudioPlayer
          className='post__audio'
          loading='lazy'
          src={post.audioUrl}
        />
      ) : null}

      {post.videoUrl ? (
        <div className='post__video__container'>
          <iframe
            title='Video'
            loading='lazy'
            src={`https://www.youtube.com/embed/${post.videoUrl
              .split('/')
              .pop()}`}
            className='post__video'
            allowFullScreen
          />
        </div>
      ) : null}
    </div>
  )
}

export default Content
