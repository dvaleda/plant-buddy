<template>
  <div id="app">
    <h1>Moje biljke</h1>
    <NotificationToggle />
    <AddPlant />
    <PlantList :plants="plants" />
  </div>
</template>

<script>
import AddPlant from './components/AddPlant.vue'
import PlantList from './components/PlantList.vue'
import NotificationToggle from './components/NotificationToggle.vue'
import { mapState } from 'vuex'

export default {
  components: { AddPlant, PlantList, NotificationToggle },
  computed: {
    ...mapState(['plants'])
  }
}
</script>

<style>
* {
  box-sizing: border-box;
}
body {
  margin: 0;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  background: #e9ecef;
}
#app {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}
h1 {
  text-align: center;
  color: #2c3e50;
  margin-bottom: 30px;
}
</style>