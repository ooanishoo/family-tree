import { Member } from '@/models/Member'
import { isMale, isFemale, getSpouse, isMemberOrSpouse, getName } from '@/utils'
import { Gender } from '@/types/Gender'
import {
  AllowedRelationship,
  SearchableRelationship,
  Relationship,
} from '@/types/Relationship'

export class FamilyTree {
  public root: Member

  constructor(fatherName: string, motherName: string) {
    const father: Member = new Member(fatherName, Gender.MALE)
    const mother: Member = new Member(motherName, Gender.FEMALE)

    this.root = father
    father.addSpouse(mother)
  }

  public addMember(
    sourceName: string,
    targetName: string,
    targetGender: Gender,
    relationship: AllowedRelationship,
  ): Member {
    let source: Member | null = null

    // check if the source member exists
    source = this.find(sourceName)
    if (!source) throw new Error('Source person not found')

    // check if the target member already exists
    if (this.hasMember(targetName))
      throw new Error(`${targetName} already exists in the family tree.`)

    const member = new Member(targetName, targetGender)

    switch (relationship) {
      case 'CHILD':
        this.addChild(source, member)
        break
      case 'SPOUSE':
        this.addSpouse(source, member)
        break
      default:
        throw new Error('Relationship not supported')
    }

    return member
  }

  public get(
    name: string,
    relationship: Relationship,
  ): Member[] | Member | null {
    switch (relationship) {
      case 'PATERNAL-UNCLE':
        return this.paternalUncles(name)
      case 'MATERNAL-UNCLE':
        return this.maternalUncles(name)
      case 'PATERNAL-AUNT':
        return this.paternalAunts(name)
      case 'MATERNAL-AUNT':
        return this.maternalAunts(name)
      case 'SISTER-IN-LAW':
        return this.sisterInLaws(name)
      case 'BROTHER-IN-LAW':
        return this.brotherInLaws(name)
      case 'COUSIN':
        return this.cousins(name)
      case 'FATHER':
        return this.father(name)
      case 'MOTHER':
        return this.mother(name)
      case 'CHILD':
        return this.children(name)
      case 'SON':
        return this.sons(name)
      case 'DAUGHTER':
        return this.daughters(name)
      case 'BROTHER':
        return this.brothers(name)
      case 'SISTER':
        return this.sisters(name)
      case 'GRAND-CHILD':
        return this.grandChildren(name)
      case 'GRAND-DAUGHTER':
        return this.grandDaughters(name)
      case 'GRAND-SON':
        return this.grandSons(name)
      case 'SIBLING':
        return this.siblings(name)
      case 'SPOUSE':
        return this.spouse(name)
      default:
        throw new Error('Relationship not supported')
    }
  }

