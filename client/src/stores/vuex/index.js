import { createStore } from 'vuex';
import todos from './todos';
import user from './user';

export default createStore({
  modules: {
    todos,
    user,
  },
});
