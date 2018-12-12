<template>
    <div class="list-item row">
        <div class="col-6">{{ item.name }}</div>
        <div class="col-2">{{ item.episodes }}</div>
        <div class="col-2">{{ item.score }}</div>
        <div class="col-2">
          <div class="add-btn"
                v-on:click="addToList"
                v-bind:class="{ disabled: !loggedIn }"
                v-bind:title="loggedIn ? 'Add to my list' : 'You have to log in for this'">+</div>
        </div>
    </div>
</template>

<script>
import Axios from 'axios'
export default {
  props: ['item'],
  computed: {
    loggedIn () {
      return this.$store.getters.loggedIn
    }
  },
  methods: {
    addToList () {
      if (this.loggedIn) {
        Axios.post('/users/animes', {
          headers: {
            'Content-Type': 'application/json',
            Authorization: this.$store.getters.accessToken
          },
          token: this.$store.getters.accessToken,
          aid: this.item._id,
          name: this.item.name,
          score: this.item.score,
          episodes: this.item.episodes,
          currentEpisode: 1,
          completed: false
        })
      }
    }
  }
}
</script>

<style scoped>
  .list-item {
    height: 32px;
    margin: 8px;
    padding: 8px 8px;
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
