import clsx from 'clsx'

interface AvatarProps {
  color?: string
  title?: string
  onClick?: () => void
  size?: number
  isDescendant?: boolean
}

const Avatar = ({
  color,
  title,
  onClick,
  isDescendant = true,
}: AvatarProps) => {
  return (
    <span
      role="img"
      aria-label={title ?? 'Avatar'}
      title={title ?? 'Avatar'}
      onClick={onClick}
      className={clsx(
        !color && 'bg-gray-500',
        `${color} inline-block relative h-10 w-10 cursor-pointer overflow-hidden rounded-full  border-[0.5px] border-solid border-gray-500`,
        isDescendant && 'ring-4 ring-slate-300',
      )}
    >
      <svg
        className="absolute w-12 h-12 text-white -left-1"
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
    </span>
  )
}

export default Avatar
