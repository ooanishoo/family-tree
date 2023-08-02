import { IMember } from '@/types/IMember'
import clsx from 'clsx'
import { Person, Spouse } from '@/components/Person'

interface FamilyTreeProps {
  rootMember: IMember
  level?: number
}

const FamilyTree = ({ rootMember, level = 0 }: FamilyTreeProps) => {
  return (
    <div
      key={rootMember.name}
      data-testid={level === 0 ? 'family-tree-root' : undefined}
      className={clsx(
        'flex flex-col justify-center',
        level > 0 && 'self-start',
        'gap-24',
      )}
    >
      <div className="flex justify-center items-center">
        <Person member={rootMember} />
        {rootMember.spouse ? <Spouse member={rootMember.spouse} /> : null}
      </div>
      <div className="flex flex-row gap-20">
        {rootMember.children.map((member) => (
          <FamilyTree rootMember={member} level={level + 1} key={member.name} />
        ))}
      </div>
    </div>
  )
}

export default FamilyTree
