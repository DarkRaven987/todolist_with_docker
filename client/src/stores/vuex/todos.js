import dayjs from 'dayjs';
import { apiAgent } from '../../utils/agent';

export default {
  state: () => ({
    todos: [],
    todosStatuses: [],
    loadingData: false,
  }),
  mutations: {
    setTodosData(state, data) {
      state.todos = data;
    },
    setTodosStatusesData(state, data) {
      state.todosStatuses = data;
    },
    updateTodoItem(state, todo) {
      state.todos = state.todos.map((todoItem) => {
        if (todoItem.id === todo.id) {
          return { ...todo };
        }
        return todoItem;
      });
    },
    deleteTodoItem(state, todoId) {
      state.todos = state.todos.filter((todoItem) => todoItem.id !== todoId);
    },
    resetTodosData(state) {
      state.todos = [];
    },
    setLoadingData(state, data) {
      state.loadingData = data;
    },
  },
  actions: {
    setTodosData(context, data) {
      context.commit('setTodosData', data);
    },
    setTodosStatusesData(context, data) {
      context.commit('setTodosStatusesData', data);
    },
    updateTodoItem(context, data) {
      context.commit('updateTodoItem', data);
    },
    deleteTodoItem(context, data) {
      context.commit('deleteTodoItem', data);
    },
    resetTodosData(context) {
      context.commit('resetTodosData');
    },
    setLoadingData(context, data) {
      context.commit('setLoadingData', data);
    },
    loadTodosData(context) {
      context.commit('setLoadingData', true);
      Promise.all([apiAgent.get('/todos'), apiAgent.get('/todos-status-enum')])
        .then(([{ data: todoList }, { data: statusList }]) => {
          context.commit(
            'setTodosData',
            todoList.sort(
              (a, b) => dayjs(b.created_at) - dayjs(a.created_at) + b.id - a.id,
            ),
          );
          context.commit('setTodosStatusesData', statusList);
        })
        .finally(() => context.commit('setLoadingData', false));
    },
  },
};
