<template>
    <div class="list-item row">
        <div class="col-6">{{ item.name }}</div>
        <div class="col-2">{{ item.episodes }}</div>
        <div class="col-2">{{ item.score }}</div>
        <div class="col-2">
          <div class="add-btn"
                v-bind:class="{ disabled: !loggedIn }"
                v-bind:title="loggedIn ? 'Add to my list' : 'You have to log in for this'">+</div>
        </div>
    </div>
</template>

<script>
export default {
  props: ['item'],
  computed: {
    loggedIn () {
      return this.$store.getters.loggedIn
    }
  }
}
</script>

<style scoped>
  .list-item {
    padding: 0 8px;
    text-align: start;
    width: 100%;
  }

    .add-btn {
      background-color: #6B9D80;
      border-radius: 50px;
      border: none;
      color: #E7E0D9;
      height: 24px;
      text-align: center;
      width: 24px;
    }

    .add-btn:hover {
      background-color: #434C3A;
      cursor: pointer;
    }

    .add-btn.disabled {
      cursor: not-allowed;
    }
</style>
