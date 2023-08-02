import { FamilyTreeProvider } from '@/components/FamilyTreeProvider'
import MotherOfGirls from '@/components/MotherOfGirls'
import { render, screen } from '@testing-library/react'

describe('<MotherOfGirls />', () => {
  it('renders the list of mothers with most girl children', () => {
    const { getByText } = render(
      <FamilyTreeProvider>
        <MotherOfGirls />
      </FamilyTreeProvider>,
    )

    expect(getByText('Mother/s with most girl children:')).toBeInTheDocument()
    expect(screen.getAllByTestId('card-member')).toHaveLength(5)
    expect(getByText('queen anga')).toBeInTheDocument()
    expect(getByText('lika')).toBeInTheDocument()
    expect(getByText('satya')).toBeInTheDocument()
    expect(getByText('jaya')).toBeInTheDocument()
    expect(getByText('jnki')).toBeInTheDocument()
  })
})
