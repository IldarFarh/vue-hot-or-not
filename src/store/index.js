import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    photoStack: [],
    liked: [],
    disliked: []
  },
  mutations: {
    concatPhotos (state, data) {
      state.photoStack = state.photoStack.concat(data)
    },
    like (state) {
      state.liked.push(state.photoStack.shift())
    },
    dislike (state) {
      state.disliked.push(state.photoStack.shift())
    }
  },
  actions: {
    getPhotos ({ commit }) {
      const newPhotoStack = []
      const queries = []
      for (let i = 0; i < 4; i++) {
        queries.push(axios
          .get('https://dog.ceo/api/breeds/image/random')
          .then((response) => {
            newPhotoStack.push(response.data.message)
          })
          .catch((err) => {
            console.log('Error happened during fetching!', err)
          })
        )
      }
      Promise.all(queries).then(() => {
        commit('concatPhotos', newPhotoStack)
      })
    },
    giveLike ({ commit, dispatch, state }) {
      commit('like')
      if (state.photoStack.length < 2) dispatch('getPhotos')
    },
    discard ({ commit, dispatch, state }) {
      commit('dislike')
      if (state.photoStack.length < 2) dispatch('getPhotos')
    }
  },
  modules: {}
})
