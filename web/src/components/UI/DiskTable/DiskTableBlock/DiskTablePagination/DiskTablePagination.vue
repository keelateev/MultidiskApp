<template>
  <tr>
    <td colspan="4" class="disk-table__pagination">
      <div  class="disk-table__pagination__controls">
        <GeneralButton class="disk-table__pagination__button" @click="previewPage" :button="{text: '<'}"
                       :disabled="$store.state.diskStore.paginationCurrent === 1"/>
        <div class="disk-table__pagination__page" v-for="page in pages"
             :class="{
        'disk-table__pagination__page--current': page === $store.state.diskStore.paginationCurrent
      }"
        ><span>{{ page }}</span>
        </div>
        <GeneralButton class="disk-table__pagination__button" @click="nextPage" :button="{text: '>'}"
                       :disabled="$store.state.diskStore.paginationAllow === 0"/>
      </div>
    </td>
  </tr>
</template>

<script>
import GeneralButton from "@/components/GeneralComponents/GeneralButtom/GeneralButton";

export default {
  name: "DiskTablePagination",
  components: {
    GeneralButton
  },
  methods: {
    previewPage() {
      this.$store.commit('CHANGE_DISK_STORE_ELEMENT', {
        name: 'paginationCurrent',
        value: this.$store.state.diskStore.paginationCurrent - 1
      })
      this.$store.commit('CHANGE_DISK_STORE_ELEMENT', {
        name: 'paginationAllow',
        value: this.$store.state.diskStore.paginationAllow + 1
      })
      this.$store.dispatch('GET_RESOURCE',  {path: this.$store.state.diskStore.currentPath})
    },
    nextPage() {
      this.$store.commit('CHANGE_DISK_STORE_ELEMENT', {
        name: 'paginationCurrent',
        value: this.$store.state.diskStore.paginationCurrent + 1
      })
      this.$store.commit('CHANGE_DISK_STORE_ELEMENT', {
        name: 'paginationAllow',
        value: this.$store.state.diskStore.paginationAllow - 1
      })
      this.$store.dispatch('GET_RESOURCE', {path: this.$store.state.diskStore.currentPath})
    }
  },
  computed: {
    pages() {
      let current = this.$store.state.diskStore.paginationCurrent;
      let allow = this.$store.state.diskStore.paginationAllow;
      let pages = [];
      switch (current) {
        case 1:
          pages = [1]
          break;
        case 2:
          pages = [1, 2]
          break;
        default:
          pages = [current - 2, current - 1, current]
          break;
      }
      let maxPageNumber = current + allow;
      for (let i = current + 1; i <= maxPageNumber; i++) {
        pages.push(i)
      }
      return pages;
    }
  }
}
</script>

<style scoped>

</style>