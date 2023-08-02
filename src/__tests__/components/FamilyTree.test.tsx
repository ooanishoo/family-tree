import { IMember } from '@/types/IMember'
import { Gender } from '@/types/Gender'
import FamilyTree from '@/components/FamilyTree'
import { render, screen } from '@testing-library/react'

describe('<FamilyTree />', () => {
  const mockRootMember: IMember = {
    name: 'John Doe',
    gender: Gender.MALE,
    spouse: {
      name: 'Sally Doe',
      gender: Gender.FEMALE,
      spouse: null,
      children: [],
    },
    children: [
      {
        name: 'Child 1',
        gender: Gender.MALE,
        spouse: null,
        children: [],
      },
      {
        name: 'Child 2',
        gender: Gender.FEMALE,
        spouse: null,
        children: [],
      },
    ],
  }

  it('renders the root member, spouse, and children correctly', () => {
    render(<FamilyTree rootMember={mockRootMember} />)

    expect(screen.getByText('John Doe')).toBeInTheDocument()
    expect(screen.getByText('Sally Doe')).toBeInTheDocument()

    expect(screen.getByText('Child 1')).toBeInTheDocument()
    expect(screen.getByText('Child 2')).toBeInTheDocument()
  })
})