  public getRelationship(
    memberName: string,
    relativeName: string,
  ): SearchableRelationship | null {
    let member: [Member | null, number | null] = [null, null]
    let relative: [Member | null, number | null] = [null, null]

    this.traverse((currentMember: Member, depth: number) => {
      if (member[0] && relative[0]) {
        return // Both member and relative are already found, exit the callback
      }

      if (currentMember.name === memberName) {
        member = [currentMember, depth]
      }
      if (currentMember.spouse?.name === memberName) {
        member = [currentMember.spouse, depth]
      }
      if (currentMember.name === relativeName) {
        relative = [currentMember, depth]
      }
      if (currentMember.spouse?.name === relativeName) {
        relative = [currentMember.spouse, depth]
      }
    })

    if (!member) {
      throw new Error(`${memberName} does not exists in the family tree.`)
    }
    if (!relative) {
      throw new Error(`${relativeName} does not exists in the family tree.`)
    }

    const [memberNode, memberDepth] = member as [Member, number]
    const [relativeNode, relativeDepth] = relative as [Member, number]

    if (memberDepth - relativeDepth >= 2) {
      return 'ANCESTOR'
    } else if (relativeDepth - memberDepth >= 2) {
      return 'DESCENDANT'
    } else if (memberDepth === relativeDepth) {
      if (memberNode.name === relativeNode.spouse?.name) {
        return 'SPOUSE'
      }

      //SIBLINGS
      const siblings = this.siblings(memberName)
      if (siblings.some((sibling) => sibling.name === relativeName)) {
        return isMale(relativeNode) ? 'BROTHER' : 'SISTER'
      }

      // IN-LAWS: spouse's siblings & sibling's spouse
      const spouceSiblings = this.siblings(memberNode.spouse?.name as string)
      const inLaws = [...siblings.map(getSpouse), ...spouceSiblings]
      const isRelativeInLaw = inLaws.some(
        (inLaw) => inLaw?.name === relativeName,
      )

      if (isRelativeInLaw) {
        const inLaw = inLaws.find(
          (inLaw) => inLaw?.name === relativeName,
        ) as Member
        return isMale(inLaw) ? 'BROTHER-IN-LAW' : 'SISTER-IN-LAW'
      }

      const cousins = this.cousins(memberName)
      if (cousins.some((cousin) => cousin.name === relativeName)) {
        return 'COUSIN'
      }

      const cousinInLaws = cousins.map(getSpouse)
      if (
        cousinInLaws.some((cousinInLaw) => cousinInLaw?.name === relativeName)
      ) {
        return 'COUSIN-IN-LAW'
      }
    } else if (memberDepth - relativeDepth === 1) {
      //PARENT
      const parent = this.parent(memberName)
      if (parent) {
        if (parent?.name === relativeName) {
          return isMale(relativeNode) ? 'FATHER' : 'MOTHER'
        }

        if (parent.spouse?.name === relativeName) {
          return isMale(relativeNode) ? 'FATHER' : 'MOTHER'
        }
      }

      // PARENT-IN-LAW
      const parentInLaw = this.parent(memberNode.spouse?.name as string)
      if (parentInLaw) {
        if (parentInLaw?.name === relativeName) {
          return isMale(relativeNode) ? 'FATHER-IN-LAW' : 'MOTHER-IN-LAW'
        }
        if (parentInLaw.spouse?.name === relativeName) {
          return isMale(relativeNode) ? 'FATHER-IN-LAW' : 'MOTHER-IN-LAW'
        }
      }

      // UNCLE | AUNT
      const paternalUncles = this.paternalUncles(memberName)
      if (paternalUncles.some((uncle) => uncle.name === relativeName)) {
        return 'PATERNAL-UNCLE'
      }

      const maternalUncles = this.maternalUncles(memberName)
      if (maternalUncles.some((uncle) => uncle.name === relativeName)) {
        return 'MATERNAL-UNCLE'
      }
      const paternalAunts = this.paternalAunts(memberName)
      if (paternalAunts.some((aunt) => aunt.name === relativeName)) {
        return 'PATERNAL-AUNT'
      }

      const maternalAunts = this.maternalAunts(memberName)
      if (maternalAunts.some((aunt) => aunt.name === relativeName)) {
        return 'MATERNAL-AUNT'
      }
    } else if (relativeDepth - memberDepth === 1) {
      // CHILDREN
      const children = this.children(memberName)
      if (children.some((child) => child.name === relativeName)) {
        return isMale(relativeNode) ? 'SON' : 'DAUGHTER'
      }
      if (
        children.some(
          (child) => child.spouse && child.spouse.name === relativeName,
        )
      ) {
        return isMale(relativeNode) ? 'SON-IN-LAW' : 'DAUGHTER-IN-LAW'
      }
    }

    return null
  }

