<script setup lang="ts">
import Task from './components/Task.vue'
import { useTasksStore } from './stores/tasks'
import { onBeforeMount } from 'vue'

const tasksStore = useTasksStore()

onBeforeMount(() => {
  if (!tasksStore.getIsTaskListLoaded) {
    fetchTasks()
  }
})

const fetchTasks = async () => {
  try {
    const response = await fetch('/tasks.json')
    if (!response.ok) {
      throw new Error('Не удалось загрузить задачи')
    }
    const data = await response.json()
    tasksStore.tasksConstructor = data
  } catch (error) {
    console.error('Ошибка при загрузке задач:', error)
  }
}

const handleTaskCheckBoxClick = (id: string) => {
  tasksStore.toggleTaskDone(Number(id))
}
</script>

<template>
  <div v-if="tasksStore.tasksConstructor" class="tasks">
    <Task
      v-for="({ id, title, done }, i) in tasksStore.tasksConstructor"
      :key="`Task_${i}`"
      :title="title"
      :done="done"
      :id="id"
      @onCheckBoxClick="handleTaskCheckBoxClick"
    />
  </div>
</template>

<style scoped>
.tasks {
  display: flex;
  flex-direction: column;
  gap: 10px;
}
</style>
