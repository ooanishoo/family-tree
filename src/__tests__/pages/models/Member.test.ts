import { Gender } from '@/types/Gender'
import { Member } from '@/models/Member'

describe('Member', () => {
  let member1: Member
  let member2: Member
  let child: Member

  beforeEach(() => {
    member1 = new Member('John', Gender.MALE)
    member2 = new Member('Sally', Gender.FEMALE)
    child = new Member('Jack', Gender.MALE)
  })

  it('should be able to add a spouse', () => {
    member1.addSpouse(member2)
    expect(member1.spouse).toBe(member2)
    expect(member2.spouse).toBe(member1)
  })

  it('should be able to add a child', () => {
    member1.addSpouse(member2)
    member1.addChild(child)

    expect(member1.children).toContain(child)
    expect(member2.children).toContain(child)
  })

  it('should correctly check if a member is married', () => {
    expect(member1.isMarried()).toBe(false)

    member1.addSpouse(member2)
    expect(member1.isMarried()).toBe(true)
    expect(member2.isMarried()).toBe(true)
  })
})
