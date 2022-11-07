import {createStore} from 'vuex'

export default createStore({
  state: {
    pageTitle: {
      Type: String,
      default: 'project'
    },
    diskInfo: {
      Type: Object,
      default: {}
    },
    diskElements: [],
    uploadFormReadyForSubmit: false,
    uploadFormSubmitted: true,
    currentPath: {
      Type: String,
      default: ''
    },
    isShowUploadForm: false,
    isShowLoader: false,
    diskAuthentication: {
      Type: Object,
      default: {}
    },
    paginationCurrent: 1,
    paginationAllow: 0,
  },
  getters: {},
  mutations: {
    CHANGE_ROOT_ELEMENT(state, response) {
      state[response.name] = response.value
    }
  },
  actions: {
    async LOGIN(store, params = {disk: '', token: ''}) {
      try {
        const response = await fetch('/api/v1/auth/login/?disk=' + params.disk + '&token=' + params.token, {
          method: 'GET',
        })
        if (response.ok) {
          response.json().then(resp => {
            if (resp.status === 'error') {
              alert(resp.message);
              return;
            }
            store.commit('CHANGE_ROOT_ELEMENT', {name: 'diskAuthentication', value: {disk: 'yandex'}})
            window.location.search = window.location.hash = ''
          })
        } else {
          response.json().then(resp => alert(resp.message))
        }
      } catch (error) {
        console.log(error)
      }
    },
    async UNLOGIN(store) {
      try {
        const response = await fetch('/api/v1/auth/unlogin/', {
          method: 'GET',
        })
        if (response.ok) {
          response.json().then(resp => {
            if (resp.status === 'error') {
              alert(resp.message);
              return;
            }
            store.commit('CHANGE_ROOT_ELEMENT', {name: 'diskAuthentication', value: {}})
          })
        } else {
          response.json().then(resp => alert(resp.message))
        }
      } catch (error) {
        console.log(error)
      }
    },
    async CHECK_AUTH(store) {
      try {
        const response = await fetch('/api/v1/auth/check/', {
          method: 'GET',
        })
        if (response.ok) {
          response.json().then(resp => {
            if (resp.status === 'success') {
              store.commit('CHANGE_ROOT_ELEMENT', {name: 'diskAuthentication', value: {disk: resp.disk}})
            }
          })
        } else {
          response.json().then(resp => alert(resp.message))
        }
      } catch (error) {
        console.log(error)
      }
    },
    async GET_RESOURCE(store, params = {path: ''}) {
      store.commit('CHANGE_ROOT_ELEMENT', {name: 'isShowLoader', value: true})
      try {
        let formData = new FormData();
        formData.append('page', store.state.paginationCurrent);
        const response = await fetch('/api/v1/disk/yandex/resource/' + params.path, {
          method: 'POST',
          body: formData
        })
        if (response.ok) {
          response.json().then(resp => {
            if (resp.status === 'error') {
              alert(resp.message);
              return;
            }

            store.commit('CHANGE_ROOT_ELEMENT', {name: 'diskElements', value: resp.result})
            store.commit('CHANGE_ROOT_ELEMENT', {name: 'currentPath', value: resp.currentPath})
            store.commit('CHANGE_ROOT_ELEMENT', {name: 'paginationCurrent', value: resp.pagination.current})
            store.commit('CHANGE_ROOT_ELEMENT', {name: 'paginationAllow', value: resp.pagination.allow})
          })
        } else {
          response.json().then(resp => alert(resp.message))
        }
      } catch (error) {
        console.log(error)
      }
      store.commit('CHANGE_ROOT_ELEMENT', {name: 'isShowLoader', value: false})
    },
    async GET_DISK_INFO(store) {
      try {
        const response = await fetch('/api/v1/disk/yandex/info/', {
          method: 'POST',
        })
        if (response.ok) {
          response.json().then(resp => {
            if (resp.status === 'error') {
              alert(resp.message);
              return;
            }

            store.commit('CHANGE_ROOT_ELEMENT', {name: 'diskInfo', value: resp.result})
          })
        } else {
          response.json().then(resp => alert(resp.message))

        }
      } catch (error) {
        console.log(error)
      }
    },
    async UPLOAD_FILE(store, files) {
      store.commit('CHANGE_ROOT_ELEMENT', {name: 'isShowLoader', value: true})
      try {
        let formData = new FormData();
        let filesCount = files.length
        for (let i = 0; i < filesCount; i++) {
          formData.append("files[]", files[i]);
        }
        formData.append('currentPath', this.state.currentPath)
        const response = await fetch('/api/v1/disk/yandex/upload/', {
          method: 'POST',
          body: formData
        })
        if (response.ok) {
          response.json().then(resp => {
            if (resp.status === 'error') {
              alert(resp.message);
              store.commit('CHANGE_ROOT_ELEMENT', {name: 'uploadFormSubmitted', value: true})
              store.commit('CHANGE_ROOT_ELEMENT', {name: 'uploadFormReadyForSubmit', value: false})
              store.commit('CHANGE_ROOT_ELEMENT', {name: 'isShowUploadForm', value: false})
              return;
            }
            store.commit('CHANGE_ROOT_ELEMENT', {name: 'isShowUploadForm', value: false})
            store.commit('CHANGE_ROOT_ELEMENT', {name: 'uploadFormSubmitted', value: true})
            store.commit('CHANGE_ROOT_ELEMENT', {name: 'uploadFormReadyForSubmit', value: false})
            store.dispatch('GET_RESOURCE', {path: this.state.currentPath})
            store.dispatch('GET_DISK_INFO')
          })
        } else {
          response.json().then(resp => alert(resp.message))
          store.commit('CHANGE_ROOT_ELEMENT', {name: 'isShowLoader', value: false})
        }
      } catch (error) {
        console.log(error)
      }
    },
    async DELETE_FILE(store, resource) {
      store.commit('CHANGE_ROOT_ELEMENT', {name: 'isShowLoader', value: true})
      try {
        let formData = new FormData();
        formData.append('resource', resource)
        const response = await fetch('/api/v1/disk/yandex/delete/', {
          method: 'POST',
          body: formData
        })
        if (response.ok) {
          response.json().then(resp => {
            if (resp.status === 'error') {
              alert(resp.message);
              return;
            }
            store.dispatch('GET_RESOURCE', {path: this.state.currentPath})
            store.dispatch('GET_DISK_INFO')

          })
        } else {
          response.json().then(resp => alert(resp.message))
          store.commit('CHANGE_ROOT_ELEMENT', {name: 'isShowLoader', value: false})
        }
      } catch (error) {
        console.log(error)
      }
    },
    async DOWNLOAD_FILE(store, resource) {
      store.commit('CHANGE_ROOT_ELEMENT', {name: 'isShowLoader', value: true})
      try {
        let formData = new FormData();
        formData.append('resource', resource)
        const response = await fetch('/api/v1/disk/yandex/download/', {
          method: 'POST',
          body: formData
        })
        if (response.ok) {
          response.blob().then(blob => {
            console.log(blob)
            let fileName = resource.split('/').pop();
            if (fileName.indexOf('.') === -1 && blob.type === 'application/zip') {
              fileName += '.zip'
            }
            let url = window.URL.createObjectURL(blob);
            let a = document.createElement('a');
            a.href = url;
            a.download = fileName;
            document.body.appendChild(a);
            a.click();
            a.remove();
          })
        } else {
          response.json().then(resp => alert(resp.message))
        }
      } catch (error) {
        console.log(error)
      }
      store.commit('CHANGE_ROOT_ELEMENT', {name: 'isShowLoader', value: false})
    },
    async RENAME_FILE(store, data) {
      store.commit('CHANGE_ROOT_ELEMENT', {name: 'isShowLoader', value: true})
      try {
        let formData = new FormData();
        formData.append('resource', data.resource)
        formData.append('newResourceName', data.newResourceName)
        const response = await fetch('/api/v1/disk/yandex/rename/', {
          method: 'POST',
          body: formData
        })
        if (response.ok) {
          response.json().then(resp => {
            if (resp.status === 'error') {
              alert(resp.message);
              return;
            }
            store.dispatch('GET_RESOURCE', {path: this.state.currentPath})
            store.dispatch('GET_DISK_INFO')

          })
        } else {
          response.json().then(resp => alert(resp.message))
          store.commit('CHANGE_ROOT_ELEMENT', {name: 'isShowLoader', value: false})
        }
      } catch (error) {
        console.log(error)
      }
    },
  },
})
