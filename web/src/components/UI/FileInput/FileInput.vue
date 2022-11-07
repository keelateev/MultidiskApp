<template>
  <div @click="choiceFile" class="input-file-btn">

  </div>
  <GeneralInput @change="prepareUpload" :hidden="true"
                :input="{
        type: 'file',
        name: 'upload-file',
    }"
                :multiple="true"
  />
  <ul class="disk-form__file-list">
    <li v-for="element in selectedFiles">{{ element.name }} ({{ formatBytes(element.size) }})</li>
  </ul>
</template>

<script>
import GeneralInput from "@/components/GeneralComponents/GeneralInput/GeneralInput";

export default {
  name: "FileInput",
  data() {
    return {
      selectedFiles: []
    }
  },
  props: {
    formId: {
      Type: String,
      default: ''
    },
    inputName: {
      Type: String,
      default: ''
    },
  },
  components: {
    GeneralInput
  },
  methods: {
    choiceFile() {
      let fileInput = this.form.querySelector('[name=upload-file]');
      fileInput.click();
    },
    prepareUpload(ev) {
      let fileInput = ev.target.files;
      let filesCount = fileInput.length;
      if (filesCount > 0) {
        for (let i = 0; i < filesCount; i++) {
          this.selectedFiles.push(fileInput[i]);
        }
        this.$store.commit('CHANGE_ROOT_ELEMENT', {name: 'uploadFormReadyForSubmit', value: true})
      }
    }
  },
  mounted() {
    this.$store.commit('CHANGE_ROOT_ELEMENT', {name: 'uploadFormReadyForSubmit', value: false})
  },
  computed: {
    form() {
      return document.getElementById(this.formId)
    }
  }
}
</script>

<style lang="less" scoped>
.input-file-btn {
  cursor: pointer;
  background-image: url("/public/assets/file.svg");
  background-position: center;
  background-repeat: no-repeat;
  width: 100px;
  height: 100px;
  opacity: 1;
  transition: 150ms;
  margin-bottom: 5px;

  &:hover {
    opacity: 0.6;
  }

  &:active {
    opacity: 1;
  }
}
</style>