  public mothersWithMostGirlChildren(): Member[] {
    let mothersWithMostGirls: Member[] = []
    let maxGirlsCount = 0

    this.traverse((currentMember: Member) => {
      const spouse = isFemale(currentMember)
        ? currentMember
        : currentMember.spouse

      if (spouse) {
        const girlsCount = this.daughters(spouse?.name).length
        if (girlsCount > maxGirlsCount) {
          maxGirlsCount = girlsCount
          mothersWithMostGirls = [spouse] // Reset the array with the new mother
        } else if (girlsCount > 0 && girlsCount === maxGirlsCount) {
          mothersWithMostGirls.push(spouse) // Add the new mother to the array
        }
      }
    })

    return mothersWithMostGirls
  }

  public getMemberNames(): string[] {
    let memberNames: string[] = []

    this.traverse((currentMember: Member) => {
      memberNames.push(currentMember.name)
      currentMember?.spouse && memberNames.push(currentMember?.spouse.name)
    })

    return memberNames
  }

  private traverse(cb: (currentMember: Member, depth: number) => void): void {
    // Queue to store the members to be visited
    const queue: [Member, number][] = [[this.root, 0]]

    while (queue.length > 0) {
      const [currentMember, depth] = queue.shift()! // Remove the first member from the queue

      cb(currentMember, depth)

      for (const child of currentMember.children) {
        queue.push([child, depth + 1])
      }
    }
  }

  private addChild(parent: Member, child: Member): void {
    if (!parent.isMarried()) {
      throw new Error(
        `${parent.name} is not married. Only a married person can have a child.`,
      )
    }
    parent.addChild(child)
  }

  private addSpouse(member: Member, spouse: Member): void {
    if (member.isMarried()) {
      throw new Error(
        `${member.name} is already married to ${member.spouse?.name}.`,
      )
    }

    if (member.gender === spouse.gender) {
      throw new Error(
        `${member.name} and ${spouse.name} both are of same gender. Only opposite sex marriage is allowed.`,
      )
    }
    member.addSpouse(spouse)
  }

  private parent(name: string): Member | null {
    let parent: Member | null = null

    // Traverse the tree and find the parent of the given member node
    this.traverse((currentMember: Member) => {
      const foundChild = currentMember.children.find(
        (child) => child.name === name,
      )

      if (foundChild) {
        parent = currentMember
        return // Parent node (father) found, exit the loop
      }
    })

    return parent
  }

  private father(name: string): Member | null {
    const parent = this.parent(name)
    if (!parent) return null
    return parent.gender === Gender.MALE ? parent : parent.spouse
  }

  private mother(name: string): Member | null {
    const parent = this.parent(name)
    if (!parent) return null
    return parent.gender === Gender.FEMALE ? parent : parent.spouse
  }

  private children(name: string): Member[] {
    let children: Member[] = []
    this.traverse((currentMember: Member) => {
      if (isMemberOrSpouse(name)(currentMember)) {
        children = currentMember.children
      }
    })
    return children
  }

  private sons(name: string): Member[] {
    return this.children(name).filter(isMale)
  }

  private daughters(name: string): Member[] {
    return this.children(name).filter(isFemale)
  }

  private siblings(name: string): Member[] {
    let siblings: Member[] = []

    // Traverse the tree and find the parent of the given member node
    this.traverse((currentMember: Member) => {
      const foundChild = currentMember.children.find(
        (child) => child.name === name,
      )

      if (foundChild) {
        siblings = currentMember.children.filter(
          (child) => child.name !== foundChild.name,
        )
        return // Siblings poulated, exit the loop
      }
    })

    return siblings
  }

  private brothers(name: string): Member[] {
    return this.siblings(name).filter(isMale)
  }

  private sisters(name: string): Member[] {
    return this.siblings(name).filter(isFemale)
  }

  private grandChildren(name: string): Member[] {
    const grandChildren: Member[] = []
    this.traverse((currentMember: Member) => {
      if (isMemberOrSpouse(name)(currentMember)) {
        for (const child of currentMember.children) {
          grandChildren.push(...child.children)
        }
      }
    })
    return grandChildren
  }

  private grandDaughters(name: string): Member[] {
    return this.grandChildren(name).filter(isFemale)
  }

