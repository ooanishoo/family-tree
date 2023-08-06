import { Person } from '@/components/Person'
import { IMember } from '@/types/IMember'

interface SubFamilyTreeProps {
  rootMember: IMember
  level?: number
}

const SubFamilyTree = ({ rootMember, level = 0 }: SubFamilyTreeProps) => {
  const renderCouple = () => (
    <div className="border-solid border-gray-300 border-[1px] py-2 px-3 min-w-[80px] rounded-md inline-block">
      <Person member={rootMember} />
      <span className="inline-block w-2"></span>
      <Person member={rootMember?.spouse} />
    </div>
  )

  const renderChildren = () => (
    <ul
      key={rootMember.name}
      className="pt-14 relative flex flex-row items-baseline justify-center"
    >
      {rootMember.children.map((member) => (
        <SubFamilyTree
          rootMember={member}
          level={level + 1}
          key={member.name}
        />
      ))}
    </ul>
  )

  return (
    <li className="float-left list-none relative pt-14 pr-4 pl-1">
      {renderCouple()}
      {rootMember.children.length > 0 && renderChildren()}
    </li>
  )
}

const FamilyTree = ({ rootMember }: { rootMember: IMember }) => {
  return (
    <div className="tree whitespace-nowrap" data-testid="family-tree-root">
      <ul className="relative flex flex-row items-baseline justify-center">
        <SubFamilyTree rootMember={rootMember} />
      </ul>
    </div>
  )
}

export default FamilyTree
