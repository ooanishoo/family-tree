import { IMember } from '@/types/IMember'
import { Gender } from '@/types/Gender'
import { AllowedRelationship } from '@/types/Relationship'
import { Button } from '@zendeskgarden/react-buttons'
import {
  Combobox,
  Field,
  Label,
  Option,
} from '@zendeskgarden/react-dropdowns.next'
import { Input } from '@zendeskgarden/react-forms'
import {
  Body,
  Close,
  Footer,
  FooterItem,
  Header,
  Modal,
} from '@zendeskgarden/react-modals'
import { cloneDeep } from 'lodash'
import { FormEvent, useState } from 'react'
import { useFamilyTree } from '@/components/FamilyTreeProvider'

interface AddMemberProps {
  onSubmit: () => void
  member: IMember
}

const isMarried = (member: IMember) => !!member.spouse

const AddMember = ({ onSubmit, member }: AddMemberProps) => {
  const [newMember, setNewMember] = useState<string>('')
  const [relationship, setRelationship] = useState<AllowedRelationship>()
  const [gender, setGender] = useState<Gender>()
  const { familyTree, setFamilyTree } = useFamilyTree()

  const handleAddMember = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    try {
      const person = familyTree.addMember(
        member.name,
        newMember,
        gender as Gender,
        relationship as AllowedRelationship,
      )

      if (person) {
        setFamilyTree(cloneDeep(familyTree))
        onSubmit()
      }
    } catch (error) {
      alert(error ?? 'Something went wrong')
    }
  }

  return (
    <Modal onClose={onSubmit}>
      <form
        className="flex flex-col gap-4"
        onSubmit={handleAddMember}
        role="form"
      >
        <Header tag="h2">Add new family member</Header>
        <Body className="!flex flex-col gap-4">
          <Field>
            <Label htmlFor="relativeName">Relative name</Label>
            <Input id="relativeName" required value={member?.name} disabled />
          </Field>
          <Field>
            <Label htmlFor="relationship">Relationship</Label>
            <Combobox
              id="relationship"
              isEditable={false}
              onChange={({ selectionValue }) => {
                if (selectionValue !== undefined) {
                  setRelationship(
                    selectionValue as 'CHILD' | 'SPOUSE' | undefined,
                  )
                }
              }}
              placeholder="Relation to relative member"
            >
              <Option
                value="CHILD"
                label="Child"
                isDisabled={!isMarried(member)}
              />
              <Option
                value="SPOUSE"
                label="Spouse"
                isDisabled={isMarried(member)}
              />
            </Combobox>
          </Field>
          <Field>
            <Label htmlFor="newMemberName">Name</Label>
            <Input
              id="newMemberName"
              value={newMember}
              onChange={(e) => setNewMember(e.target.value)}
            />
          </Field>
          <Field>
            <Label htmlFor="gender">Gender</Label>
            <Combobox
              id="gender"
              isEditable={false}
              onChange={({ selectionValue }) => {
                if (selectionValue !== undefined) {
                  setGender(selectionValue as Gender | undefined)
                }
              }}
            >
              <Option value={Gender.MALE} label="Male" />
              <Option value={Gender.FEMALE} label="Female" />
            </Combobox>
          </Field>
        </Body>
        <Footer>
          <FooterItem>
            <Button onClick={onSubmit} isBasic type="reset">
              Cancel
            </Button>
          </FooterItem>
          <FooterItem>
            <Button isPrimary type="submit">
              Add
            </Button>
          </FooterItem>
        </Footer>
      </form>
      <Close aria-label="Close modal" />
    </Modal>
  )
}

export default AddMember
