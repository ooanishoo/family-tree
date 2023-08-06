import { FamilyTree } from '@/models/FamilyTree'
import { Member } from '@/models/Member'
import { Gender } from '@/types/Gender'

export const isMale = (member: Member): boolean => member.gender === Gender.MALE
export const isFemale = (member: Member): boolean =>
  member.gender === Gender.FEMALE

export const getName = (member: Member): string => member.name
export const getSpouse = (member: Member): Member | null => member.spouse

export const isMemberOrSpouse =
  (name: string) =>
  (member: Member): boolean =>
    member.name === name || member.spouse?.name === name

export const setupShanFamilyTree = (): FamilyTree => {
  //1st generation
  const family = new FamilyTree('king shan', 'queen anga')

  // 2nd generation
  family.addMember('queen anga', 'ish', Gender.MALE, 'CHILD')
  family.addMember('queen anga', 'chit', Gender.MALE, 'CHILD')
  family.addMember('queen anga', 'vich', Gender.MALE, 'CHILD')
  family.addMember('queen anga', 'satya', Gender.FEMALE, 'CHILD')

  family.addMember('chit', 'ambi', Gender.FEMALE, 'SPOUSE')
  family.addMember('vich', 'lika', Gender.FEMALE, 'SPOUSE')
  family.addMember('satya', 'vyan', Gender.MALE, 'SPOUSE')

  // 3rd generation
  family.addMember('ambi', 'drita', Gender.MALE, 'CHILD')
  family.addMember('ambi', 'vrita', Gender.MALE, 'CHILD')

  family.addMember('lika', 'vila', Gender.MALE, 'CHILD')
  family.addMember('lika', 'chika', Gender.FEMALE, 'CHILD')

  family.addMember('satya', 'satvy', Gender.FEMALE, 'CHILD')
  family.addMember('satya', 'savya', Gender.MALE, 'CHILD')
  family.addMember('satya', 'saayan', Gender.MALE, 'CHILD')

  family.addMember('drita', 'jaya', Gender.FEMALE, 'SPOUSE')
  family.addMember('vila', 'jnki', Gender.FEMALE, 'SPOUSE')
  family.addMember('chika', 'kpila', Gender.MALE, 'SPOUSE')
  family.addMember('satvy', 'asva', Gender.MALE, 'SPOUSE')
  family.addMember('savya', 'krpi', Gender.FEMALE, 'SPOUSE')
  family.addMember('saayan', 'mina', Gender.FEMALE, 'SPOUSE')

  /// 4th generation
  family.addMember('jaya', 'jata', Gender.MALE, 'CHILD')
  family.addMember('jaya', 'driya', Gender.FEMALE, 'CHILD')
  family.addMember('jnki', 'lavnya', Gender.FEMALE, 'CHILD')
  family.addMember('krpi', 'kriya', Gender.MALE, 'CHILD')
  family.addMember('mina', 'misa', Gender.MALE, 'CHILD')

  family.addMember('driya', 'mnu', Gender.MALE, 'SPOUSE')
  family.addMember('lavnya', 'gru', Gender.MALE, 'SPOUSE')

  return family
}
