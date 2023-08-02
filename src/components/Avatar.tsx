import clsx from 'clsx'

interface AvatarProps {
  color?: string
  title?: string
  onClick?: () => void
  size?: number
}

const Avatar = ({ color, title, onClick }: AvatarProps) => {
  return (
    <div
      role="img"
      className={clsx(
        !color && 'bg-gray-500',
        `${color} relative h-10 w-10 cursor-pointer overflow-hidden rounded-full border-[0.5px] border-solid border-gray-500`,
      )}
      aria-label={title ?? 'Avatar'}
      title={title ?? 'Avatar'}
      onClick={onClick}
    >
      <svg
        className="absolute -left-1 h-12 w-12 text-white"
        fill="currentColor"
        viewBox="0 0 20 20"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fillRule="evenodd"
          d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
          clipRule="evenodd"
        ></path>
      </svg>
    </div>
  )
}

export default Avatar
