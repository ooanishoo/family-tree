import { FamilyTree } from '@/models/FamilyTree'
import { Member } from '@/models/Member'
import { Gender } from '@/types/Gender'
import { getName, setupShanFamilyTree } from '@/utils'

describe('FamilyTree', () => {
  let family: FamilyTree

  let father: Member | null = null
  let mother: Member | null = null

  it('should create a family with father and mother as members', () => {
    family = new FamilyTree('John', 'Sally')
    father = family.root
    mother = father.spouse

    expect(father).toBeDefined()
    expect(mother).toBeDefined()

    expect(father?.gender).toBe(Gender.MALE)
    expect(mother?.gender).toBe(Gender.FEMALE)

    expect(father?.spouse).toBe(mother)
    expect(mother?.spouse).toBe(father)
  })

  describe('addMember()', () => {
    beforeEach(() => {
      family = new FamilyTree('John', 'Sally')
      father = family.root
      mother = father.spouse
    })
    describe('addChild()', () => {
      let child: Member
      const newMemberName = 'Jack'
      const newMemberGender = Gender.MALE
      beforeEach(() => {
        child = family.addMember(
          'Sally',
          newMemberName,
          newMemberGender,
          'CHILD',
        )
      })
      it(`should create a new child with name: ${newMemberName} & gender: ${newMemberGender}`, () => {
        expect(child).toBeDefined()
        expect(child.name).toBe(newMemberName)
        expect(child.gender).toBe(newMemberGender)
      })

      it('should link the child to both father and mother correctly', () => {
        expect(mother?.children).toContain(child)
        expect(father?.children).toContain(child)
      })

      it('should throw an error if the a new child is added to unmarried person', () => {
        expect(() =>
          family.addMember('Jack', 'Shane', newMemberGender, 'CHILD'),
        ).toThrow(
          'Jack is not married. Only a married person can have a child.',
        )
      })
    })

    describe('addSpouce()', () => {
      let spouse: Member
      let son: Member

      beforeEach(() => {
        son = family.addMember('Sally', 'Jack', Gender.MALE, 'CHILD')
        family.addMember('Sally', 'Lily', Gender.FEMALE, 'CHILD')

        spouse = family.addMember('Jack', 'Olivia', Gender.FEMALE, 'SPOUSE')
      })

      it('should link the spouse to the source member correctly', () => {
        expect(son.spouse).toEqual(spouse)
        expect(spouse.spouse).toEqual(son)
      })

      it('should throw an error if the person is already married', () => {
        expect(() =>
          family.addMember('Jack', 'Charlotte', Gender.MALE, 'SPOUSE'),
        ).toThrowError('Jack is already married to Olivia')
      })

      it('should throw an error if both the person are of same gender', () => {
        expect(() =>
          family.addMember('Lily', 'Izzy', Gender.FEMALE, 'SPOUSE'),
        ).toThrowError(
          'Lily and Izzy both are of same gender. Only opposite sex marriage is allowed.',
        )
      })
    })

    it('should throw an error if source member does not exists in the family tree', () => {
      expect(() =>
        family.addMember('Keith', 'Sally', Gender.FEMALE, 'CHILD'),
      ).toThrow('Source person not found')
    })

    it('should throw an error if the new member already exists in the family tree', () => {
      expect(() =>
        family.addMember('John', 'Sally', Gender.FEMALE, 'SPOUSE'),
      ).toThrow('Sally already exists in the family tree.')
    })
  })
  describe('find()', () => {
    beforeAll(() => (family = setupShanFamilyTree()))

    describe('should return related person/s based on the relationship to the given name', () => {
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

  describe('getRelationship()', () => {
    beforeAll(() => (family = setupShanFamilyTree()))

    describe(`should return a member's realtionship to a relative member`, () => {
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

  describe('mothersWithMostGirlChildren()', () => {
    beforeEach(() => {
      family = new FamilyTree('John', 'Sally')
    })
    it('should return the mother with the most girl children', () => {
      family.addMember('Sally', 'Nora', Gender.FEMALE, 'CHILD')
      family.addMember('Sally', 'Lily', Gender.FEMALE, 'CHILD')
      family.addMember('Sally', 'Olivia', Gender.FEMALE, 'CHILD')
      family.addMember('Sally', 'Emma', Gender.FEMALE, 'CHILD')
      family.addMember('Sally', 'Chloe', Gender.FEMALE, 'CHILD')
      family.addMember('Sally', 'Ava', Gender.FEMALE, 'CHILD')
      family.addMember('Sally', 'Emily', Gender.FEMALE, 'CHILD')

      family.addMember('Emily', 'James', Gender.MALE, 'SPOUSE')
      family.addMember('Emily', 'Aria', Gender.FEMALE, 'CHILD')
      family.addMember('Emily', 'Stella', Gender.FEMALE, 'CHILD')

      const motherWithMostGirls = family.mothersWithMostGirlChildren()
      expect(motherWithMostGirls).not.toBeNull()
      expect(motherWithMostGirls[0].name).toBe('Sally')
      expect(motherWithMostGirls[0].name).not.toBe('Emily')
    })

    it('should return array of mothers if multiple mothers have same number of most girl children', () => {
      family.addMember('Sally', 'Nora', Gender.FEMALE, 'CHILD')
      family.addMember('Sally', 'Emily', Gender.FEMALE, 'CHILD')

      family.addMember('Emily', 'James', Gender.MALE, 'SPOUSE')
      family.addMember('Emily', 'Aria', Gender.FEMALE, 'CHILD')
      family.addMember('Emily', 'Stella', Gender.FEMALE, 'CHILD')

      const motherWithMostGirls = family.mothersWithMostGirlChildren()
      expect(motherWithMostGirls).not.toBeNull()
    })

    it('should return empty array if no mother with girls is found', () => {
      family.addMember('Sally', 'Jack', Gender.MALE, 'CHILD')
      family.addMember('Sally', 'Phil', Gender.MALE, 'CHILD')
      family.addMember('Sally', 'Tom', Gender.MALE, 'CHILD')

      family.addMember('Tom', 'Olivia', Gender.FEMALE, 'SPOUSE')
      family.addMember('Olivia', 'Jimmy', Gender.MALE, 'CHILD')

      const motherWithMostGirls = family.mothersWithMostGirlChildren()
      expect(motherWithMostGirls).toHaveLength(0)
    })
  })
})
