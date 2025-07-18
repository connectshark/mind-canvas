<template>
  <article class=" max-w-2xl mx-auto w-11/12 prose prose-invert" v-html="article"></article>
</template>

<script setup>
import { ref } from 'vue'
import MarkdownIt from 'markdown-it'
const md = MarkdownIt()
const article = ref('')
fetch('/privacy.md')
  .then(response => response.text())
  .then(res => {
    article.value = md.render(res)
  })
</script>