<template>
  <div>
    <ul class=" columns-3">
      <li v-for="item in list" :key="item.id">
        <img class="w-full object-center object-cover" :src="item.imageURL" :alt="item.ip">
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