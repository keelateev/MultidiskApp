export const diskMutations = {
  CHANGE_DISK_STORE_ELEMENT(state, response) {
    state[response.name] = response.value
  }
}