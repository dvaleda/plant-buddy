<template>
  <button @click="subscribe" :disabled="!canEnable" class="notify-btn">{{ buttonText }}</button>
</template>

<script>
export default {
  data() {
    return {
      buttonText: '🔔 Omogući obavijesti',
      canEnable: true
    }
  },
  mounted() {
    if (!('Notification' in window)) {
      this.buttonText = '❌ Obavijesti nisu podržane'
      this.canEnable = false
      return
    }

    if (Notification.permission === 'granted') {
      this.buttonText = '✅ Obavijesti omogućene'
    } else if (Notification.permission === 'denied') {
      this.buttonText = '🚫 Obavijesti blokirane'
      this.canEnable = false
    }
  },
  methods: {
    async subscribe() {
      if (!('Notification' in window)) {
        alert('Obavijesti nisu podržane u ovom browseru')
        return
      }

      if (Notification.permission === 'denied') {
        alert('Obavijesti su blokirane. Omogućite ih u postavkama browsera.')
        return
      }

      const permission = await Notification.requestPermission()
      
      if (permission === 'granted') {
        this.buttonText = '✅ Obavijesti omogućene'
        
        if ('serviceWorker' in navigator) {
          const reg = await navigator.serviceWorker.ready
          reg.showNotification('Plant Buddy', {
            body: 'Push obavijesti su uspješno omogućene! 🌱',
            icon: '/favicon.ico',
            badge: '/favicon.ico'
          })
        }
      } else if (permission === 'denied') {
        this.buttonText = '🚫 Obavijesti blokirane'
        this.canEnable = false
      }
    }
  }
}
</script>

<style scoped>
.notify-btn {
  padding: 10px 20px;
  background: #007bff;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 14px;
  margin-bottom: 20px;
}
.notify-btn:disabled {
  background: #6c757d;
  cursor: not-allowed;
  opacity: 0.6;
}
</style>