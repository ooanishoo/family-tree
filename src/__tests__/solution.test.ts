import { FamilyTree } from '@/models/FamilyTree'
import { Gender } from '@/types/Gender'
import { getName, setupShanFamilyTree } from '@/utils'

describe('FamilyTree', () => {
  let family: FamilyTree
  beforeEach(() => (family = setupShanFamilyTree()))

  describe('Problem 1: Meet the family', () => {
    describe('when given a name and a relationship as an input, the output are the people that correspond to the relationship.', () => {
      describe.each`
        name            | relationship        | output
        ${'drita'}      | ${'PATERNAL-UNCLE'} | ${['ish', 'vich', 'vyan']}
        ${'chika'}      | ${'PATERNAL-UNCLE'} | ${['ish', 'chit', 'vyan']}
        ${'satvy'}      | ${'PATERNAL-UNCLE'} | ${[]}
        ${'savya'}      | ${'MATERNAL-UNCLE'} | ${['ish', 'chit', 'vich']}
        ${'lavnya'}     | ${'MATERNAL-UNCLE'} | ${[]}
        ${'vrita'}      | ${'MATERNAL-UNCLE'} | ${[]}
        ${'driya'}      | ${'MATERNAL-UNCLE'} | ${[]}
        ${'drita'}      | ${'PATERNAL-AUNT'}  | ${['lika', 'satya']}
        ${'driya'}      | ${'PATERNAL-AUNT'}  | ${[]}
        ${'lavnya'}     | ${'PATERNAL-AUNT'}  | ${['chika']}
        ${'kriya'}      | ${'PATERNAL-AUNT'}  | ${['satvy', 'mina']}
        ${'satvy'}      | ${'MATERNAL-AUNT'}  | ${['ambi', 'lika']}
        ${'ish'}        | ${'SISTER-IN-LAW'}  | ${['ambi', 'lika']}
        ${'ambi'}       | ${'SISTER-IN-LAW'}  | ${['satya']}
        ${'krpi'}       | ${'SISTER-IN-LAW'}  | ${['satvy']}
        ${'vyan'}       | ${'BROTHER-IN-LAW'} | ${['ish', 'chit', 'vich']}
        ${'kpila'}      | ${'BROTHER-IN-LAW'} | ${['vila']}
        ${'mnu'}        | ${'BROTHER-IN-LAW'} | ${['jata']}
        ${'vich'}       | ${'BROTHER-IN-LAW'} | ${['vyan']}
        ${'vila'}       | ${'BROTHER-IN-LAW'} | ${['kpila']}
        ${'saayan'}     | ${'BROTHER-IN-LAW'} | ${['asva']}
        ${'drita'}      | ${'COUSIN'}         | ${['vila', 'chika', 'satvy', 'savya', 'saayan']}
        ${'saayan'}     | ${'COUSIN'}         | ${['drita', 'vrita', 'vila', 'chika']}
        ${'misa'}       | ${'COUSIN'}         | ${['kriya']}
        ${'king shan'}  | ${'FATHER'}         | ${null}
        ${'chit'}       | ${'FATHER'}         | ${'king shan'}
        ${'drita'}      | ${'FATHER'}         | ${'chit'}
        ${'jata'}       | ${'FATHER'}         | ${'drita'}
        ${'queen anga'} | ${'MOTHER'}         | ${null}
        ${'satya'}      | ${'MOTHER'}         | ${'queen anga'}
        ${'saayan'}     | ${'MOTHER'}         | ${'satya'}
        ${'misa'}       | ${'MOTHER'}         | ${'mina'}
        ${'king shan'}  | ${'CHILD'}          | ${['ish', 'chit', 'vich', 'satya']}
        ${'satya'}      | ${'CHILD'}          | ${['satvy', 'savya', 'saayan']}
        ${'jaya'}       | ${'CHILD'}          | ${['jata', 'driya']}
        ${'ish'}        | ${'CHILD'}          | ${[]}
        ${'misa'}       | ${'CHILD'}          | ${[]}
        ${'king shan'}  | ${'SON'}            | ${['ish', 'chit', 'vich']}
        ${'satya'}      | ${'SON'}            | ${['savya', 'saayan']}
        ${'lavnya'}     | ${'SON'}            | ${[]}
        ${'queen anga'} | ${'DAUGHTER'}       | ${['satya']}
        ${'jaya'}       | ${'DAUGHTER'}       | ${['driya']}
        ${'jnki'}       | ${'DAUGHTER'}       | ${['lavnya']}
        ${'satya'}      | ${'BROTHER'}        | ${['ish', 'chit', 'vich']}
        ${'kriya'}      | ${'BROTHER'}        | ${[]}
        ${'saayan'}     | ${'BROTHER'}        | ${['savya']}
        ${'ish'}        | ${'SISTER'}         | ${['satya']}
        ${'jata'}       | ${'SISTER'}         | ${['driya']}
        ${'kriya'}      | ${'SISTER'}         | ${[]}
        ${'queen anga'} | ${'GRAND-DAUGHTER'} | ${['chika', 'satvy']}
        ${'ambi'}       | ${'GRAND-DAUGHTER'} | ${['driya']}
        ${'vich'}       | ${'GRAND-DAUGHTER'} | ${['lavnya']}
        ${'satya'}      | ${'GRAND-DAUGHTER'} | ${[]}
      `('$relationship', ({ name, relationship, output }) => {
        it(`${name}'s ${relationship}: ${output}`, () => {
          const result = family.get(name, relationship)
          if (Array.isArray(result)) {
            expect(result && result.map(getName)).toEqual(output)
          }
          if (!Array.isArray(result)) {
            expect(result && getName(result)).toEqual(output)
          }
        })
      })
    })
  })

  describe('Problem 2: A new born', () => {
    describe('a child should be added into a particular family in the tree.', () => {
      describe.each`
        existingMemberName | newMemberName | newMemberGender  | relationship
        ${'queen anga'}    | ${'john'}     | ${Gender.MALE}   | ${'CHILD'}
        ${'ambi'}          | ${'sally'}    | ${Gender.FEMALE} | ${'CHILD'}
        ${'lavnya'}        | ${'olivia'}   | ${Gender.FEMALE} | ${'CHILD'}
        ${'kpila'}         | ${'billy'}    | ${Gender.MALE}   | ${'CHILD'}
      `(
        '$relationship:',
        ({
          existingMemberName,
          newMemberName,
          newMemberGender,
          relationship,
        }) => {
          it(`${newMemberName} is ${existingMemberName}'s ${relationship}`, () => {
            const child = family.addMember(
              existingMemberName,
              newMemberName,
              newMemberGender,
              relationship,
            )
            expect(child).toBeDefined()
            expect(child.name).toBe(newMemberName)
            expect(child.gender).toBe(newMemberGender)
          })
        },
      )
    })
  })

  describe('Problem 3: The girl child', () => {
    it('should determine which mother has the most girl children.', () => {
      const motherWithMostGirls = family.mothersWithMostGirlChildren()
      expect(motherWithMostGirls).not.toBeNull()
      expect(motherWithMostGirls[0].name).toBe('queen anga')
      expect(motherWithMostGirls[1].name).toBe('lika')
      expect(motherWithMostGirls[2].name).toBe('satya')
      expect(motherWithMostGirls[3].name).toBe('jaya')
      expect(motherWithMostGirls[4].name).toBe('jnki')
    })
  })

  describe('Problem 4: Who is your daddy?', () => {
    describe(`given two names as input, the output should be the relationship between the two.`, () => {
      describe.each`
        name            | relativeName    | relationship
        ${'jata'}       | ${'ambi'}       | ${'ANCESTOR'}
        ${'lavnya'}     | ${'vich'}       | ${'ANCESTOR'}
        ${'misa'}       | ${'satya'}      | ${'ANCESTOR'}
        ${'driya'}      | ${'lika'}       | ${'ANCESTOR'}
        ${'gru'}        | ${'queen anga'} | ${'ANCESTOR'}
        ${'ambi'}       | ${'jata'}       | ${'DESCENDANT'}
        ${'vich'}       | ${'lavnya'}     | ${'DESCENDANT'}
        ${'satya'}      | ${'misa'}       | ${'DESCENDANT'}
        ${'lika'}       | ${'driya'}      | ${'DESCENDANT'}
        ${'queen anga'} | ${'gru'}        | ${'DESCENDANT'}
        ${'king shan'}  | ${'queen anga'} | ${'SPOUSE'}
        ${'queen anga'} | ${'king shan'}  | ${'SPOUSE'}
        ${'satya'}      | ${'vyan'}       | ${'SPOUSE'}
        ${'asva'}       | ${'satvy'}      | ${'SPOUSE'}
        ${'satya'}      | ${'ish'}        | ${'BROTHER'}
        ${'satvy'}      | ${'saayan'}     | ${'BROTHER'}
        ${'drita'}      | ${'vrita'}      | ${'BROTHER'}
        ${'vrita'}      | ${'drita'}      | ${'BROTHER'}
        ${'ish'}        | ${'satya'}      | ${'SISTER'}
        ${'saayan'}     | ${'satvy'}      | ${'SISTER'}
        ${'jata'}       | ${'driya'}      | ${'SISTER'}
        ${'vyan'}       | ${'chit'}       | ${'BROTHER-IN-LAW'}
        ${'kpila'}      | ${'vila'}       | ${'BROTHER-IN-LAW'}
        ${'mnu'}        | ${'jata'}       | ${'BROTHER-IN-LAW'}
        ${'vich'}       | ${'vyan'}       | ${'BROTHER-IN-LAW'}
        ${'vila'}       | ${'kpila'}      | ${'BROTHER-IN-LAW'}
        ${'saayan'}     | ${'asva'}       | ${'BROTHER-IN-LAW'}
        ${'ish'}        | ${'lika'}       | ${'SISTER-IN-LAW'}
        ${'ambi'}       | ${'satya'}      | ${'SISTER-IN-LAW'}
        ${'krpi'}       | ${'satvy'}      | ${'SISTER-IN-LAW'}
        ${'drita'}      | ${'vila'}       | ${'COUSIN'}
        ${'drita'}      | ${'chika'}      | ${'COUSIN'}
        ${'satvy'}      | ${'vrita'}      | ${'COUSIN'}
        ${'misa'}       | ${'kriya'}      | ${'COUSIN'}
        ${'drita'}      | ${'jnki'}       | ${'COUSIN-IN-LAW'}
        ${'drita'}      | ${'kpila'}      | ${'COUSIN-IN-LAW'}
        ${'satvy'}      | ${'jaya'}       | ${'COUSIN-IN-LAW'}
        ${'chit'}       | ${'king shan'}  | ${'FATHER'}
        ${'drita'}      | ${'chit'}       | ${'FATHER'}
        ${'jata'}       | ${'drita'}      | ${'FATHER'}
        ${'satya'}      | ${'queen anga'} | ${'MOTHER'}
        ${'saayan'}     | ${'satya'}      | ${'MOTHER'}
        ${'misa'}       | ${'mina'}       | ${'MOTHER'}
        ${'ambi'}       | ${'king shan'}  | ${'FATHER-IN-LAW'}
        ${'jaya'}       | ${'chit'}       | ${'FATHER-IN-LAW'}
        ${'mnu'}        | ${'drita'}      | ${'FATHER-IN-LAW'}
        ${'vyan'}       | ${'queen anga'} | ${'MOTHER-IN-LAW'}
        ${'mina'}       | ${'satya'}      | ${'MOTHER-IN-LAW'}
        ${'gru'}        | ${'jnki'}       | ${'MOTHER-IN-LAW'}
        ${'drita'}      | ${'vich'}       | ${'PATERNAL-UNCLE'}
        ${'chika'}      | ${'chit'}       | ${'PATERNAL-UNCLE'}
        ${'kpila'}      | ${'vyan'}       | ${null}
        ${'asva'}       | ${'lika'}       | ${null}
        ${'king shan'}  | ${'ish'}        | ${'SON'}
        ${'saayan'}     | ${'misa'}       | ${'SON'}
        ${'drita'}      | ${'jata'}       | ${'SON'}
        ${'krpi'}       | ${'kriya'}      | ${'SON'}
        ${'king shan'}  | ${'satya'}      | ${'DAUGHTER'}
        ${'lika'}       | ${'chika'}      | ${'DAUGHTER'}
        ${'jnki'}       | ${'lavnya'}     | ${'DAUGHTER'}
        ${'king shan'}  | ${'lika'}       | ${'DAUGHTER-IN-LAW'}
        ${'chit'}       | ${'jaya'}       | ${'DAUGHTER-IN-LAW'}
        ${'jnki'}       | ${'gru'}        | ${'SON-IN-LAW'}
        ${'king shan'}  | ${'vyan'}       | ${'SON-IN-LAW'}
      `('$relationship', ({ name, relativeName, relationship }) => {
        const testCaseDescription =
          relationship === null
            ? `Unable to find relationship between ${name} and ${relativeName}`
            : `${relativeName} is ${name}'s ${relationship}`

        it(testCaseDescription, () => {
          const result = family.getRelationship(name, relativeName)
          expect(result).toEqual(relationship)
        })
      })
    })
  })
})
