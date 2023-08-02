import { IMember } from '@/types/IMember'
import { Relationship } from '@/types/Relationship'
import { Button } from '@zendeskgarden/react-buttons'
import {
  Combobox,
  Field,
  Label,
  Option,
} from '@zendeskgarden/react-dropdowns.next'
import { FormEvent, useState } from 'react'
import { useFamilyTree } from '@/components/FamilyTreeProvider'
import clsx from 'clsx'
import { Gender } from '@/types/Gender'
import Avatar from '@/components/Avatar'

const relationshipOptions: Relationship[] = [
  'PATERNAL-UNCLE',
  'MATERNAL-UNCLE',
  'PATERNAL-AUNT',
  'MATERNAL-AUNT',
  'SISTER-IN-LAW',
  'BROTHER-IN-LAW',
  'COUSIN',
  'FATHER',
  'MOTHER',
  'CHILD',
  'SON',
  'DAUGHTER',
  'BROTHER',
  'SISTER',
  'GRAND-CHILD',
  'GRAND-DAUGHTER',
  'GRAND-SON',
  'SIBLING',
  'SPOUSE',
]

const SearchMember = () => {
  const [member, setMember] = useState<string>('')
  const [relationship, setRelationship] = useState<Relationship>()
  const { familyTree, memberNames = [] } = useFamilyTree()
  const [result, setResult] = useState<IMember[]>([])
  const [shouldShowSearchResult, setshouldShowSearchResult] = useState(false)

  const handleSearchMember = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    try {
      const response = familyTree.get(member, relationship as Relationship)
      setshouldShowSearchResult(true)
      if (response === null) {
        setResult([])
        return
      }
      Array.isArray(response) ? setResult(response) : setResult([response])
    } catch (error) {
      alert(error)
    }
  }

  const displayResult = () => (
    <div className="flex flex-col gap-6">
      {result.map((member) => (
        <div className="flex items-center space-x-4" key={member.name}>
          <div className="flex-shrink-0 ">
            <Avatar
              color={clsx(
                member.gender === Gender.FEMALE && 'bg-female',
                member.gender === Gender.MALE && 'bg-male',
              )}
              title={member.name}
            />
          </div>
          <div className="min-w-0 flex-1 ">
            <p className="m-0 text-lg  text-gray-900">{member.name}</p>
            <p className=" m-0 text-xs text-gray-500  ">{member.gender}</p>
          </div>
        </div>
      ))}
    </div>
  )

  return (
    <form
      className="flex flex-col gap-4"
      onSubmit={handleSearchMember}
      role="form"
    >
      <p className=" text-gray-500">Filter family members by relationship </p>
      <Field>
        <Label htmlFor="selectMember">Select member</Label>
        <Combobox
          id="selectMember"
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
        <Label htmlFor="relationship">Relationship</Label>
        <Combobox
          id="relationship"
          isEditable={false}
          onChange={({ selectionValue }) => {
            if (selectionValue !== undefined) {
              setRelationship(selectionValue as Relationship | undefined)
              setshouldShowSearchResult(false)
            }
          }}
          placeholder="Select relationship type"
        >
          {relationshipOptions.map((relationshipOption) => (
            <Option
              key={relationshipOption}
              value={relationshipOption}
              label={relationshipOption}
            />
          ))}
        </Combobox>
      </Field>
      <Field className="mt-2">
        <Button type="submit">Search</Button>
      </Field>
      {shouldShowSearchResult && (
        <Field>
          <p className="font-semibold">{`Search result: ${result.length}`}</p>
          {result.length > 0 ? displayResult() : null}
        </Field>
      )}
    </form>
  )
}

export default SearchMember
