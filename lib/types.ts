export interface Section {
  id: string
  type: string
  title: string
  isPublished: boolean
  order: number
  data: any
}

export interface User {
  id: string
  email: string
  name: string
  role: string
}
