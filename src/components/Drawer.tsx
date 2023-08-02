import { DrawerModal } from '@zendeskgarden/react-modals'
import React, { ReactNode } from 'react'

interface DrawerProps {
  isOpen: boolean
  onClose: () => void
  children: ReactNode
}

const Drawer = ({ children, isOpen, onClose }: DrawerProps) => {
  return (
    <DrawerModal
      isOpen={isOpen}
      onClose={onClose}
      aria-modal="true"
      aria-label="Modal to search family members and relationship"
    >
      <DrawerModal.Header tag="h2">Search</DrawerModal.Header>
      <DrawerModal.Body>{children}</DrawerModal.Body>
      <DrawerModal.Close />
    </DrawerModal>
  )
}

export default Drawer
