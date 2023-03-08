import { ref } from 'vue';
import { defineStore } from 'pinia';
import dayjs from 'dayjs';
import { apiAgent } from '../utils/agent';

export const useTodosStore = defineStore('todos', () => {
  const todos = ref([]);
  const todosStatuses = ref([]);
  const loadingData = ref(false);

  function loadTodosData() {
    loadingData.value = true;
    setTimeout(() => {
      Promise.all([apiAgent.get('/todos'), apiAgent.get('/todos-status-enum')])
        .then(([{ data: todoList }, { data: statusList }]) => {
          setTodosData(
            todoList.sort(
              (a, b) => dayjs(b.created_at) - dayjs(a.created_at) + b.id - a.id,
            ),
          );
          setTodosStatusesData(statusList);
        })
        .finally(() => (loadingData.value = false));
    }, 1000);
  }

  function setTodosData(data) {
    todos.value = data;
  }

  function setTodosStatusesData(data) {
    todosStatuses.value = data;
  }

  function updateTodoItem(todo) {
    todos.value = todos.value.map((todoItem) => {
      if (todoItem.id === todo.id) {
        return { ...todo };
      }
      return todoItem;
    });
  }

  function deleteTodoItem(todoId) {
    todos.value = todos.value.filter((todoItem) => todoItem.id !== todoId);
  }

  function resetTodosData() {
    todos.value = [];
  }

  return {
    todos,
    todosStatuses,
    loadingData,
    loadTodosData,
    setTodosData,
    setTodosStatusesData,
    updateTodoItem,
    deleteTodoItem,
    resetTodosData,
  };
});
