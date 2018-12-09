<template>
    <div class="list-item row">
        <div class="col-8">{{ item.title }}</div>
        <div class="col-2">{{ item.score }}</div>
        <div class="col-2">{{ item.genre.join(', ') }}</div>
    </div>
</template>

<script>
export default {
  props: ['item']
}
</script>

<style scoped>
  .list-item {
    padding: 0 8px;
    text-align: start;
    width: 100%;
  }
</style>
