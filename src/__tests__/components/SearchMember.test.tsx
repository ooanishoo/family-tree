import { FamilyTreeProvider } from '@/components/FamilyTreeProvider'
import SearchMember from '@/components/SearchMember'
import { render, screen } from '@testing-library/react'

describe('<SearchMember />', () => {
  beforeEach(() => {
    render(
      <FamilyTreeProvider>
        <SearchMember />
      </FamilyTreeProvider>,
    )
  })

  it('renders a form with two select inputs and one button', () => {
    expect(screen.getByRole('form')).toBeInTheDocument()
    expect(screen.getAllByRole('combobox')).toHaveLength(2)
    expect(screen.getByRole('button', { name: 'Search' })).toBeInTheDocument()
  })
  it('renders form fields with correct labels and values', () => {
    expect(
      screen.getByText('Filter family members by relationship'),
    ).toBeInTheDocument()
    expect(screen.getByLabelText('Select member')).toBeInTheDocument()
    expect(screen.getByLabelText('Relationship')).toBeInTheDocument()
  })
})
