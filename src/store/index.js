import { createStore } from 'vuex'

export default createStore({
  state() {
    return {
      plants: []
    }
  },
  mutations: {
    addPlant(state, plant) {
      state.plants.push(plant)
      if ('serviceWorker' in navigator && 'SyncManager' in window) {
        navigator.serviceWorker.ready.then(reg => {
          reg.sync.register('sync-plants')
        })
      }
    },
    updatePlantPhoto(state, { index, photo }) {
      state.plants[index].photo = photo
    }
  }
})