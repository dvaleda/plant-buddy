<template>
  <div class="plant-card" @click="addPhoto">
    <div v-if="plant.photo" class="photo">
      <img :src="plant.photo" alt="plant" />
    </div>
    <div v-else class="no-photo">
      <div class="icon">📷</div>
      <div class="text">{{ cameraSupported ? 'Dodaj sliku' : 'Kamera nije dostupna' }}</div>
    </div>
    <h3>{{ plant.name }}</h3>
  </div>
</template>

<script>
import { takePhoto } from '@/utils/camera'

export default {
  props: {
    plant: Object,
    index: Number
  },
  data() {
    return {
      cameraSupported: !!navigator.mediaDevices?.getUserMedia
    }
  },
  methods: {
    async addPhoto() {
      const photo = await takePhoto()
      if (photo) {
        this.$store.commit('updatePlantPhoto', { index: this.index, photo })
      }
    }
  }
}
</script>

<style scoped>
.plant-card {
  background: white;
  border-radius: 12px;
  padding: 15px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
  text-align: center;
  cursor: pointer;
  transition: transform 0.2s, box-shadow 0.2s;
}
.plant-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 4px 16px rgba(0,0,0,0.15);
}
.photo img {
  width: 100%;
  height: 200px;
  object-fit: cover;
  border-radius: 8px;
  margin-bottom: 10px;
}
.no-photo {
  width: 100%;
  height: 200px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 8px;
  margin-bottom: 10px;
  color: white;
}
.icon {
  font-size: 60px;
  margin-bottom: 8px;
}
.text {
  font-size: 16px;
  font-weight: 600;
}
h3 {
  margin: 0;
  color: #2c3e50;
  font-size: 18px;
}
</style>