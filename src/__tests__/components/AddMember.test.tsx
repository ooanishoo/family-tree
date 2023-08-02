import AddMember from '@/components/AddMember'
import { FamilyTreeProvider } from '@/components/FamilyTreeProvider'
import { Gender } from '@/types/Gender'
import { IMember } from '@/types/IMember'
import { render, screen } from '@testing-library/react'

describe('<AddMember />', () => {
  const mockRootMember: IMember = {
    name: 'John Doe',
    gender: Gender.MALE,
    spouse: null,
    children: [],
  }

  const mockOnSubmit = jest.fn()

  beforeEach(() => {
    render(
      <FamilyTreeProvider>
        <AddMember onSubmit={mockOnSubmit} member={mockRootMember} />
      </FamilyTreeProvider>,
    )
  })

  it('renders a modal component with correct header, form and two buttons', () => {
    expect(screen.getByText('Add new family member')).toBeInTheDocument()
    expect(screen.getByRole('form')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Add' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Cancel' })).toBeInTheDocument()
  })

  it('renders form fields with correct labels and values', () => {
    expect(screen.getByLabelText('Relative name')).toHaveValue('John Doe')
    expect(screen.getByLabelText('Relationship')).not.toHaveValue()
    expect(screen.getByLabelText('Name')).not.toHaveValue()
    expect(screen.getByLabelText('Gender')).not.toHaveValue()
  })
})
