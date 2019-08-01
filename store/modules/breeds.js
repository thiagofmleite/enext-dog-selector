export const state = () => ({
  breeds: []
})

export const getters = {
  breeds: state => state.breeds
}

export const mutations = {
  setBreeds: (state, breeds) => {
    state.breeds = breeds
  }
}

export const actions = {
  setBreeds({ commit }, payload) {
    commit('setBreeds', payload)
  },
  async getAllBreeds({ dispatch }) {
    const response = await this.$axios.$get('/breeds/list/all')
    const { message: breeds } = response
    dispatch('setBreeds', breeds)
    return breeds
  }
}
