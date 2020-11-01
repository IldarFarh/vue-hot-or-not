<template>
  <div class="image-card">
    <img class="image" :src="imgSrc" />
  </div>
</template>

<script>
export default {
  name: 'ImageCard',
  props: {
    imgSrc: String
  }
}
</script>

<style lang="scss">
  .image-card {
    width: 80%;
    height: 75vh;
    background-color: bisque;
    position: absolute;
    display: flex;
    align-items: center;
    left: 50%;
    transform: translateX(-50%);
    transform-origin: 50% 99%;
    border-radius: 3%;
    overflow: hidden;

    .image {
      width: 100%;
    }

    &.to-left {
      transition: all 0.7s ease-out;
      transform: translateX(-30rem) rotate(-30deg) !important;
      opacity: 0;
    }

    &.to-right {
      transition: all 0.7s ease-out;
      transform: translateX(30rem) rotate(30deg) !important;
      opacity: 0;
    }
  }

</style>
