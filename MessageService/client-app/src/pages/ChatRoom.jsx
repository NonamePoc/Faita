import React from 'react'
import { Emoji } from '../components'

function ChatRoom() {
  return (
    <div className='chatroom'>
      <div className='card chatroom__header'>
        <svg
          width='45'
          height='45'
          viewBox='0 0 45 45'
          fill='none'
          xmlns='http://www.w3.org/2000/svg'
        >
          <path
            opacity='0.4'
            d='M41.25 22.5C41.25 12.1448 32.8552 3.75 22.5 3.75C12.1447 3.75 3.75 12.1448 3.75 22.5C3.75 32.8553 12.1447 41.25 22.5 41.25C32.8552 41.25 41.25 32.8553 41.25 22.5Z'
            fill='#9BA9BA'
          />
          <path
            d='M20.5686 15.8822L14.9436 21.5072C14.3999 22.0509 14.3999 22.9509 14.9436 23.4947L20.5686 29.1198C21.1123 29.6635 22.0123 29.6635 22.5561 29.1198C23.0998 28.576 23.0998 27.676 22.5561 27.1323L19.3311 23.9072H29.0623C29.8311 23.9072 30.4686 23.2697 30.4686 22.5009C30.4686 21.7322 29.8311 21.0947 29.0623 21.0947H19.3311L22.5561 17.8697C22.8373 17.5884 22.9686 17.2322 22.9686 16.8759C22.9686 16.5197 22.8373 16.1634 22.5561 15.8822C22.0123 15.3384 21.1123 15.3384 20.5686 15.8822Z'
            fill='#2176E6'
          />
        </svg>
        <img
          className='chatroom__header__img'
          src='https://horizondatasys.com/wp-content/uploads/2018/01/Dark-Gray-Square.png'
          alt='profile-img'
        />
        <div className='chatroom__header__info'>
          <h1 className='name'>Name</h1>
          <div className='status'>
            <div className='statusCircle'></div>
            <p className='status__text'>online</p>
          </div>
        </div>
        <svg
          width='30'
          height='30'
          viewBox='0 0 30 30'
          fill='none'
          xmlns='http://www.w3.org/2000/svg'
        >
          <g clipPath='url(#clip0_5_170)'>
            <path
              fillRule='evenodd'
              clipRule='evenodd'
              d='M26.2903 14.9812C26.2903 16.0158 25.4498 16.8562 24.4153 16.8562C23.3803 16.8562 22.5403 16.0158 22.5403 14.9812C22.5403 13.9462 23.3803 13.1062 24.4153 13.1062C25.4498 13.1062 26.2903 13.9462 26.2903 14.9812Z'
              fill='#9BA9BA'
            />
            <path
              fillRule='evenodd'
              clipRule='evenodd'
              d='M7.54028 14.9812C7.54028 16.0158 6.69981 16.8562 5.66528 16.8562C4.63028 16.8562 3.79028 16.0158 3.79028 14.9812C3.79028 13.9462 4.63028 13.1062 5.66528 13.1062C6.69981 13.1062 7.54028 13.9462 7.54028 14.9812Z'
              fill='#9BA9BA'
            />
            <path
              fillRule='evenodd'
              clipRule='evenodd'
              d='M16.9153 14.9812C16.9153 16.0158 16.0748 16.8562 15.0403 16.8562C14.0053 16.8562 13.1653 16.0158 13.1653 14.9812C13.1653 13.9462 14.0053 13.1062 15.0403 13.1062C16.0748 13.1062 16.9153 13.9462 16.9153 14.9812Z'
              fill='#9BA9BA'
            />
          </g>
          <defs>
            <clipPath id='clip0_5_170'>
              <rect width='30' height='30' fill='white' />
            </clipPath>
          </defs>
        </svg>
      </div>
      <div className='chatroom__chat'></div>
      <fieldset className='card chatroom__field'>
        <input
          className='chatroom__field__input'
          placeholder='Write something...'
        />
        <Emoji />
        <button className='send-btn'>
          <svg
            width='20'
            height='20'
            viewBox='0 0 20 20'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'
          >
            <g clipPath='url(#clip0_116_448)'>
              <path
                d='M18.5938 0.12501L0.488285 10.5703C-0.218746 10.9766 -0.128902 11.9609 0.574223 12.2578L4.72657 14L15.9492 4.10939C16.1641 3.91798 16.4688 4.21095 16.2852 4.4336L6.875 15.8984V19.043C6.875 19.9649 7.98829 20.3281 8.53516 19.6602L11.0156 16.6406L15.8828 18.6797C16.4375 18.9141 17.0703 18.5664 17.1719 17.9688L19.9844 1.09376C20.1172 0.304698 19.2695 -0.265615 18.5938 0.12501Z'
                fill='white'
              />
            </g>
            <defs>
              <clipPath id='clip0_116_448'>
                <rect width='20' height='20' fill='white' />
              </clipPath>
            </defs>
          </svg>
        </button>
      </fieldset>
    </div>
  )
}

export default ChatRoom
