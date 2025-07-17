<template>
  <article class=" max-w-2xl mx-auto w-11/12 prose-strong:text-white text-white prose-headings:text-white  prose" v-html="article"></article>
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