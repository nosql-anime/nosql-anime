<template>
  <div class="carousel">
    <b-carousel style="text-shadow: 1px 1px 2px #333;"
                controls
                indicators
                background="#ababab"
                :interval="4000"
                img-width="640"
                img-height="360"
                v-model="slide"
                @sliding-start="onSlideStart"
                @sliding-end="onSlideEnd">

      <b-carousel-slide caption="First slide"
                        text="Nulla vitae elit libero, a pharetra augue mollis interdum."
                        img-src="http://via.placeholder.com/640x360"
                        img-width="640"
                        img-height="360"
      ></b-carousel-slide>

      <b-carousel-slide img-src="http://via.placeholder.com/640x360"
                        img-width="640"
                        img-height="360">
        <h1>Hello world!</h1>
      </b-carousel-slide>

      <b-carousel-slide img-src="http://via.placeholder.com/640x360"
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
