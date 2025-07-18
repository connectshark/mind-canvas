<template>
  <p class=" prose prose-invert" v-html="md.render(content)"></p>
</template>

<script setup>
import MarkdownIt from 'markdown-it'
const md = MarkdownIt()

defineProps({
  content: String
})
</script>