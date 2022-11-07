<template>
  <DiskTableBlockElement
      :item=tableElement
  />
</template>

<script>
import DiskTableBlockElement
  from "@/components/UI/DiskTable/DiskTableBlock/DiskTableBlockElement/DiskTableBlockElement";
export default {
  name: "DiskTableRow",
  components: {
    DiskTableBlockElement
  },
  props: {
    tableElement: {
      type: Object,
      default: ''
    }
  }
}
</script>

<style scoped>

</style>