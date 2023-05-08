import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { toggleDeletePostModal } from '../../redux/slices/modal'
import { deleteUserPost, fetchPosts } from '../../redux/asyncThunks/posts'

function DeletePostModal() {
  const open = useSelector((state) => state.modal.deletePostModalOpen)
  const deletePostId = useSelector((state) => state.modal.deletePostId)
  const dispatch = useDispatch()

  const deletePost = () => {
    dispatch(deleteUserPost(deletePostId))
    dispatch(fetchPosts())
    toggleDeletePostModal()
  }

  return open ? (
    <>
      <div className={`modal-overlay ${open ? 'active' : ''}`}></div>
      <div className={`modal card ${open ? 'active' : ''}`}>
        <div className='modal-header'>
          <h2>Are you sure you want to delete that post?</h2>
          <span
            className='close'
            onClick={() => dispatch(toggleDeletePostModal(null))}
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
