<script setup>
</script>

<template>
  <header class=" sticky top-0 z-10 bg-black/30 backdrop-blur-xl border-b border-white/10">
    <div class="container mx-auto px-6 py-4 flex justify-between items-center">
      <div class="flex items-center">
        <router-link to="/">
          <img class="size-7 rounded-lg mr-2 inline-block align-middle" src="@/assets/logo.webp" alt="Logo" />
          <span class="text-lg text-white inline-block align-middle">Mind Canvas</span>
        </router-link>
      </div>
      <nav class="hidden md:flex items-center space-x-8">
        <router-link class="text-sm text-gray-300 hover:text-white transition-colors" to="/playground">Playground</router-link>
        <router-link to="/chat" class="text-sm text-gray-300 hover:text-white transition-colors">聊天</router-link>
        <a href="#" class="text-sm text-gray-300 hover:text-white transition-colors">關於我們</a>
      </nav>
      <div class="flex items-center space-x-4">
        <a href="#" class="text-sm text-gray-300 hover:text-white transition-colors">登入</a>
        <a href="#" class="px-5 py-2 text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-500 rounded-lg transition-colors">免費註冊</a>
      </div>
    </div>
  </header>
  <main>
    <router-view />
  </main>
  <footer class="border-t border-white/10">
    <div class="container mx-auto px-6 py-8 text-center text-sm text-gray-500">
      <p>&copy; {{ new Date().getFullYear() }} Mind Canvas. All rights reserved.</p>
    </div>
  </footer>
</template>
