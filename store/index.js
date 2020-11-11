export const state = () => ({
  status: null
})
export const mutations = {
  SetStatus(state, payload) {
    state.status = payload
  }
}
export const getters = {
  status: (state) => state.status
}
export const actions = {
  async tickets({ commit }, payload) {
    try {
      return await this.$axios.$get(
        `/api/pagination/${payload.id}/${payload.page}`
      )
    } catch (e) {
      commit('SetStatus', e)
      throw e
    }
  }
}
