<template>
  <DiskForm v-if="$store.state.isShowUploadForm" :form-id="'main-upload-form'"/>
  <HeaderBlock></HeaderBlock>
  <DiskTable></DiskTable>
  <Loader v-if="$store.state.isShowLoader"/>
</template>

<script>
import DiskForm from "@/components/UI/DiskForm/DiskForm";
import DiskTable from "@/components/UI/DiskTable/DiskTable";
import HeaderBlock from "@/components/UI/HeaderBlock/HeaderBlock";
import Loader from "@/components/Loader/Loader";

export default {
  name: "MainPage",
  components: {
    Loader,
    HeaderBlock,
    DiskTable,
    DiskForm
  },
  mounted() {
    this.$store.dispatch('GET_DISK_INFO')
    this.$store.dispatch('GET_RESOURCE', {'path': ''})
  },
}
</script>

<style scoped>

</style>