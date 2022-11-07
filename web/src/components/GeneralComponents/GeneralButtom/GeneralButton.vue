<template>
  <button :id="button.id" :type="button.type">{{ button.text }}</button>
</template>

<script>
export default {
  name: "GeneralButton",
  props: {
    button: {
      Type: Object,
      default: {}
    },
    formId: {
      Type: String,
      default: ''
    }
  }
}
</script>

<style lang="less">
button {
  margin: 10px;
  width: 196px;
  height: 36px;
  border: unset;
  display: flex;
  align-items: center;
  justify-content: center;
  background: white;
  cursor: pointer;
  user-select: none;
  border: 1px solid;

  opacity: 1;
  transition: 150ms;

  &:hover {
    opacity: 0.6;
  }

  &:active {
    opacity: 1;
  }

  &:is(:disabled) {
    pointer-events: none;
  }
}
</style>