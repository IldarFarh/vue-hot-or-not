<template>
  <div class="board">
    <h1>{{ msg }}</h1>
    <div v-if="$store.state.photoStack.length" v-touch:swipe.left="dislikeBtn" v-touch:swipe.right="likeBtn" >
      <ImageCard
        v-for="(photo, index) in $store.state.photoStack"
        :class="index === 0 ? actionClass : ''"
        :key="index"
        :style="`z-index: ${$store.state.photoStack.length - index}`"
        :imgSrc="photo"
      />
    </div>
    <div v-else>
      Loading...
    </div>
    <div class="btn-group">
      <p>{{$store.state.disliked.length}}</p>
      <div class="btn" @click="dislikeBtn"><DislikeIcon /></div>
      <div class="btn" @click="likeBtn"><LikeIcon /></div>
      <p>{{$store.state.liked.length}}</p>
    </div>
  </div>
</template>

<script>
import ImageCard from './ImageCard'
import LikeIcon from './icons/like'
import DislikeIcon from './icons/dislike'

export default {
  name: 'Board',
  props: {
    msg: String
  },
  data () {
    return {
      actionClass: ''
    }
  },
  components: {
    ImageCard,
    LikeIcon,
    DislikeIcon
  },
  methods: {
    likeBtn () {
      this.actionClass = 'to-right'
      setTimeout(() => {
        this.$store.dispatch('giveLike')
        this.actionClass = ''
      }, 500)
    },
    dislikeBtn () {
      this.actionClass = 'to-left'
      setTimeout(() => {
        this.$store.dispatch('discard')
        this.actionClass = ''
      }, 500)
    }
  },
  mounted () {
    this.$store.dispatch('getPhotos')
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
  .board {
    width: 100%;
    height: 100vh;
    position: relative;
    overflow: hidden;
    background-color: rgb(245, 247, 250);
  }
  .btn-group {
    position: absolute;
    top: 90vh;
    left: 30%;
    display: flex;
    width: 40%;
    align-items: center;
    justify-content: space-around;
    .btn {
      width: 50px;
      height: 50px;
    }
  }
</style>
