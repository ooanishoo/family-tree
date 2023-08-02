import { FamilyTree } from '@/models/FamilyTree'
import { IMember } from '@/types/IMember'
import { setupShanFamilyTree } from '@/utils'
import { ReactNode, createContext, useContext, useState } from 'react'

interface OnbardingContextValue {
  root: IMember
  familyTree: FamilyTree
  setFamilyTree: (tree: FamilyTree) => void
  memberNames?: string[]
}

const FamilyTreeContext = createContext({} as OnbardingContextValue)

/**
 * The `FamilyTreeProvider` component is a wrapper that provides the family tree data and related
 * functions to its children components.
 * @param children
 * @returns  `FamilyTreeContext.Provider` component
 * with the `value` prop set to an object containing the `familyTree`, `setFamilyTree`, `root`, and
 * `memberNames` properties.
 */
export const FamilyTreeProvider = ({ children }: { children: ReactNode }) => {
  const [familyTree, setFamilyTree] = useState(setupShanFamilyTree())
  const value = {
    familyTree: familyTree,
    setFamilyTree: setFamilyTree,
    root: familyTree.root,
    memberNames: familyTree.getMemberNames(),
  }
  return (
    <FamilyTreeContext.Provider value={value}>
      {children}
    </FamilyTreeContext.Provider>
  )
}

/**
 * The useFamilyTree function is a custom hook that provides access to the FamilyTreeContext.
 * @returns the `context` value from the FamilyTreeContext
 */
export const useFamilyTree = (): OnbardingContextValue => {
  const context = useContext(FamilyTreeContext)
  if (!context) {
    throw new Error('useFamilyTree must be used within a FamilyTreeProvider')
  }
  return context
}
