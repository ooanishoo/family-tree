import { IMember } from '@/types/IMember'
import { Gender } from '@/types/Gender'
import { useState } from 'react'
import AddMember from '@/components/AddMember'
import Avatar from '@/components/Avatar'

export const Spouse = ({ member }: { member: IMember }) => {
  return (
    <>
      <svg className="w-20 h-2" data-testid="horizontal-line">
        <line
          x1="0"
          y1="1"
          x2="100%"
          y2="1"
          style={{ stroke: 'black', strokeWidth: 2 }}
        />
      </svg>
      <Person member={member} />
    </>
  )
}

export const Person = ({ member }: { member: IMember }) => {
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [sourceMember, setSourceMember] = useState<IMember>(member)
  const { name, gender } = member

  const handleOnClick = () => {
    setSourceMember(member)
    setIsModalVisible(true)
  }

  return (
    <div className="relative pb-6" data-testid="person-container">
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
      />
      <p className="absolute top-10 left-1">{name}</p>
    </div>
  )
}
