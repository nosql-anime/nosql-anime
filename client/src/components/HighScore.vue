<template>
  <div class="highscores">
    <h3 class="main-title">Top 5 anime</h3>
    <div class="hs-items">
      <div class="hs-item-header row">
        <div class="col-2">Rank</div>
        <div class="col-8">Title</div>
        <div class="col-2">Score</div>
      </div>
      <div class="hs-item row" v-for="(item, index) in items" :key=item.id>
        <div class="col-2 rank">{{ index + 1 }}</div>
        <div class="col-8 title">{{ item.title }}</div>
        <div class="col-2 score">{{ item.score }}</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      items: [
        {id: 1, title: 'asd', score: 9, genre: ['asd', 'jkl']},
        {id: 2, title: 'asd', score: 8.5, genre: ['asd', 'jkl']},
        {id: 3, title: 'asd', score: 8, genre: ['asd', 'jkl']},
        {id: 4, title: 'asd', score: 8, genre: ['asd', 'jkl']},
        {id: 5, title: 'asd', score: 8, genre: ['asd', 'jkl']}
      ]
    }
  }
}
</script>

<style scoped>
  .highscores {
    margin: 16px auto;
    width: 400px;
  }
  .main-title {
    color: #B55555;
  }
  .hs-item-header {
    margin: 8px 0;
    padding: 8px;
    width: 400px;
  }
  .hs-item {
    border: solid 4px #434C3A;
    color: #B55555;
    margin: 8px 0;
    padding: 8px;
  }
  .hs-item .title {
    text-align: start;
  }
</style>
