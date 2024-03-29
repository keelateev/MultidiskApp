export const userActions = {
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
          store.commit('CHANGE_USER_STORE_ELEMENT', {name: 'authentication', value: true})
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
          store.commit('CHANGE_USER_STORE_ELEMENT', {name: 'authentication', value: false})
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
            store.commit('CHANGE_USER_STORE_ELEMENT', {name: 'authentication', value: true})
          }
        })
      } else {
        response.json().then(resp => alert(resp.message))
      }
    } catch (error) {
      console.log(error)
    }
  }
}