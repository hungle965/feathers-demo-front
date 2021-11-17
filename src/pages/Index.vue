<script setup lang="ts">
import ChatBox from 'src/components/ChatBox.vue'

import { useStore } from 'src/store'
import { computed } from 'vue'

const store = useStore()

const listTask = computed({
  get: () => store.state.listTask.ListTask,
  set: (val) => {
    store.commit('list-task/addTask', val)
  }
})

const handleAddTaskClick = () => {
  store.commit('listTask/addTask', {
    id: listTask.value.length,
    name: `name of task ${listTask.value.length + 1}`
  })
}
</script>

<template>
  <button @click="handleAddTaskClick">add task</button>
  <ul>
    <li v-for="task in listTask" :key="task.id">
      {{ task.id }} - {{ task.name }}
    </li>
  </ul>
  <ChatBox />
</template>
