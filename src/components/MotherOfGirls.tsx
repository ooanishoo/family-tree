import clsx from 'clsx'
import Avatar from './Avatar'
import { useFamilyTree } from './FamilyTreeProvider'
import { Gender } from '@/types/Gender'

const MotherOfGirls = () => {
  const { familyTree } = useFamilyTree()
  const result = familyTree.mothersWithMostGirlChildren()

  return (
    <div className="flex flex-col gap-6">
      <p className=" text-gray-500">Mother/s with most girl children:</p>
      {result.map((member) => (
        <div
          className="flex items-center space-x-4"
          key={member.name}
          data-testid="card-member"
        >
          <div className="flex-shrink-0 ">
            <Avatar
              color={clsx(
                member.gender === Gender.FEMALE && 'bg-female',
                member.gender === Gender.MALE && 'bg-male',
              )}
              title={member.name}
            />
          </div>
          <div className="min-w-0 flex-1 ">
            <p className="m-0 text-lg  text-gray-700">{member.name}</p>
            <p className=" m-0 text-xs text-gray-500  ">{member.gender}</p>
          </div>
        </div>
      ))}
    </div>
  )
}

export default MotherOfGirls
