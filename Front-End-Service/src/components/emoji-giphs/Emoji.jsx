import React from 'react'
import { useSelector } from 'react-redux'
import data from '@emoji-mart/data'
import Picker from '@emoji-mart/react'
import usePopup from '../../hooks/usePopup'

const Emoji = React.memo(function Emoji({ handleEmojiSelect }) {
  const { isOpen, togglePopup } = usePopup()
  const { theme } = useSelector((state) => state.theme)

  return (
    <div>
      <div
        className={`pop emoji-gif__wrapper replie-input  ${
          isOpen ? 'open' : ''
        } `}
      >
        <Picker
          data={data}
          onEmojiSelect={handleEmojiSelect}
          previewPosition={'none'}
          theme={theme}
          maxFrequentRows={2}
          perLine={8}
        />
      </div>
      <button
        onClick={togglePopup}
        className='emoji__btn'
        aria-label='choose emoji'
      >
        <svg
          width='28'
          height='28'
          viewBox='0 0 28 28'
          fill='none'
          xmlns='http://www.w3.org/2000/svg'
        >
          <path
            d='M8.63325 16.5668C9.14709 16.1813 9.87537 16.284 10.2629 16.7952L10.2683 16.8021C10.2753 16.8109 10.2885 16.8273 10.3078 16.8503C10.3464 16.8964 10.4091 16.9682 10.4946 17.0575C10.6664 17.2368 10.9247 17.4801 11.259 17.7232C11.9323 18.2128 12.863 18.6668 13.9999 18.6668C15.1368 18.6668 16.0676 18.2128 16.7407 17.7232C17.0752 17.4801 17.3334 17.2368 17.5053 17.0575C17.5907 16.9682 17.6534 16.8964 17.692 16.8503C17.7114 16.8273 17.7246 16.8109 17.7315 16.8021L17.737 16.7952C18.1244 16.284 18.8528 16.1813 19.3666 16.5668C19.882 16.9533 19.9865 17.6846 19.5999 18.2001L19.5987 18.2016C19.4738 18.3674 19.3333 18.5222 19.1899 18.6719C18.9425 18.9301 18.5809 19.2701 18.1132 19.6103C17.1823 20.2873 15.7796 21.0001 13.9999 21.0001C12.2201 21.0001 10.8176 20.2873 9.88663 19.6103C9.41891 19.2701 9.05735 18.9301 8.80994 18.6719C8.66696 18.5227 8.52734 18.3684 8.40243 18.2034C8.01914 17.6941 8.12256 16.9498 8.63325 16.5668Z'
            fill='#9BA9BA'
          />
          <path
            d='M12.25 10.5C12.25 11.4665 11.4665 12.25 10.5 12.25C9.5335 12.25 8.75 11.4665 8.75 10.5C8.75 9.5335 9.5335 8.75 10.5 8.75C11.4665 8.75 12.25 9.5335 12.25 10.5Z'
            fill='#9BA9BA'
          />
          <path
            d='M17.5 12.25C18.4665 12.25 19.25 11.4665 19.25 10.5C19.25 9.5335 18.4665 8.75 17.5 8.75C16.5335 8.75 15.75 9.5335 15.75 10.5C15.75 11.4665 16.5335 12.25 17.5 12.25Z'
            fill='#9BA9BA'
          />
          <path
            fillRule='evenodd'
            clipRule='evenodd'
            d='M14 1.16667C6.91235 1.16667 1.16667 6.91235 1.16667 14C1.16667 21.0876 6.91235 26.8333 14 26.8333C21.0876 26.8333 26.8333 21.0876 26.8333 14C26.8333 6.91235 21.0876 1.16667 14 1.16667ZM3.50001 14C3.50001 8.20102 8.20102 3.50001 14 3.50001C19.799 3.50001 24.5 8.20102 24.5 14C24.5 19.799 19.799 24.5 14 24.5C8.20102 24.5 3.50001 19.799 3.50001 14Z'
            fill='#9BA9BA'
          />
        </svg>
      </button>
    </div>
  )
})

export default Emoji
