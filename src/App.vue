<template>
  <header class=" sticky top-0 z-10 bg-background/80 backdrop-blur-xl border-b border-primary/10">
    <div class="container mx-auto px-6 py-4 flex justify-between items-center">
      <div class="flex items-center">
        <router-link to="/">
          <img class="size-7 rounded-lg mr-2 inline-block align-middle" src="@/assets/logo.webp" alt="Logo" />
          <span class="text-lg text-text inline-block align-middle">Mind Canvas</span>
        </router-link>
      </div>
      <nav class="flex items-center gap-2">
        <router-link class="text-sm text-text/80 hover:text-text transition-colors" to="/playground">Playground</router-link>
        <router-link to="/chat" class="text-sm text-text/80 hover:text-text transition-colors">聊天</router-link>
        <router-link to="/speech" class="text-sm text-text/80 hover:text-text transition-colors">speech</router-link>
        <button @click="toggleTheme" class="text-sm cursor-pointer text-text/80 hover:text-text transition-colors">
          <i v-if="theme === 'light'" class='bx bx-sm bx-sun-dim align-middle'></i>
          <i v-else class='bx bx-sm bx-moon-star align-middle'></i>
        </button>
      </nav>
    </div>
  </header>
  <main class="bg-background text-text">
    <router-view />
  </main>
  <footer class="border-t border-primary/10">
    <div class=" w-5/6 mx-auto">
      <ul>
        <li v-for="page in pages" :key="page.path">
          <router-link class=" text-text/60 hover:underline" :to="page.path">{{ page.name }}</router-link>
        </li>
      </ul>
    </div>
    <div class="container mx-auto px-6 py-8 text-center text-sm text-text/40">
      <p>&copy; {{ new Date().getFullYear() }} Mind Canvas. All rights reserved.</p>
    </div>
  </footer>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const pages = [
  { path: '/privacy', name: 'privacy' }
]

const theme = ref('dark')

const toggleTheme = () => {
  theme.value = theme.value === 'dark' ? 'light' : 'dark'
  document.documentElement.setAttribute('data-theme', theme.value)
  localStorage.setItem('theme', theme.value)
}

onMounted(() => {
  const savedTheme = localStorage.getItem('theme')
  if (savedTheme) {
    theme.value = savedTheme
    document.documentElement.setAttribute('data-theme', savedTheme)
  }
})
</script>