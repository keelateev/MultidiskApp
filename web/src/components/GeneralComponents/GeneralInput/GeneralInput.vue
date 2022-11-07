<template>
  <input :type="input.type" :name="input.name" :placeholder="input.placeholder" :value="input.value">
</template>

<script>
export default {
  name: "GeneralInput",
  props: {
    input: {
      Type: Object,
      default: {}
    }
  }
}
</script>

<style scoped>

</style>