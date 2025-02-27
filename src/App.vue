<script setup>
</script>

<template>
  <header>
    <div class=" mx-auto w-11/12 flex justify-between items-center py-4">
      <router-link to="/">
        <img class="size-8 inline-block align-middle" src="./assets/logo.webp" alt="logo">
        <span class="ml-2 inline-block align-middle">Mind Canvas</span>
      </router-link>
      <nav>
        <router-link to="/gallery">gallery</router-link>
      </nav>
    </div>
  </header>
  <main>
    <router-view />
  </main>
  <footer>
    
  </footer>
</template>
