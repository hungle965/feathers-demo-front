export interface Task {
  id: string
  name: string
}

export interface ListTaskStateInterface {
  ListTask: Task[]
}

function state(): ListTaskStateInterface {
  return {
    ListTask: [
      { id: '1', name: 'name of task 1' },
      { id: '2', name: 'name of task 2' }
    ]
  }
}

export default state
