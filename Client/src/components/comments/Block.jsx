import React from 'react'
import truncateDate from '../../utils/truncateDate'
import { useSelector, useDispatch } from 'react-redux'
import {
  openDeleteCommentModal,
  openEditCommentModal,
} from '../../redux/slices/modal'

function Block({ comment }) {
  const { userName } = useSelector((state) => state.user)
  const dispatch = useDispatch()

  const onClickDelete = () => {
    dispatch(openDeleteCommentModal(comment.commentId))
  }

  const onClickEdit = () => {
    dispatch(openEditCommentModal(comment))
  }

  return (
    <div className='comment'>
      <div className='comment__info'>
        <img className='comment__avatar' src={comment.avatar} alt='avatar' />
        <div>
          <h1 className='comment__info__name'>{comment.userName}</h1>
          <p className='comment__info__date'>
            {truncateDate(comment.createdAt)}
          </p>
        </div>
        {userName === comment.userName ? (
          <ul className='comment__actions'>
            <li>
              <svg
                onClick={onClickEdit}
                className='comment__svg__edit'
                width='64px'
                height='64px'
                viewBox='0 -0.5 21 21'
                version='1.1'
                xmlns='http://www.w3.org/2000/svg'
              >
                <g id='SVGRepo_bgCarrier' strokeWidth='0'></g>
                <g
                  id='SVGRepo_tracerCarrier'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                ></g>
                <g id='SVGRepo_iconCarrier'>
                  <g
                    id='Page-1'
                    stroke='none'
                    strokeWidth='1'
                    fill='none'
                    fillRule='evenodd'
                  >
                    <g
                      id='DribbbleLight-Preview'
                      transform='translate(-339.000000, -800.000000)'
                    >
                      <g
                        id='icons'
                        transform='translate(56.000000, 160.000000)'
                      >
                        <path d='M286.15,654 C285.5704,654 285.1,653.552 285.1,653 L285.1,647 C285.1,646.448 285.5704,646 286.15,646 C286.7296,646 287.2,645.552 287.2,645 C287.2,644.448 286.7296,644 286.15,644 L285.1,644 C283.93975,644 283,644.895 283,646 L283,654 C283,655.105 283.93975,656 285.1,656 L286.15,656 C286.7296,656 287.2,655.552 287.2,655 C287.2,654.448 286.7296,654 286.15,654 M301.9,644 L294.55,644 C293.9704,644 293.5,644.448 293.5,645 C293.5,645.552 293.9704,646 294.55,646 L300.85,646 C301.4296,646 301.9,646.448 301.9,647 L301.9,653 C301.9,653.552 301.4296,654 300.85,654 L294.55,654 C293.9704,654 293.5,654.448 293.5,655 C293.5,655.552 293.9704,656 294.55,656 L301.9,656 C303.06025,656 304,655.105 304,654 L304,646 C304,644.895 303.06025,644 301.9,644 M293.5,659 C293.5,659.552 293.0296,660 292.45,660 L288.25,660 C287.6704,660 287.2,659.552 287.2,659 C287.2,658.448 287.6704,658 288.25,658 L289.3,658 L289.3,642 L288.25,642 C287.6704,642 287.2,641.552 287.2,641 C287.2,640.448 287.6704,640 288.25,640 L292.45,640 C293.0296,640 293.5,640.448 293.5,641 C293.5,641.552 293.0296,642 292.45,642 L291.4,642 L291.4,658 L292.45,658 C293.0296,658 293.5,658.448 293.5,659'></path>
                      </g>
                    </g>
                  </g>
                </g>
              </svg>
            </li>
            <li>
              <svg
                onClick={onClickDelete}
                className='comment__svg__delete'
                width='64px'
                height='64px'
                viewBox='0 0 24 24'
                fill='none'
                xmlns='http://www.w3.org/2000/svg'
              >
                <g id='SVGRepo_bgCarrier' strokeWidth='0'></g>
                <g
                  id='SVGRepo_tracerCarrier'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                ></g>
                <g id='SVGRepo_iconCarrier'>
                  <path
                    d='M4 7H20'
                    strokeWidth='2'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                  ></path>
                  <path
                    d='M6 7V18C6 19.6569 7.34315 21 9 21H15C16.6569 21 18 19.6569 18 18V7'
                    strokeWidth='2'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                  ></path>
                  <path
                    d='M9 5C9 3.89543 9.89543 3 11 3H13C14.1046 3 15 3.89543 15 5V7H9V5Z'
                    strokeWidth='2'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                  ></path>
                </g>
              </svg>
            </li>
          </ul>
        ) : (
          <div></div>
        )}
        <div></div>
        <div className='comment__content'>
          <p>{comment.content}</p>
        </div>
      </div>
    </div>
  )
}

export default Block
