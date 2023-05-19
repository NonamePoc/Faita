import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { closeDeleteCommentModal } from '../../redux/slices/modal'
import {
  deleteUserComment,
  fetchUserPosts,
  getComments,
} from '../../redux/asyncThunks/posts'

function DeleteCommentModal({ postId, setComments }) {
  const open = useSelector((state) => state.modal.deleteCommentModalOpen)
  const deleteCommentId = useSelector((state) => state.modal.deleteCommentId)
  const { userName } = useSelector((state) => state.user)
  const dispatch = useDispatch()

  const deleteComment = () => {
    dispatch(deleteUserComment(deleteCommentId)).then(() =>
      dispatch(fetchUserPosts(userName)).then(() =>
        dispatch(getComments(postId)).then((res) => {
          setComments(res.payload)
          dispatch(closeDeleteCommentModal())
        })
      )
    )
  }
  return open ? (
    <>
      <div className={`modal-overlay ${open ? 'active' : ''}`}></div>
      <div className={`modal card ${open ? 'active' : ''}`}>
        <div className='modal-header'>
          <h2>Delete Comment ❌</h2>
          <span
            className='close'
            onClick={() => dispatch(closeDeleteCommentModal())}
          >
            &times;
          </span>
        </div>
        <div className='modal-body'>
          <p> This action cannot be undone.</p>
        </div>
        <button className='btn danger' onClick={deleteComment}>
          Yes, delete it 🧺
        </button>
      </div>
    </>
  ) : null
}

export default DeleteCommentModal
