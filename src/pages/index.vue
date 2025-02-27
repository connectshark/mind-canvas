<script setup>
import useFetch from '@/composables/useFetch'
import { ref } from 'vue'
const prompt = ref('')

const PROMPT_URL = import.meta.env.VITE_API_IMAGE_URL + '/prompt/'

const img = ref('')
const loading = ref(false)
const submitHandler = async () => {
  loading.value = true
  img.value = ''
  const fetch_respose = await fetch(PROMPT_URL + prompt.value + '?nologo=true&private=true&safe=false')
  const blob = await fetch_respose.blob()
  const url = URL.createObjectURL(blob)
  img.value = url
  loading.value = false
}
</script>

<template>
<section>
  <h1 class=" text-3xl/loose text-center">Hi</h1>
  <form @submit.prevent="submitHandler">
    <textarea required type="text" v-model="prompt"></textarea>
    <button type="submit" :disabled="loading">create</button>
  </form>
  <div v-if="loading">
    <i class='bx bx-loader bx-spin' ></i>
  </div>
  <div v-if="img">
    <img :src="img" alt="ai image">
  </div>
  <img src="https://image.pollinations.ai/prompt/Modern%20minimalist%20logo?nologo=true&private=true" alt="AI-generated logo">
</section>
</template>
