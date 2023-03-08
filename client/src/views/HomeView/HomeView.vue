<script setup>
import { ref, onBeforeMount } from 'vue';
import { useTodosStore } from '../../stores/todos';
import CircleLoader from '../../components/CircleLoader/CircleLoader.vue';
import DashboardHeader from '../../components/DashboardHeader/DashboardHeader.vue';
import TodoItem from './components/TodoItem/TodoItem.vue';
import CreateTaskModal from './components/CreateTaskModal/CreateTaskModal.vue';

const todos = useTodosStore();

const showAddTaskModal = ref(false);
const todoToUpdate = ref(null);

const handleSelectTodoToUpdate = (todo) => {
  todoToUpdate.value = { ...todo };
  toggleModal();
};

const handleOpenCreateModal = () => {
  todoToUpdate.value = null;
  toggleModal();
};

const toggleModal = () => {
  showAddTaskModal.value = !showAddTaskModal.value;
};

onBeforeMount(() => {
  todos.loadTodosData();
});
</script>

<template>
  <v-layout>
    <DashboardHeader />
    <div class="content-container">
      <v-container>
        <div class="d-flex justify-center mb-8 position-relative">
          <h1>My todo list</h1>

          <v-menu>
            <template v-slot:activator="{ props }">
              <v-btn
                class="todos-actions-btn position-absolute"
                icon="mdi-dots-vertical"
                v-bind="props"
              ></v-btn>
            </template>

            <v-list class="mt-3">
              <v-list-item @click="handleOpenCreateModal">
                <v-list-item-title class="d-flex align-center">
                  <v-icon icon="mdi-plus"></v-icon>
                  <span>Add Task</span>
                </v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>
        </div>
        <v-row class="todos-list-container justify-space-evenly">
          <TodoItem
            v-for="(todo, i) in todos.todos"
            v-bind:key="todo.id"
            :todo="todo"
            :number="i + 1"
            :onSelect="handleSelectTodoToUpdate"
          />
        </v-row>
        <CircleLoader
          :loading="todos.loadingData"
          class="home-loader"
          color="warning"
          width="6"
          size="40"
        />
      </v-container>
    </div>
    <CreateTaskModal
      v-if="showAddTaskModal"
      :toggle="toggleModal"
      :todoToUpdate="todoToUpdate"
    />
  </v-layout>
</template>

<style src="./HomeView.css" scoped></style>
