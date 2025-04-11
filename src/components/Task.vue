<script setup lang="ts">
const props = defineProps<{
  id: number
  title: string
  done: boolean
}>()

const emit = defineEmits(['onCheckBoxClick'])

const handleCheckBoxChange = (event: Event) => {
  event.preventDefault()
  emit('onCheckBoxClick', props.id)
}
</script>

<template>
  <div class="Task">
    <label :for="`task-checkbox-${id}`" class="task-title">{{ title }}</label>
    <input
      type="checkBox"
      :id="`task-checkbox-${id}`"
      :checked="done"
      @change="handleCheckBoxChange"
    />
  </div>
</template>

<style scoped>
.Task {
  display: flex;
  gap: 10px;
}

.task-title {
  cursor: pointer;
  user-select: none;
}
</style>
