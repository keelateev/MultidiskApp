import {createStore} from 'vuex'
import {diskStore} from "@/store/modules/diskStore/diskStore";
import {userStore} from "@/store/modules/userStore/userStore";

export default createStore({
  state: {
    pageTitle: 'project',
    isShowLoader: false,
  },
  mutations: {
    CHANGE_ROOT_ELEMENT(state, response) {
      state[response.name] = response.value
    }
  },
  actions: {

  },
  modules: {
    diskStore: diskStore,
    userStore: userStore
  }
})
