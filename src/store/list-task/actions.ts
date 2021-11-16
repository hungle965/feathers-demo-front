import { ActionTree } from 'vuex';
import { StateInterface } from '../index';
import { ListTaskStateInterface } from './state';

const actions: ActionTree<ListTaskStateInterface, StateInterface> = {
  someAction (/* context */) {
    // your code
  }
};

export default actions;
