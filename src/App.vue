<script setup>
import { RouterView } from 'vue-router'
</script>

<template>
  <header>
    <div class="wrapper">
      <nav></nav>
    </div>
  </header>

  <body></body>

  <RouterView />
</template>

<style scoped>
* {
  font-family: 'Inter', sans-serif;
  background: rebeccapurple;
}
#app {
  background: black;
  background-size: cover; /* Hace que el fondo cubra toda la pantalla */
  min-height: 100vh; /* Asegura que ocupe el 100% de la altura de la ventana */
}
</style>
