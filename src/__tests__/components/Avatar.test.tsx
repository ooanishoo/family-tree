import React from 'react'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Avatar from '@/components/Avatar'

describe('<Avatar />', () => {
  it('renders with default props', () => {
    render(<Avatar />)

    const avatarElement = screen.getByRole('img')

    expect(avatarElement).toBeInTheDocument()
    expect(avatarElement).toHaveAttribute('aria-label', 'Avatar')
    expect(avatarElement).toHaveAttribute('title', 'Avatar')
    expect(avatarElement).toHaveStyle("background-color: '#6b7280'")
  })

  it('renders with custom props', () => {
    render(<Avatar color="bg-slate-950" title="Custom Avatar" />)
    const avatarElement = screen.getByRole('img')

    expect(avatarElement).toHaveAttribute('aria-label', 'Custom Avatar')
    expect(avatarElement).toHaveAttribute('title', 'Custom Avatar')
    expect(avatarElement).toHaveStyle("background-color: '#020617'")
  })

  it('onClick event is triggered', async () => {
    const onClickMock = jest.fn()
    render(
      <Avatar
        color="bg-slate-950"
        title="Custom Avatar"
        onClick={onClickMock}
      />,
    )

    const avatarElement = screen.getByRole('img')
    await userEvent.click(avatarElement)
    expect(onClickMock).toHaveBeenCalledTimes(1)
  })
})
