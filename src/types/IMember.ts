import { Gender } from './Gender'

export interface IMember {
  name: string
  gender: Gender
  spouse: IMember | null
  children: IMember[]
}
