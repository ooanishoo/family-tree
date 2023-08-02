import Drawer from '@/components/Drawer'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

describe('<Drawer />', () => {
  const mockOnClose = jest.fn()
  const mockChildren = <div>Test Children</div>

  it('renders with child component when isOpen=true', () => {
    const isOpen = true

    render(
      <Drawer isOpen={isOpen} onClose={mockOnClose}>
        {mockChildren}
      </Drawer>,
    )

    expect(screen.getByRole('dialog')).toHaveAttribute('aria-modal', 'true')
    expect(
      screen.getByLabelText('Modal to search family members and relationship'),
    ).toBeInTheDocument()
    expect(screen.getByText('Search')).toBeInTheDocument()
    expect(screen.getByText('Test Children')).toBeInTheDocument()
  })
  it('does not render when isOpen=false', () => {
    const isOpen = false

    render(
      <Drawer isOpen={isOpen} onClose={mockOnClose}>
        {mockChildren}
      </Drawer>,
    )

    expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
    expect(screen.queryByText('Test Children')).not.toBeInTheDocument()
  })

  it('calls the onClose function when the close button is clicked', async () => {
    const isOpen = true

    render(
      <Drawer isOpen={isOpen} onClose={mockOnClose}>
        {mockChildren}
      </Drawer>,
    )

    // Click the Close button
    const closeButton = screen.getByRole('button', { name: 'Close drawer' })
    await userEvent.click(closeButton)

    expect(mockOnClose).toHaveBeenCalledTimes(1)
  })
})
