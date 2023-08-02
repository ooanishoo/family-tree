import { FamilyTreeProvider } from '@/components/FamilyTreeProvider'
import Home from '@/pages/index'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

describe('<Home />', () => {
  beforeEach(() => {
    render(
      <FamilyTreeProvider>
        <Home />
      </FamilyTreeProvider>,
    )
  })
  it('renders heading and sub heading correctly', () => {
    expect(
      screen.getByRole('heading', {
        name: 'Family Tree',
      }),
    ).toBeInTheDocument()
    expect(
      screen.getByText('Welcome to the Shan family tree'),
    ).toBeInTheDocument()
    expect(
      screen.getByText(
        'Click on any one of the family members to add a child or a spouse.',
      ),
    ).toBeInTheDocument()
  })

  it('renders family tree', () => {
    expect(screen.getByTestId('family-tree-root')).toBeInTheDocument()
  })

  it('renders search button correctly', () => {
    expect(
      screen.getByRole('button', { name: 'Search family members' }),
    ).toBeInTheDocument()
  })

  it('opens the drawer when the search button is clicked', async () => {
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
    const searchButton = screen.getByRole('button', {
      name: 'Search family members',
    })
    await userEvent.click(searchButton)

    expect(screen.queryByRole('dialog')).toBeInTheDocument()
  })
})
