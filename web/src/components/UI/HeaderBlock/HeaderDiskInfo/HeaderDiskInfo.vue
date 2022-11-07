<template>
  <div class="header-disk-info">
    <div>
      <p class="header-disk-info__user-name">{{ this.$store.state.diskInfo.user_name }}</p>
      <p class="header-disk-info__space header-disk-info__space--total">Свободно:
        {{ this.formatBytes(this.$store.state.diskInfo.total_space) }}</p>
      <p class="header-disk-info__space header-disk-info__space--total">Общий объём:
        {{ this.formatBytes(this.$store.state.diskInfo.free_space) }}</p>
    </div>
    <div>
      <GeneralButton :class="'header-disk-info__upload-btn'" @click="showUploadForm"
                     :button="{
      text: 'Загрузить'
    }"
      />
      <GeneralButton :class="'header-disk-info__upload-btn'" @click="unLogin"
                     :button="{
      text: 'Выйти'
    }"
      />
    </div>
  </div>
</template>

<script>
import GeneralButton from "@/components/GeneralComponents/GeneralButtom/GeneralButton";

export default {
  name: "HeaderDiskInfo",
  components: {
    GeneralButton
  },
  methods: {
    showUploadForm() {
      this.$store.commit('CHANGE_ROOT_ELEMENT', {name: 'isShowUploadForm', value: true})
    },
    unLogin() {
      this.$store.dispatch('UNLOGIN')
    }
  }
}
</script>

<style lang="less" scoped>
.header-disk-info {
  display: flex;
  justify-content: space-between;
  border: 1px solid;
  padding: 5px 10px;
  margin-bottom: 20px;

  p {
    padding: 0 5px;
  }

  &__space {
    font-size: 14px;
  }

  &__upload-btn {
    margin: 10px 0;
    width: 196px;
    height: 36px;
    border: unset;
    display: flex;
    align-items: center;
    justify-content: center;
    background: #ffdb4d;
    cursor: pointer;
    user-select: none;

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
}
</style>