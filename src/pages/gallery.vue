<template>
  <div class="container mx-auto p-4">
    <h1 class="text-3xl/loose font-title text-center text-primary">圖片集</h1>
    <ul class="columns-1 md:columns-2 lg:columns-3 gap-4">
      <li v-for="item in list" :key="item.id" class="mb-4 break-inside-avoid">
        <img class="w-full object-center object-cover rounded-lg shadow-md" :src="item.imageURL" :alt="item.ip">
      </li>
    </ul>
  </div>
  <div>
  </div>
</template>

<script setup>
import { onUnmounted, ref } from 'vue'
const list = ref([])
const FEED_URL = import.meta.env.VITE_API_URL + '/feed'
const eventSource = new EventSource(FEED_URL)

const pause = ref(false)

eventSource.onmessage = function(event) {
  const imageData = JSON.parse(event.data)
  if (pause.value === false && imageData.status === 'end_generating') {
    imageData.id = new Date().getTime()
    list.value.unshift(imageData)
    pause.value = true
    console.log('New image generated:', imageData)
    if (list.value.length > 12) {
      list.value.pop()
    }
    setTimeout(() => {
      pause.value = false
    }, 3000)
  }
}

onUnmounted(() => {
  eventSource.close()
})
</script>