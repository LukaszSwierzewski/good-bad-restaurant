export const state = () => ({
  list: []
})

export const mutations = {
  FETCHED_RESTAURANT (state, payload) {
    state.list = payload
  }
}
export const getters = {
}
