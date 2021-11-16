import { MutationTree } from 'vuex'
import { ListTaskStateInterface, Task } from './state'

const mutation: MutationTree<ListTaskStateInterface> = {
  addTask(state: ListTaskStateInterface, val: Task) {
    state.ListTask = [...state.ListTask, val]
  }
}

export default mutation
