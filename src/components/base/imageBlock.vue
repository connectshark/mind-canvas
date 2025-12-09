<template>
  <img class="aspect-video object-cover rounded-xl" :src="url" alt="AI Generated Image">
</template>

<script setup>
const API_DOMAIN = import.meta.env.VITE_API_URL
const prompt = `futuristic digital workspace with holographic displays, neon accents, dark theme, cinematic lighting`
const API_URL = new URL(`${API_DOMAIN}/image/generate?prompt=${encodeURIComponent(prompt)}`)
API_URL.searchParams.append('model', 'flux')
const response = await fetch(API_URL.toString())
const blob = await response.blob()
const url = URL.createObjectURL(blob)
</script>
