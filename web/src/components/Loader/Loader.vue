<template>
<div class="loader-wrapper">

</div>
</template>

<script>
export default {
  name: "Loader"
}
</script>

<style lang="less" scoped>
.loader-wrapper {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 10;
  width: 100%;
  height: 100%;

  background-image: url("/public/assets/loading.gif");
  background-color: rgba(0, 0, 0, 0.25);
  background-size: 10%;
  background-position: center;
  background-repeat: no-repeat;
}
</style>