export const diskActions = {
  async GET_RESOURCE(store, params) {
    store.commit('CHANGE_ROOT_ELEMENT', {name: 'isShowLoader', value: true})
    try {
      let formData = new FormData();
      formData.append('paginationPage', store.state.paginationCurrent);
      formData.append('diskPath', params.path);
      const response = await fetch('/api/v1/disk/resource/', {
        method: 'POST',
        body: formData
      })
      if (response.ok) {
        response.json().then(resp => {
          if (resp.status === 'error') {
            alert(resp.message);
            return;
          }

          store.commit('CHANGE_DISK_STORE_ELEMENT', {name: 'diskElements', value: resp.result})
          store.commit('CHANGE_DISK_STORE_ELEMENT', {name: 'currentPath', value: resp.currentPath})
          store.commit('CHANGE_DISK_STORE_ELEMENT', {name: 'paginationCurrent', value: resp.pagination.current})
          store.commit('CHANGE_DISK_STORE_ELEMENT', {name: 'paginationAllow', value: resp.pagination.allow})
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
      let formData = new FormData();
      const response = await fetch('/api/v1/disk/info/', {
        method: 'POST',
        body: formData
      })
      if (response.ok) {
        response.json().then(resp => {
          if (resp.status === 'error') {
            alert(resp.message);
            return;
          }

          store.commit('CHANGE_DISK_STORE_ELEMENT', {name: 'diskInfo', value: resp.result})
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
      formData.append('currentPath', store.state.currentPath)
      const response = await fetch('/api/v1/disk/upload/', {
        method: 'POST',
        body: formData
      })
      if (response.ok) {
        response.json().then(resp => {
          if (resp.status === 'error') {
            alert(resp.message);
            store.commit('CHANGE_DISK_STORE_ELEMENT', {name: 'uploadFormSubmitted', value: true})
            store.commit('CHANGE_DISK_STORE_ELEMENT', {name: 'uploadFormReadyForSubmit', value: false})
            store.commit('CHANGE_DISK_STORE_ELEMENT', {name: 'isShowUploadForm', value: false})
            return;
          }
          store.commit('CHANGE_DISK_STORE_ELEMENT', {name: 'isShowUploadForm', value: false})
          store.commit('CHANGE_DISK_STORE_ELEMENT', {name: 'uploadFormSubmitted', value: true})
          store.commit('CHANGE_DISK_STORE_ELEMENT', {name: 'uploadFormReadyForSubmit', value: false})
          store.dispatch('GET_RESOURCE', {path: store.state.currentPath})
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
      const response = await fetch('/api/v1/disk/delete/', {
        method: 'POST',
        body: formData
      })
      if (response.ok) {
        response.json().then(resp => {
          if (resp.status === 'error') {
            alert(resp.message);
            return;
          }
          store.dispatch('GET_RESOURCE', {path: store.state.currentPath})
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
  async DOWNLOAD_FILE(store, params) {
    store.commit('CHANGE_ROOT_ELEMENT', {name: 'isShowLoader', value: true})
    try {
      let formData = new FormData();
      formData.append('path', params.path)
      formData.append('type', params.type)
      const response = await fetch('/api/v1/disk/download/', {
        method: 'POST',
        body: formData
      })
      if (response.ok) {
        response.blob().then(blob => {
          let fileName = params.path.split('/').pop();
          if (params.type === 'dir') {
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

      const response = await fetch('/api/v1/disk/rename/', {
        method: 'POST',
        body: formData
      })
      if (response.ok) {
        response.json().then(resp => {
          if (resp.status === 'error') {
            alert(resp.message);
            return;
          }
          store.dispatch('GET_RESOURCE', {path: store.state.currentPath})
          store.dispatch('GET_DISK_INFO')

        })
      } else {
        response.json().then(resp => alert(resp.message))
        store.commit('CHANGE_ROOT_ELEMENT', {name: 'isShowLoader', value: false})
      }
    } catch (error) {
      console.log(error)
    }
  }
}