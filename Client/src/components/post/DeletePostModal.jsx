import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { closeDeletePostModal } from '../../redux/slices/modal'
import {
  deleteUserPost,
  fetchRandomPosts,
  fetchUserPosts,
  fetchUserReposts,
} from '../../redux/asyncThunks/posts'

function DeletePostModal() {
  const open = useSelector((state) => state.modal.deletePostModalOpen)
  const deletePostId = useSelector((state) => state.modal.deletePostId)
  const { userName } = useSelector((state) => state.user)
  const dispatch = useDispatch()

  const deletePost = () => {
    dispatch(deleteUserPost(deletePostId)).then(() =>
      dispatch(fetchUserPosts(userName)).then(() =>
        dispatch(fetchUserReposts(userName)).then(() =>
          dispatch(fetchRandomPosts(7)).then(() =>
            dispatch(closeDeletePostModal())
          )
        )
      )
    )
  }

  return open ? (
    <>
      <div className={`modal-overlay ${open ? 'active' : ''}`}></div>
      <div className={`modal card ${open ? 'active' : ''}`}>
        <div className='modal-header'>
          <h2>Delete post ❌</h2>
          <span
            className='close'
            onClick={() => dispatch(closeDeletePostModal())}
          >
            &times;
          </span>
        </div>
        <div className='modal-body'>
          <p> This action cannot be undone.</p>
        </div>
        <button className='btn danger' onClick={deletePost}>
          Yes, delete it 🧺
        </button>
      </div>
    </>
  ) : null
}

export default DeletePostModal
