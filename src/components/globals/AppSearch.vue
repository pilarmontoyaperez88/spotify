<script setup>
import { ref } from 'vue'

const searchQuery = ref('')
const emit = defineEmits(['search'])

const onSearch = () => {
  emit('search', searchQuery.value)
}
</script>

<template>
  <v-responsive class="mx-auto" max-width="344">
    <v-text-field
      v-model="searchQuery"
      append-icon="mdi-magnify"
      label="Buscar"
      solo
      clearable
      @input="onSearch"
      class="rounded-all"
    />
  </v-responsive>
</template>

<style scoped>
.custom-text-field {
  background-color: #121212 !important; /* Fondo oscuro */
  border-radius: 24px !important; /* Borde redondeado */
  color: #ffffff !important; /* Texto blanco */
}
</style>
