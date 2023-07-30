import { Gender } from '@/types/Gender'

export class Member {
  public name: string
  public gender: Gender
  public spouse: Member | null
  public children: Member[]

  constructor(name: string, gender: Gender) {
    this.name = name
    this.gender = gender
    this.spouse = null
    this.children = []
  }

  public addSpouse(person: Member): void {
    this.spouse = person
    person.spouse = this
  }

  public addChild(child: Member): void {
    this.children.push(child)
    if (this.spouse) {
      this.spouse.children.push(child)
    }
  }

  public isMarried(): boolean {
    return this.spouse !== null
  }
}
