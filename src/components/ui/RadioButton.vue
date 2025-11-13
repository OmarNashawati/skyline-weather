<script setup>
const props = defineProps(['text', 'value', 'modelValue'])
const emit = defineEmits(['update:modelValue'])
</script>

<template>
  <label :for="value" class="radio" :class="{ selected: modelValue === value }">
    {{ text }}
    <input
      :id="value"
      type="radio"
      :value="value"
      :checked="value === modelValue"
      @change="emit('update:modelValue', value)"
    />
  </label>
</template>

<style lang="scss" scoped>
.radio {
  width: 40px;
  height: 40px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background: var(--white);
  border-radius: 100%;
  cursor: pointer;

  &.selected {
    background: var(--dark);
    color: var(--white);
  }

  input[type='radio'] {
    display: none;
  }
}
</style>
