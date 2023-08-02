import { FamilyTreeProvider } from '@/components/FamilyTreeProvider'
import SearchRelationship from '@/components/SearchRelationship'
import { render, screen } from '@testing-library/react'

describe('<SearchRelationship />', () => {
  beforeEach(() => {
    render(
      <FamilyTreeProvider>
        <SearchRelationship />
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
      screen.getByText('Find relationship between two members'),
    ).toBeInTheDocument()
    expect(screen.getByLabelText('Select member')).toBeInTheDocument()
    expect(screen.getByLabelText('Select relative')).toBeInTheDocument()
    expect(screen.getByText('Search')).toBeInTheDocument()
  })
})
