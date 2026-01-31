<template>
  <div class="add-plant">
    <input 
      v-model="name" 
      placeholder="Unesite ime biljke" 
      class="input"
      @keyup.enter="add"
    />
    <button @click="add" :disabled="!name" class="btn-add">+ Dodaj biljku</button>
  </div>
</template>

<script>
import { mapMutations } from 'vuex'

export default {
  data() {
    return {
      name: ''
    }
  },
  methods: {
    ...mapMutations(['addPlant']),

    add() {
      if (!this.name) return
      this.addPlant({ name: this.name, photo: null })
      this.name = ''
    }
  }
}
</script>

<style scoped>
.add-plant {
  background: white;
  padding: 20px;
  border-radius: 12px;
  margin-bottom: 30px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
  display: flex;
  gap: 12px;
}
.input {
  flex: 1;
  padding: 12px 16px;
  font-size: 16px;
  border: 2px solid #e0e0e0;
  border-radius: 8px;
  outline: none;
}
.input:focus {
  border-color: #28a745;
}
.btn-add {
  padding: 12px 24px;
  font-size: 16px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 600;
  background: #28a745;
  color: white;
  white-space: nowrap;
}
.btn-add:disabled {
  opacity: 0.4;
  cursor: not-allowed;
}
</style>