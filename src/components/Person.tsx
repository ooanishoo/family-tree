import { IMember } from '@/types/IMember'
import { Gender } from '@/types/Gender'
import { useState } from 'react'
import AddMember from '@/components/AddMember'
import Avatar from '@/components/Avatar'

interface IPersonProps {
  member: IMember | null
  isDescendant?: boolean
}

export const Person = ({ member, isDescendant = true }: IPersonProps) => {
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [sourceMember, setSourceMember] = useState<IMember | null>(member)

  if (member === null) {
    return null
  }

  const { name, gender } = member
  const handleOnClick = () => {
    setSourceMember(member)
    setIsModalVisible(true)
  }

  return (
    <div
      className="!border-none py-1 px-2 inline-block"
      data-testid="person-container"
    >
      {isModalVisible && (
        <AddMember
          member={sourceMember as IMember}
          onSubmit={() => setIsModalVisible(false)}
        />
      )}
      <Avatar
        color={gender === Gender.MALE ? 'bg-male' : 'bg-female'}
        onClick={handleOnClick}
        title={`Avatar for ${name}`}
        isDescendant={isDescendant}
      />
      <p className="m-0 text-gray-500">{member.name}</p>
    </div>
  )
}
