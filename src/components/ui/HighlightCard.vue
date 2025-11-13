<script setup>
const props = defineProps({
  title: {
    type: String,
    required: true,
  },
})
</script>

<template>
  <div class="highlight-card">
    <h3>{{ title }}</h3>
    <div class="highlight-content">
      <slot></slot>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.highlight-card {
  background: var(--background);
  border-radius: 1rem;
  padding: 1rem;
  height: 180px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  h3 {
    color: var(--text-soft);
    font-weight: 400;
    font-size: 1rem;
  }
}
</style>
