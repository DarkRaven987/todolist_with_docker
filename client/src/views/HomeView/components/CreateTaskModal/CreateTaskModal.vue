<script setup>
import { ref } from 'vue';
import { useTodosStore } from '../../../../stores/todos';
import { apiAgent } from '../../../../utils/agent';
import FormInput from '../../../../components/FormInput/FormInput.vue';
import FormTextArea from '../../../../components/FormTextArea/FormTextArea.vue';

const props = defineProps({
  displayed: Boolean,
  toggle: Function,
});

const todos = useTodosStore();

const taskTitle = ref('');
const taskDescription = ref('');

const titleRules = [
  (value) => {
    if (!value) return 'Title is requried';
    return true;
  },
];

const handleTitle = (e) => {
  taskTitle.value = e.target.value;
};

const handleDescription = (e) => {
  taskDescription.value = e.target.value;
};

const handleSubmit = () => {
  if (taskTitle.value?.length)
    apiAgent
      .post('/todos/create', {
        title: taskTitle.value,
        description: taskDescription.value,
      })
      .then(() => {
        taskTitle.value = '';
        taskDescription.value = '';
        todos.loadTodosData();
        props.toggle();
      });
};
</script>

<template>
  <div
    v-if="displayed"
    @click.self="toggle"
    class="modal-wrapper-container d-flex align-center justify-center position-absolute"
  >
    <v-card class="modal-container">
      <v-row class="justify-center mb-8">
        <h2>Add new task</h2>
      </v-row>
      <v-form fast-fail @submit.prevent="handleSubmit">
        <FormInput
          class="mb-6"
          id="title"
          label="Title"
          type="text"
          :value="taskTitle"
          :rules="titleRules"
          @input="handleTitle"
        />
        <FormTextArea
          id="description"
          label="Description"
          :value="taskDescription"
          @input="handleDescription"
        />
        <v-row class="d-flex justify-space-between mt-10">
          <v-btn class="" @click="toggle">Cancel</v-btn>
          <v-btn type="submit" class="">Add Task</v-btn>
        </v-row>
      </v-form>
    </v-card>
  </div>
</template>

<style src="./CreateTaskModal.css" scoped></style>
