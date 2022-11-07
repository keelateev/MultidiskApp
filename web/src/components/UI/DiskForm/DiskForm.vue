<template>
  <div @click="closeModal" class="form-wrapper">
    <div class="disk-form" :id="formId">
      <FileInput
          :form-id="formId"
      />
      <GeneralButton @click="submitFile" :class="'disk-form__upload-btn'"
                     :disabled="!($store.state.uploadFormReadyForSubmit && $store.state.uploadFormSubmitted)"
                     :button="{
        text: uploadBtnText,
        type: 'button',
      }"
                     :form-id="formId"
      />
      <p class="disk-form__comment">Файл будет загружен в текущую папку. <br><span>При наличии файла с таким же названием - исходный будет перезаписан</span>
      </p>
    </div>
  </div>
</template>

<script>
import GeneralButton from "@/components/GeneralComponents/GeneralButtom/GeneralButton";
import GeneralInput from "@/components/GeneralComponents/GeneralInput/GeneralInput";
import FileInput from "@/components/UI/FileInput/FileInput";

export default {
  name: "DiskForm",
  props: {
    formId: {
      Type: String,
      default: ''
    }
  },
  components: {
    FileInput,
    GeneralInput,
    GeneralButton
  },
  methods: {
    closeModal(e) {
      const withinBoundaries = e.composedPath().includes(this.form);
      if (!withinBoundaries) {
        this.$store.commit('CHANGE_ROOT_ELEMENT', {name: 'isShowUploadForm', value: false})
      }
    },
    submitFile() {
      let fileInput = this.form.querySelector('[name=upload-file]');
      if (typeof fileInput.files[0] !== 'undefined') {
        this.$store.commit('CHANGE_ROOT_ELEMENT', {name: 'uploadFormSubmitted', value: false})
        this.$store.dispatch('UPLOAD_FILE', fileInput.files);
      }
    },
  },
  mounted() {
    let fileInput = this.form.querySelector('[name=upload-file]');
  },
  computed: {
    form() {
      return document.getElementById(this.formId)
    },
    uploadBtnText() {
      if (this.$store.state.uploadFormReadyForSubmit && this.$store.state.uploadFormSubmitted) {
        return 'Загрузить';
      }
      if (this.$store.state.uploadFormSubmitted) {
        return 'Выберите файл';
      }
      if (!this.$store.state.uploadFormSubmitted) {
        return 'Загрузка...';
      }
    }
  }

}
</script>

<style lang="less">
.form-wrapper {
  position: fixed;
  z-index: 2;
  width: 100%;
  height: 100%;
  background: #80808087;
  display: flex;
  align-items: center;
  justify-content: center;
  top: 0;
  left: 0;
}

.disk-form {
  width: 260px;
  background: white;
  border-radius: 15px;
  padding: 20px 25px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;

  &__upload-btn {
    margin: 5px 0;
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

  &__comment {
    margin: 10px 0;
    font-size: 12px;

    span {
      color: red;
    }
  }

  &__file-list {
    margin: 5px 0;
    padding-left: 5px;

    li {
      font-size: 12px;
    }
  }
}
</style>