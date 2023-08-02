import { SearchableRelationship } from '@/types/Relationship'
import { Button } from '@zendeskgarden/react-buttons'
import {
  Combobox,
  Field,
  Label,
  Option,
} from '@zendeskgarden/react-dropdowns.next'
import { FormEvent, useState } from 'react'
import { useFamilyTree } from '@/components/FamilyTreeProvider'

const SearchRelationship = () => {
  const [member, setMember] = useState<string>('')
  const [relative, setRelative] = useState<string>('')
  const { familyTree, memberNames = [] } = useFamilyTree()
  const [result, setResult] = useState<SearchableRelationship | null>()
  const [shouldShowSearchResult, setshouldShowSearchResult] = useState(false)

  const handleSearchMember = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    try {
      const response = familyTree.getRelationship(member, relative)
      setshouldShowSearchResult(true)

      setResult(response)
    } catch (error) {
      alert(error)
    }
  }

  return (
    <form
      className="flex flex-col gap-4"
      onSubmit={handleSearchMember}
      role="form"
    >
      <p className=" text-gray-500">Find relationship between two members</p>
      <Field>
        <Label>Select member</Label>
        <Combobox
          isEditable={false}
          onChange={({ selectionValue }) => {
            if (selectionValue !== undefined) {
              setMember(selectionValue as string)
              setshouldShowSearchResult(false)
            }
          }}
          placeholder="Select a member"
          inputProps={{ required: true }}
        >
          {memberNames.map((memberName) => (
            <Option key={memberName} value={memberName} label={memberName} />
          ))}
        </Combobox>
      </Field>
      <Field>
        <Label>Select relative</Label>
        <Combobox
          isEditable={false}
          onChange={({ selectionValue }) => {
            if (selectionValue !== undefined) {
              setRelative(selectionValue as string)
              setshouldShowSearchResult(false)
            }
          }}
          placeholder="Select a relative"
          inputProps={{ required: true }}
        >
          {memberNames.map((memberName) => (
            <Option key={memberName} value={memberName} label={memberName} />
          ))}
        </Combobox>
      </Field>

      <Field className="mt-2">
        <Button type="submit">Search</Button>
      </Field>
      {shouldShowSearchResult && (
        <Field className="font-semibold">
          {`Relationship: 
        ${result ?? `Unable to determine the relationship`}`}
        </Field>
      )}
    </form>
  )
}

export default SearchRelationship
