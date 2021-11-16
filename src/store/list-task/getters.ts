import { GetterTree } from 'vuex'
import { StateInterface } from '../index'
import { ListTaskStateInterface } from './state'

const getters: GetterTree<ListTaskStateInterface, StateInterface> = {
  someAction(/* context */) {
    // your code
  }
}

export default getters
