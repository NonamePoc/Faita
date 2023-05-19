import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { closeEditCommentModal } from '../../redux/slices/modal'
import { editComment, getComments } from '../../redux/asyncThunks/posts'

function EditCommentModal({ postId, setComments }) {
  const open = useSelector((state) => state.modal.editCommentModalOpen)
  const comment = useSelector((state) => state.modal.editComment)
  const [content, setContent] = React.useState('')
  const dispatch = useDispatch()

  const onClickEditComment = () => {
    dispatch(editComment({ commentId: comment.commentId, content })).then(() =>
      dispatch(getComments(postId)).then((res) => {
        setComments(res.payload)
        dispatch(closeEditCommentModal())
      })
    )
  }

  const onChangeContent = (e) => {
    setContent(e.target.value)
  }

  return open ? (
    <>
      <div className={`modal-overlay ${open ? 'active' : ''}`}></div>
      <div className={`modal card ${open ? 'active' : ''}`}>
        <div className='modal-header'>
          <h2>Edit Comment 🖋</h2>
          <span
            className='close'
            onClick={() => dispatch(closeEditCommentModal())}
          >
            &times;
          </span>
        </div>
        <div className='modal-body'>
          <span>Content</span>
          <textarea
            type='text'
            defaultValue={comment.content}
            onChange={onChangeContent}
          />
        </div>
        <button className='btn danger' onClick={onClickEditComment}>
          Save changes 📝
        </button>
      </div>
    </>
  ) : null
}

export default EditCommentModal
