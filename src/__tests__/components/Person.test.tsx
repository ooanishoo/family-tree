import { Person } from '@/components/Person'
import { Gender } from '@/types/Gender'
import { IMember } from '@/types/IMember'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

const mockMember: IMember = {
  name: 'John Doe',
  gender: Gender.MALE,
  spouse: null,
  children: [],
}
describe('<Person />', () => {
  it('renders with correct name and gender', () => {
    render(<Person member={mockMember} />)

    const avatarElement = screen.getByRole('img')
    const nameElement = screen.getByText(/John Doe/i)

    expect(avatarElement).toHaveAttribute('title', 'Avatar for John Doe')
    expect(avatarElement).toBeInTheDocument()
    expect(nameElement).toBeInTheDocument()
  })

  test('triggers a modal to add a member when the avatar is clicked', async () => {
    render(<Person member={mockMember} />)

    // Initially, the modal should not be visible
    let modalElement = screen.queryByRole('dialog')
    expect(modalElement).not.toBeInTheDocument()

    // Click on the avatar to trigger the modal
    const avatarElement = screen.getByRole('img')
    await userEvent.click(avatarElement)

    modalElement = screen.getByRole('dialog')
    await userEvent.click(avatarElement)
    expect(modalElement).toBeInTheDocument()
  })
})
