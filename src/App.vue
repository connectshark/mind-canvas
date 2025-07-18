<template>
  <header class=" sticky top-0 z-10 bg-black/30 backdrop-blur-xl border-b border-white/10">
    <div class="container mx-auto px-6 py-4 flex justify-between items-center">
      <div class="flex items-center">
        <router-link to="/">
          <img class="size-7 rounded-lg mr-2 inline-block align-middle" src="@/assets/logo.webp" alt="Logo" />
          <span class="text-lg text-white inline-block align-middle">Mind Canvas</span>
        </router-link>
      </div>
      <nav class="flex items-center gap-2">
        <router-link class="text-sm text-gray-300 hover:text-white transition-colors" to="/playground">Playground</router-link>
        <router-link to="/chat" class="text-sm text-gray-300 hover:text-white transition-colors">聊天</router-link>
        <router-link to="/speech">speech</router-link>
      </nav>
    </div>
  </header>
  <main>
    <router-view />
  </main>
  <footer class="border-t border-white/10">
    <div class=" w-5/6 mx-auto">
      <ul>
        <li v-for="page in pages" :key="page.path">
          <router-link class=" text-gray-400 hover:underline" :to="page.path">{{ page.name }}</router-link>
        </li>
      </ul>
    </div>
    <div class="container mx-auto px-6 py-8 text-center text-sm text-gray-500">
      <p>&copy; {{ new Date().getFullYear() }} Mind Canvas. All rights reserved.</p>
    </div>
  </footer>
</template>

<script setup>
const pages = [
  { path: '/privacy', name: 'privacy' }
]
</script>