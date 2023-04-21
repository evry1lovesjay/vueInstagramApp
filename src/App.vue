<script setup>
import { onMounted } from 'vue';
import { RouterView } from 'vue-router'
import NavBar from './components/NavBar.vue';
import { useUserStore } from './stores/usersStore';


const userStore = useUserStore()

onMounted(()=>{
  userStore.getUser()
})

</script>

<template>
  <main>
  <!-- <a-button type="primary">Primary Button</a-button>
  <a-button>Default Button</a-button>
  <a-button type="dashed">Dashed Button</a-button>
  <a-button type="text">Text Button</a-button>
  <a-button type="link">Link Button</a-button> -->
  <NavBar/>
  <RouterView />
  </main>
</template>

<style scoped>

</style>
