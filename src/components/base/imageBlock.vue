<template>
  <img class=" aspect-square object-cover" :src="url" alt="ai image">
</template>

<script setup>
const API_DOMAIN = import.meta.env.VITE_API_URL
const prompt = `釋放力量`
const API_URL = new URL(`${ API_DOMAIN }/image/${ encodeURIComponent(prompt) }`)
API_URL.searchParams.append('model', 'flux')
const response = await fetch(API_URL.toString())
const blob = await response.blob()
const url = URL.createObjectURL(blob)
</script>