import { Member } from '@/models/Member'
import { Gender } from '@/types/Gender'
import { getName, getSpouse, isFemale, isMale, isMemberOrSpouse } from '@/utils'

describe('Utility function tests', () => {
  let john: Member
  let sally: Member
  let billy: Member

  beforeAll(() => {
    john = new Member('john', Gender.MALE)
    sally = new Member('sally', Gender.FEMALE)
    john.addSpouse(sally)

    billy = new Member('billy', Gender.MALE)
  })

  describe('isMale()', () => {
    it('should return true for a male member', () => {
      expect(isMale(john)).toBe(true)
    })

    it('should return false for a female member', () => {
      expect(isMale(sally)).toBe(false)
    })
  })

  describe('isFemale()', () => {
    it('should return true for a female member', () => {
      expect(isFemale(sally)).toBe(true)
    })

    it('should return false for a male member', () => {
      expect(isFemale(john)).toBe(false)
    })
  })

  describe('getName()', () => {
    it('should return the name of a member', () => {
      expect(getName(john)).toBe('john')
      expect(getName(sally)).toBe('sally')
    })
  })

  describe('getSpouse()', () => {
    it('should return the spouse of a member if a member is married', () => {
      const spouse = getSpouse(john)
      expect(spouse).not.toBeNull()
      expect((spouse as Member).name as string).toBe('sally')
    })
    it('should return null if a member is not married', () => {
      const spouse = getSpouse(billy)
      expect(spouse).toBeNull()
    })
  })

  describe('isMemberOrSpouse()', () => {
    it(`should return true if the member or member's spouce name matches`, () => {
      expect(isMemberOrSpouse('john')(john)).toBe(true)
      expect(isMemberOrSpouse('sally')(john)).toBe(true)

      expect(isMemberOrSpouse('john')(sally)).toBe(true)
      expect(isMemberOrSpouse('sally')(sally)).toBe(true)
    })

    it(`should return true if the member or member's spouce name matches`, () => {
      expect(isMemberOrSpouse('billy')(john)).toBe(false)
      expect(isMemberOrSpouse('billy')(sally)).toBe(false)
    })
  })
})
