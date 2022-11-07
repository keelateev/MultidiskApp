<template>
  <tr class="disk-table__item" :class="{
    'disk-table__item--dir': item.type === 'dir',
    'disk-table__item--file': item.type === 'file'
  }">
    <td v-if="item.type === 'dir'" class="disk-table__item__name" @click="goToDir" :data-path="item.path">{{
        item.name
      }}
    </td>
    <td v-if="item.type === 'file'" class="disk-table__item__name" :data-path="item.path">{{ item.name }}</td>
    <td>{{fileType}}</td>
    <td>{{formatBytes(item.size)}}</td>
    <td>
      <div class="disk-table__item__controls">
      <GeneralButton v-if="item.actions.indexOf('download') !== -1" @click="downloadFile" :button="{text:'Скачать'}"/>
      <GeneralButton v-if="item.actions.indexOf('rename') !== -1" @click="renameFile" :button="{text:'Переименовать'}"/>
      <GeneralButton v-if="item.actions.indexOf('delete') !== -1" @click="deleteFile" :button="{text:'Удалить'}"/>
      </div>
    </td>
  </tr>
</template>

<script>
import GeneralButton from "@/components/GeneralComponents/GeneralButtom/GeneralButton";
export default {
  name: "DiskTableBlockElement",
  components: {GeneralButton},
  props: {
    item: {
      type: Object,
      default: ''
    },
    fileType: {
      type: String,
      default: ''
    }
  },
  methods: {
    deleteFile() {
      if( confirm('Вы точно хотите удалить ' + this.item.name)) {
        this.$store.dispatch('DELETE_FILE', this.item.path)
      }
    },
    downloadFile() {
      this.$store.dispatch('DOWNLOAD_FILE', this.item.path)
    },
    renameFile() {
      let result = prompt('Переименовать', this.item.name)
      if(result !== null && result !== this.item.name && result !== '') {
        this.$store.dispatch('RENAME_FILE', {'resource' : this.item.path, 'newResourceName': result})
      }
    },
    goToDir(ev) {
      this.$store.commit('CHANGE_ROOT_ELEMENT', {name: 'paginationCurrent', value: 1})
      this.$store.dispatch('GET_RESOURCE', {'path': ev.target.getAttribute('data-path')})
    },
  },
  computed: {
    fileType() {
      if(this.item.type === 'dir') {
        return 'Папка';
      }
      if(this.item.type === 'file') {
        return 'Файл';
      }
      return '';
    }
  }
}

</script>

<style lang="less" scoped>

</style>