import {
  FamilyTreeProvider,
  useFamilyTree,
} from '@/components/FamilyTreeProvider'
import { Gender } from '@/types/Gender'
import { memberNames as expectedMemberNames } from '@/utils/constants'
import { render, renderHook, screen } from '@testing-library/react'
import { ReactNode } from 'react'

describe('<FamilyTreeProvider />', () => {
  beforeEach(() => {
    const TestComponent = () => {
      const { familyTree, root, memberNames } = useFamilyTree()

      const child = familyTree.addMember(
        'king shan',
        'John Doe',
        Gender.MALE,
        'CHILD',
      )
      return (
        <div data-testid="test-component">
          <div data-testid="root-name">{root.name}</div>
          <div data-testid="member-names">{memberNames?.join(', ')}</div>
          <pre data-testid="child">{JSON.stringify(child)}</pre>
        </div>
      )
    }

    render(
      <FamilyTreeProvider>
        <TestComponent />
      </FamilyTreeProvider>,
    )
  })

  it('provides the context value to its children', () => {
    const expectedChild = {
      name: 'John Doe',
      gender: 'MALE',
      spouse: null,
      children: [],
    }
    expect(screen.getByTestId('test-component')).toBeInTheDocument()
    expect(screen.getByTestId('root-name')).toHaveTextContent('king shan')
    expect(screen.getByTestId('member-names')).toHaveTextContent(
      expectedMemberNames.join(', '),
    )
    expect(screen.getByTestId('child')).toHaveTextContent(
      JSON.stringify(expectedChild),
    )
  })
})

describe('useFamilyTree()', () => {
  const wrapper = ({ children }: { children: ReactNode }) => (
    <FamilyTreeProvider>{children}</FamilyTreeProvider>
  )

  it('returns the initialState', () => {
    const {
      result: {
        current: { root, familyTree, memberNames },
      },
    } = renderHook(() => useFamilyTree(), { wrapper })

    expect(memberNames).toEqual(expectedMemberNames)
    expect(familyTree.root).toEqual(root)
    expect(root.name).toEqual('king shan')
    expect(root.gender).toEqual(Gender.MALE)
    expect(root.spouse).not.toBeNull()
    expect(root.children).not.toHaveLength(0)
  })
})
