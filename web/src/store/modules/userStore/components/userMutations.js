export const userMutations = {
  CHANGE_USER_STORE_ELEMENT(state, response) {
    state[response.name] = response.value
  },
  CHANGE_LOGIN_STATUS(state, response) {
    state.authentication = response.authentication;
    state.disk = response.disk;
  }
}