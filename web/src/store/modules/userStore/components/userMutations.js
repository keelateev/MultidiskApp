export const userMutations = {
  CHANGE_USER_STORE_ELEMENT(state, response) {
    state[response.name] = response.value
  },
}