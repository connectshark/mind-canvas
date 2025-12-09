import { defineStore } from 'pinia'
import { ref, computed, onMounted } from 'vue'

const STORAGE_KEY = 'mind-canvas-image-history'

export const useImageStore = defineStore('image', () => {
  const history = ref([])
  const recentHistory = computed(() => history.value.slice().reverse())
  const getRecentItems = (count = 4) => history.value.slice(-count).reverse()
  const saveToStorage = () => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(history.value))
  }
  const addImage = (record) => {
    history.value.push(record)
    saveToStorage()
  }
  const removeImage = (id) => {
    history.value = history.value.filter(item => item.id !== id)
    saveToStorage()
  }
  const clearHistory = () => {
    history.value = []
    saveToStorage()
  }

  onMounted(() => {
    const stored = localStorage.getItem(STORAGE_KEY) || '[]'
    history.value = JSON.parse(stored)
  })

  return { history, recentHistory, getRecentItems, saveToStorage, addImage, removeImage, clearHistory }
})
