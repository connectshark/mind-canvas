<template>
  <!-- Navigation -->
  <header class="fixed top-0 left-0 right-0 z-50 glass">
    <div class="max-w-7xl mx-auto px-6 py-4">
      <div class="flex justify-between items-center">
        <!-- Logo -->
        <router-link to="/" class="flex items-center gap-3 group">
          <div class="relative">
            <div class="absolute inset-0 bg-gradient-to-r from-primary to-accent rounded-xl blur-lg opacity-50 group-hover:opacity-75 transition-opacity"></div>
            <img class="relative size-9 rounded-xl" src="@/assets/logo.webp" alt="Logo" />
          </div>
          <span class="text-xl font-bold font-title tracking-tight">Mind Canvas</span>
        </router-link>

        <!-- Desktop Navigation -->
        <nav class="hidden md:flex items-center gap-1">
          <router-link 
            v-for="menu in menus" 
            :key="menu.path"
            :to="menu.path"
            class="px-4 py-2 text-sm font-medium text-muted hover:text-text rounded-lg hover:bg-surface-elevated transition-all duration-200"
          >
            {{ menu.name }}
          </router-link>
          <div class="w-px h-6 bg-border mx-2"></div>
          <button 
            @click="toggleTheme" 
            class="p-2.5 rounded-lg hover:bg-surface-elevated transition-all duration-200 cursor-pointer"
            aria-label="Toggle theme"
          >
            <i v-if="theme === 'light'" class='bx bx-sun text-xl text-muted hover:text-primary transition-colors'></i>
            <i v-else class='bx bx-moon text-xl text-muted hover:text-primary transition-colors'></i>
          </button>
        </nav>

        <!-- Mobile Menu Button -->
        <button 
          @click="isMenuOpen = !isMenuOpen" 
          class="md:hidden p-2.5 rounded-lg hover:bg-surface-elevated transition-all cursor-pointer"
          aria-label="Toggle menu"
        >
          <i v-if="isMenuOpen" class='bx bx-x text-2xl'></i>
          <i v-else class='bx bx-menu text-2xl'></i>
        </button>
      </div>

      <!-- Mobile Navigation -->
      <Transition
        enter-active-class="transition-all duration-300 ease-out"
        enter-from-class="opacity-0 -translate-y-4"
        enter-to-class="opacity-100 translate-y-0"
        leave-active-class="transition-all duration-200 ease-in"
        leave-from-class="opacity-100 translate-y-0"
        leave-to-class="opacity-0 -translate-y-4"
      >
        <nav v-if="isMenuOpen" class="md:hidden pt-4 pb-2 border-t border-border mt-4">
          <div class="flex flex-col gap-1">
            <router-link 
              v-for="menu in menus" 
              :key="menu.path"
              :to="menu.path"
              @click="isMenuOpen = false"
              class="px-4 py-3 text-sm font-medium text-muted hover:text-text rounded-lg hover:bg-surface-elevated transition-all"
            >
              {{ menu.name }}
            </router-link>
            <button 
              @click="toggleTheme" 
              class="px-4 py-3 text-sm font-medium text-muted hover:text-text rounded-lg hover:bg-surface-elevated transition-all text-left flex items-center gap-2 cursor-pointer"
            >
              <i v-if="theme === 'light'" class='bx bx-sun text-lg'></i>
              <i v-else class='bx bx-moon text-lg'></i>
              {{ theme === 'light' ? '淺色模式' : '深色模式' }}
            </button>
          </div>
        </nav>
      </Transition>
    </div>
  </header>

  <!-- Main Content -->
  <main class="min-h-screen pt-[73px]" @click="isMenuOpen = false">
    <router-view />
  </main>

  <!-- Footer -->
  <footer class="border-t border-border bg-surface">
    <div class="max-w-7xl mx-auto px-6 py-12">
      <div class="grid md:grid-cols-4 gap-8">
        <!-- Brand -->
        <div class="md:col-span-2">
          <router-link to="/" class="flex items-center gap-3 mb-4">
            <img class="size-8 rounded-lg" src="@/assets/logo.webp" alt="Logo" />
            <span class="text-lg font-bold font-title">Mind Canvas</span>
          </router-link>
          <p class="text-muted text-sm leading-relaxed max-w-md">
            釋放您的無限創造力。Mind Canvas 是一款 AI 驅動的視覺化協作平台，
            將您的靈感、想法和專案匯集於一處。
          </p>
        </div>

        <!-- Links -->
        <div>
          <h4 class="font-semibold mb-4 text-sm uppercase tracking-wider text-muted">產品</h4>
          <ul class="space-y-3">
            <li v-for="menu in menus" :key="menu.path">
              <router-link 
                :to="menu.path" 
                class="text-sm text-muted hover:text-primary transition-colors"
              >
                {{ menu.name }}
              </router-link>
            </li>
          </ul>
        </div>

        <!-- Legal -->
        <div>
          <h4 class="font-semibold mb-4 text-sm uppercase tracking-wider text-muted">法律</h4>
          <ul class="space-y-3">
            <li v-for="page in pages" :key="page.path">
              <router-link 
                :to="page.path" 
                class="text-sm text-muted hover:text-primary transition-colors"
              >
                {{ page.name }}
              </router-link>
            </li>
          </ul>
        </div>
      </div>

      <!-- Copyright -->
      <div class="border-t border-border mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
        <p class="text-sm text-muted">
          &copy; {{ new Date().getFullYear() }} Mind Canvas. All rights reserved.
        </p>
        <div class="flex items-center gap-4">
          <a href="https://github.com/connectshark/mind-canvas" target="_blank" class="text-muted hover:text-primary transition-colors">
            <i class='bx bxl-github text-xl'></i>
          </a>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup>
import { ref, watch } from 'vue'

const menus = [
  { path: '/playground', name: 'Playground' },
  { path: '/chat', name: 'Chat' },
  { path: '/speech', name: 'Speech' }
]

const isMenuOpen = ref(false)

const pages = [
  { path: '/privacy', name: 'Privacy Policy' }
]

const theme = ref(localStorage.getItem('theme') || 'dark')

const toggleTheme = () => {
  theme.value = theme.value === 'dark' ? 'light' : 'dark'
}

watch(theme, (newTheme) => {
  document.documentElement.setAttribute('data-theme', newTheme)
  localStorage.setItem('theme', newTheme)
}, { immediate: true })
</script>
