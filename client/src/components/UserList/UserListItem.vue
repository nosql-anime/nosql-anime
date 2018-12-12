<template>
    <div class="list-item row" v-bind:class="{'edit-mode': isEditMode}">
        <div class="col-4">{{ item.name }}</div>
        <div v-if="!isEditMode" class="col-2">{{ item.currentEpisode }}</div>
        <div v-if="!isEditMode" class="col-2">{{ item.score }}</div>
        <div v-if="!isEditMode" class="col-2">{{ item.completed }}</div>
        <div v-if="isEditMode" class="col-2">
          <select v-model="item.currentEpisode" >
            <option v-for="i in parseInt(item.episodes)" :key="i">{{i}}</option>
          </select>
        </div>
        <div v-if="isEditMode" class="col-2">
          <select v-model="item.score">
            <option v-for="i in 10" :key="i">{{i}}</option>
          </select>
        </div>
        <div v-if="isEditMode" class="col-2">
          <select v-model="item.completed">
            <option>true</option>
            <option>false</option>
          </select></div>
        <div class="col-1">
          <div v-on:click="toggleEditMode" class="edit-btn">
            <i v-if="!isEditMode" class="fas fa-cog"></i>
            <i v-else class="fas fa-times-circle"></i>
          </div>
        </div>
        <div v-if="!isEditMode" class="col-1">
          <div v-on:click="deleteAnime" class="delete-btn">x</div>
        </div>
        <div v-if="!isEditMode" class="col-1"></div>
    </div>
</template>

<script>
import Axios from 'axios'
export default {
  props: ['item'],
  data () {
    return {
      isEditMode: false
    }
  },
  methods: {
    deleteAnime () {
      this.$emit('delete', this.item.aid)
    },
    toggleEditMode () {
      if (this.isEditMode) {
        Axios.post('/users/animes', {
          headers: {
            'Content-Type': 'application/json'
          },
          token: this.$store.getters.accessToken,
          aid: this.item.aid,
          name: this.item.name,
          score: this.item.score,
          episodes: this.item.episodes,
          currentEpisode: this.item.currentEpisode,
          completed: this.item.completed
        })
        this.isEditMode = false
      } else {
        this.isEditMode = true
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

    .delete-btn {
      background-color: #B55555;
      border-radius: 50px;
      border: none;
      color: #E7E0D9;
      font-family: 'Open Sans';
      height: 24px;
      text-align: center;
      width: 24px;
    }

    .delete-btn:hover {
      background-color: #E59D92;
      cursor: pointer;
    }

</style>
