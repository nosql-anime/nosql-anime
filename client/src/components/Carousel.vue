<template>
  <div class="carousel">
    <b-carousel style="text-shadow: 1px 1px 2px #333;"
                controls
                indicators
                background="#ababab"
                :interval="3000"
                img-width="640"
                img-height="360"
                v-model="slide"
                @sliding-start="onSlideStart"
                @sliding-end="onSlideEnd">

      <b-carousel-slide img-src="https://www.animemaru.com/wp-content/uploads/2017/06/ranoutofphotochopideasfitemebitch.png"
                        img-width="640"
                        img-height="360"
      ></b-carousel-slide>

      <b-carousel-slide img-src="https://cdn1-33b9.kxcdn.com/wp-content/uploads/2015/10/One-Punch-man-640x360.jpg?x89779"
                        img-width="640"
                        img-height="360">
      </b-carousel-slide>

      <b-carousel-slide img-src="https://pm1.narvii.com/6788/8b5d400caa0890ac06ff75a95d2184bdf666db5dv2_hq.jpg"
                        img-width="640"
                        img-height="360">
      </b-carousel-slide>

    </b-carousel>

  </div>
</template>

<script>
export default {
  data () {
    return {
      slide: 0,
      sliding: null
    }
  },
  methods: {
    onSlideStart (slide) {
      this.sliding = true
    },
    onSlideEnd (slide) {
      this.sliding = false
    }
  }
}
</script>

<style scoped>
  .carousel {
    margin: auto;
    width: 640px;
  }
</style>
