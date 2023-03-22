<script setup>
import { ref, onBeforeMount, computed } from 'vue';
import { useStore } from 'vuex';
import { apiAgent } from '../../../../utils/agent';
import FormInput from '../../../../components/FormInput/FormInput.vue';
import FormTextArea from '../../../../components/FormTextArea/FormTextArea.vue';

const props = defineProps({
  toggle: Function,
  todoToUpdate: Object,
});

const store = useStore();

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
  if (taskTitle.value?.length) {
    const url = isEdit.value ? '/todos/update' : '/todos/create';
    const data = isEdit.value
      ? {
          todoId: props.todoToUpdate.id,
          title: taskTitle.value,
          description: taskDescription.value,
        }
      : {
          title: taskTitle.value,
          description: taskDescription.value,
        };

    apiAgent.post(url, data).then(() => {
      if (isEdit.value) {
        store.dispatch('updateTodoItem', {
          ...props.todoToUpdate,
          title: taskTitle.value,
          description: taskDescription.value,
        });
      } else {
        store.dispatch('loadTodosData');
      }
      taskTitle.value = '';
      taskDescription.value = '';
      props.toggle();
    });
  }
};

onBeforeMount(() => {
  if (isEdit.value) {
    taskTitle.value = props.todoToUpdate.title;
    taskDescription.value = props.todoToUpdate.description;
  }
});
const isEdit = computed(() => !!props.todoToUpdate);
</script>

<template>
  <div
    @click.self="toggle"
    class="modal-wrapper-container d-flex align-center justify-center position-absolute"
  >
    <v-card class="modal-container">
      <v-row class="justify-center mb-8">
        <h2>
          {{
            isEdit ? `Edit task "${props.todoToUpdate.title}"` : 'Add new task'
          }}
        </h2>
      </v-row>
      <v-form fast-fail @submit.stop.prevent="handleSubmit">
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
          <v-btn type="submit" class="">
            {{ isEdit ? `Edit task` : 'Add task' }}
          </v-btn>
        </v-row>
      </v-form>
    </v-card>
  </div>
</template>

<style src="./CreateTaskModal.css" scoped></style>
