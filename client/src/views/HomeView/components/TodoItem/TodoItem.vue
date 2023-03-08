<script setup>
import { computed } from 'vue';
import { useTodosStore } from '../../../../stores/todos';
import { apiAgent } from '../../../../utils/agent';
import dayjs from 'dayjs';

const props = defineProps({
  todo: Object,
  number: Number,
});

const todos = useTodosStore();

const handleChangeStatus = (status) => {
  apiAgent
    .post('/todos/updateStatus', {
      todoId: props.todo.id,
      status: status.id,
    })
    .then(() => {
      const updatedTodo = { ...props.todo, status };
      todos.updateTodoItem(updatedTodo);
    });
};

const handleDelete = () => {
  apiAgent
    .post('/todos/delete', {
      todoId: props.todo.id,
    })
    .then(() => {
      todos.deleteTodoItem(props.todo.id);
    });
};

const containerClasses = computed(
  () =>
    `todo-item-container ${props.todo?.status?.name
      .split(' ')
      .join('-')
      .toLowerCase()}`,
);

const statusesRow = computed(() => {
  return todos.todosStatuses.map((item) => {
    const state =
      item.id < props.todo.status.id
        ? 'passed'
        : item.id === props.todo.status.id
        ? 'current'
        : '';
    return {
      ...item,
      state,
    };
  });
});

const todoDate = computed(() => {
  return dayjs(props.todo.created_at).format('YYYY-MM-DD HH:mm');
});
</script>

<template>
  <v-card :class="containerClasses">
    <v-row class="justify-space-between task-sub-data">
      <span>#{{ number }}</span>
      <span>{{ todoDate }}</span>
    </v-row>
    <v-row class="todo-title justify-center mb-4">
      <span>{{ todo.title }}</span>
    </v-row>
    <v-row class="todo-description mb-4">
      {{ todo.description }}
    </v-row>

    <v-row class="justify-space-between" v-if="todo.status.name === 'Done'">
      <div class="status-label no-activity">Done!</div>
      <div class="status-label remove-label" @click="handleDelete">
        Remove task
      </div>
    </v-row>

    <v-row class="justify-space-between" v-else>
      <div
        v-for="status in statusesRow"
        v-bind:key="status.id"
        :class="`status-label ${status.state}`"
        @click="handleChangeStatus(status)"
      >
        {{ status.name }}
      </div>
    </v-row>
  </v-card>
</template>

<style src="./TodoItem.css" scoped></style>
