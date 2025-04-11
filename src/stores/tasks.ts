import { ref, computed, watch } from 'vue'
import { defineStore } from 'pinia'

export const useTasksStore = defineStore('tasks', () => {
  interface ITask {
    id: number
    title: string
    done: boolean
  }

  const savedTasks = localStorage.getItem('tasks')
  const tasks = ref<ITask[]>(savedTasks ? JSON.parse(savedTasks) : undefined)

  watch(
    tasks,
    (newTasks) => {
      if (newTasks) {
        localStorage.setItem('tasks', JSON.stringify(newTasks))
      }
    },
    { deep: true },
  )

  const tasksConstructor = computed({
    get: () => tasks.value,
    set: (newValue) => {
      if (!newValue) return
      tasks.value = newValue
    },
  })

  const getIsTaskListLoaded = computed(() => tasks.value !== undefined)

  const toggleTaskDone = (taskId: number) => {
    tasksConstructor.value = tasks.value?.map((task) =>
      task.id === taskId ? { ...task, done: !task.done } : task,
    )
  }

  return { tasksConstructor, getIsTaskListLoaded, toggleTaskDone }
})
