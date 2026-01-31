<template>
  <div>
    <div class="plants-grid">
      <PlantCard 
        v-for="(plant, index) in plants" 
        :key="index" 
        :plant="plant"
        :index="index"
      />
    </div>
    <div v-if="plants.length === 0" class="empty">
      <div class="emoji">🌱</div>
      <p>Nema biljaka. Dodajte prvu!</p>
    </div>
  </div>
</template>

<script>
import PlantCard from './PlantCard.vue'

export default {
  components: { PlantCard },
  props: {
    plants: {
      type: Array,
      required: true
    }
  }
}
</script>

<style scoped>
.plants-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 20px;
}
.empty {
  text-align: center;
  padding: 60px 20px;
  color: #999;
}
.emoji {
  font-size: 80px;
  margin-bottom: 16px;
}
</style>