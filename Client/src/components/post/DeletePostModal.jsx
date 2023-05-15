import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { closeDeletePostModal } from '../../redux/slices/modal'
import {
  deleteUserPost,
  fetchPosts,
  fetchUserReposts,
} from '../../redux/asyncThunks/posts'

function DeletePostModal() {
  const open = useSelector((state) => state.modal.deletePostModalOpen)
  const deletePostId = useSelector((state) => state.modal.deletePostId)
  const { userName } = useSelector((state) => state.user)
  const dispatch = useDispatch()

  const deletePost = () => {
    dispatch(deleteUserPost(deletePostId)).then(() =>
      dispatch(fetchPosts(userName)).then(() =>
        dispatch(fetchUserReposts(userName)).then(() =>
          dispatch(closeDeletePostModal())
        )
      )
    )
  }

  return open ? (
    <>
      <div className={`modal-overlay ${open ? 'active' : ''}`}></div>
      <div className={`modal card ${open ? 'active' : ''}`}>
        <div className='modal-header'>
          <h2>Are you sure you want to delete that post?</h2>
          <span
            className='close'
            onClick={() => dispatch(closeDeletePostModal())}
          >
            &times;
          </span>
        </div>
        <div className='modal-body'>
          <button className='btn danger' onClick={deletePost}>
            Yes, delete it 🧺
          </button>
        </div>
      </div>
    </>
  ) : null
}

export default DeletePostModal
