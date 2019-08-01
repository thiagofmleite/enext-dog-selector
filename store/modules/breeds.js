import { getBreeds } from '~/services/breeds'

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
    const breeds = await getBreeds(this)
    dispatch('setBreeds', breeds)
    return breeds
  }
}