  private grandSons(name: string): Member[] {
    return this.grandChildren(name).filter(isMale)
  }

  private cousins(name: string): Member[] {
    const cousins: Member[] = []
    const parent = this.parent(name)
    if (parent) {
      // Find the siblings of the parents
      const parentSiblings = [
        ...this.siblings(parent.name),
        ...(parent.spouse?.name ? this.siblings(parent.spouse.name) : []),
      ]

      for (const sibling of parentSiblings) {
        cousins.push(...sibling.children)
      }
    }
    return cousins
  }

  private paternalUncles(name: string): Member[] {
    const father = this.father(name)
    if (!father) return []

    const fatherSiblings = this.siblings(father.name)

    return fatherSiblings.reduce(
      (paternalUncles: Member[], sibling: Member) => {
        const uncle = isMale(sibling) ? sibling : sibling.spouse
        uncle && paternalUncles.push(uncle)
        return paternalUncles
      },
      [],
    )
  }

  private maternalUncles(name: string): Member[] {
    const mother = this.mother(name)
    if (!mother) return []

    const motherSiblings = this.siblings(mother.name)

    return motherSiblings.reduce(
      (maternalUncles: Member[], sibling: Member) => {
        const uncle = isMale(sibling) ? sibling : sibling.spouse
        uncle && maternalUncles.push(uncle)

        return maternalUncles
      },
      [],
    )
  }

  private paternalAunts(name: string): Member[] {
    const father = this.father(name)
    if (!father) return []

    const fatherSiblings = this.siblings(father.name)

    return fatherSiblings.reduce((paternalAunts: Member[], sibling: Member) => {
      const aunt = isFemale(sibling) ? sibling : sibling.spouse
      aunt && paternalAunts.push(aunt)
      return paternalAunts
    }, [])
  }

  private maternalAunts(name: string): Member[] {
    const mother = this.mother(name)
    if (!mother) return []

    const motherSiblings = this.siblings(mother.name)
    return motherSiblings.reduce((maternalAunts: Member[], sibling: Member) => {
      const aunts = isFemale(sibling) ? sibling : sibling.spouse
      aunts && maternalAunts.push(aunts)

      return maternalAunts
    }, [])
  }

  private sisterInLaws(name: string): Member[] {
    const sisterInLaws: Member[] = []

    // get spouse's sisters
    const spouse = this.spouse(name)
    spouse && sisterInLaws.push(...this.sisters(spouse.name))

    // get wives of borthers
    const brothers = this.brothers(name)
    brothers && sisterInLaws.push(...(brothers.map(getSpouse) as Member[]))

    return sisterInLaws
  }

  private brotherInLaws(name: string): Member[] {
    const brotherInLaws: Member[] = []

    // get spouse's brothers
    const spouse = this.spouse(name)
    spouse && brotherInLaws.push(...this.brothers(spouse.name))

    // get husbands of sisters
    const sisters = this.sisters(name)
    sisters && brotherInLaws.push(...(sisters.map(getSpouse) as Member[]))

    return brotherInLaws
  }

  private spouse(name: string): Member | null {
    let spouse: Member | null = null

    this.traverse((currentMember: Member) => {
      if (currentMember.name === name) {
        spouse = currentMember?.spouse
        return
      }

      if (currentMember?.spouse && currentMember?.spouse.name === name) {
        spouse = currentMember
        return
      }
    })

    return spouse
  }

  private hasMember(name: string): boolean {
    let hasFoundMember = false
    this.traverse((currentMember: Member) => {
      if (isMemberOrSpouse(name)(currentMember)) {
        hasFoundMember = true
        return
      }
    })
    return hasFoundMember
  }

  private find(name: string): Member | null {
    let foundMember: Member | null = null
    this.traverse((currentMember: Member) => {
      if (isMemberOrSpouse(name)(currentMember)) {
        foundMember = currentMember
        return
      }
    })
    return foundMember
  }
}
