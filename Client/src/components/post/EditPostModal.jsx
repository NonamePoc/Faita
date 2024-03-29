import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { closeEditPostModal } from '../../redux/slices/modal'
import {
  editPost,
  fetchUserPosts,
  fetchUserReposts,
  fetchRandomPosts,
} from '../../redux/asyncThunks/posts'
import { checkValidMedia } from '../../utils/checkValidMedia'

function EditPostModal() {
  const open = useSelector((state) => state.modal.editPostModalOpen)
  const post = useSelector((state) => state.modal.editPost)
  const { userName } = useSelector((state) => state.user)
  const [data, setData] = React.useState({
    content: post?.content || '',
    imageUrl: post?.imageUrl || '',
    videoUrl: post?.videoUrl || '',
    audioUrl: post?.audioUrl || '',
  })
  const [error, setError] = React.useState(null)
  const dispatch = useDispatch()

  const onClickEditPost = () => {
    if (data.imageUrl || data.videoUrl || data.audioUrl) {
      checkValidMedia(data, (isValid) => {
        isValid ? onEditPost() : setError('⚠ Invalid media url')
      })
    } else {
      onEditPost()
    }
  }

  const onEditPost = () => {
    dispatch(editPost({ postId: post.postId, data })).then(() =>
      dispatch(fetchUserPosts(userName)).then(() =>
        dispatch(fetchUserReposts(userName)).then(() =>
          dispatch(fetchRandomPosts(7)).then(() =>
            dispatch(closeEditPostModal())
          )
        )
      )
    )
  }

  const onChangeData = (e) => {
    setError(null)
    setData({ ...data, [e.target.name]: e.target.value })
  }

  return open ? (
    <>
      <div className={`modal-overlay ${open ? 'active' : ''}`}></div>
      <div className={`modal card ${open ? 'active' : ''}`}>
        <div className='modal-header'>
          <h2>Edit post 🖋</h2>
          <span
            className='close'
            onClick={() => dispatch(closeEditPostModal())}
          >
            &times;
          </span>
        </div>
        <div className='modal-body'>
          <span>Content</span>
          <textarea
            type='text'
            name='content'
            defaultValue={post.content}
            onChange={onChangeData}
          />
          <span>Image Url</span>
          <textarea
            type='text'
            name='imageUrl'
            defaultValue={post.imageUrl}
            onChange={onChangeData}
          />

          <span>Video Url</span>
          <textarea
            type='text'
            name='videoUrl'
            defaultValue={post.videoUrl}
            onChange={onChangeData}
          />
          <span>Audio Url</span>
          <textarea
            type='text'
            name='audioUrl'
            defaultValue={post.audioUrl}
            onChange={onChangeData}
          />
        </div>
        <p className={`error-span ${error && 'active'}`}>{error}</p>
        <button className='btn danger' onClick={onClickEditPost}>
          Save changes 📝
        </button>
      </div>
    </>
  ) : null
}

export default EditPostModal
