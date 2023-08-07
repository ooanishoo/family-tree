import { Person } from '@/components/Person'
import { IMember } from '@/types/IMember'
import { useFamilyTree } from './FamilyTreeProvider'

interface SubFamilyTreeProps {
  rootMember: IMember
  level?: number
}

const SubFamilyTree = ({ rootMember, level = 0 }: SubFamilyTreeProps) => {
  const renderCouple = () => (
    <div className="border-solid border-gray-300 border p-2 rounded-md inline-block">
      <Person member={rootMember} />
      <Person member={rootMember?.spouse} isDescendant={level === 0 && true} />
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
    <li className="float-left list-none relative pt-14 px-2">
      {renderCouple()}
      {rootMember.children.length > 0 && renderChildren()}
    </li>
  )
}

const FamilyTree = () => {
  const { root } = useFamilyTree()

  return (
    <div className="tree whitespace-nowrap" data-testid="family-tree-root">
      <ul className="relative flex flex-row items-baseline justify-center">
        <SubFamilyTree rootMember={root} />
      </ul>
    </div>
  )
}

export default FamilyTree
