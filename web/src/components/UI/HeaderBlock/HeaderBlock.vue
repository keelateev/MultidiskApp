<template>
  <header class="header">
    <HeaderDiskInfo v-if="Object.entries(this.$store.state.diskInfo).length !== 0"/>
  </header>
</template>

<script>
import DiskForm from "@/components/UI/DiskForm/DiskForm";
import HeaderDiskInfo from "@/components/UI/HeaderBlock/HeaderDiskInfo/HeaderDiskInfo";

export default {
  name: "HeaderBlock",
  components: {
    HeaderDiskInfo,
    DiskForm,
  }
}
</script>

<style lang="less" scoped>
.header {
  margin: 10px 0;
}
</style>