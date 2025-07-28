<template>
  <div class="flex flex-col bg-background text-text font-main max-w-3xl mx-auto">
    <h1 class="text-xl/loose font-title w-4/5 mx-auto text-center">Mind Canvas 聊天室</h1>

    <div ref="talk" class="overflow-y-auto p-4 talk">
      <div class="space-y-4">
        <div v-for="msg in messages"
          :class="{
            'justify-start': msg.role === 'assistant',
            'justify-end': msg.role === 'user'
          }"
          class="flex items-start gap-4">
          <div v-if="msg.role === 'user'" class="order-1">
            <img class="size-8" src="https://cdn.jsdelivr.net/gh/alohe/avatars/png/memo_19.png" alt="頭像">
          </div>
          <div v-else class="flex-shrink-0">
            <div class="w-8 h-8 rounded-full bg-primary flex items-center justify-center font-bold">A</div>
          </div>
          <div class="w-4/5 p-4 rounded-lg bg-primary/10">
            <TextBlock :content="msg.content"/>
          </div>
        </div>
        <div v-if="loading" class="text-center">
          <i class="bx bx-loader-lines bx-spin bx-sm" />
        </div>
        <div>
          <p v-if="error" class="text-center">好像有些地方有出錯了！<button @click="reset" class="px-3 rounded-2xl cursor-pointer bg-accent hover:opacity-80" type="button"><i class='bx  bx-undo align-middle'></i> </button></p>
        </div>
      </div>
    </div>
    <form @submit.prevent="submitMsg" class="py-3 flex justify-center gap-2 items-start w-11/12 mx-auto">
      <textarea v-model.trim="prompt" id="prompt" required name="prompt" rows="2" class=" w-full bg-background/80 appearance-none border border-primary/20 rounded-lg p-3 text-text placeholder-text/60 resize-none focus:ring-primary focus:border-primary" placeholder="輸入與AI的對話..."></textarea>
      <button type="submit" class="shrink-0 cursor-pointer p-3 text-background bg-primary rounded-lg">送出</button>
    </form>
  </div>
</template>

<script setup>
import { onUpdated, ref, useTemplateRef } from 'vue'
import { TextBlock } from '@/components/base'
const prompt = ref('')
const messages = ref([
])

const API_DOMAIN = import.meta.env.VITE_API_URL
const loading = ref(false)
const error = ref(false)
const submitMsg = async () => {
  loading.value = true
  error.value = false
  messages.value.push({
    role: 'user',
    content: prompt.value
  })
  prompt.value = ''
  const response = await fetch(`${ API_DOMAIN }/text`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      messages: messages.value
    })
  })
  if (!response.ok) {
    error.value = true
    loading.value = false
    return
  }
  const data = await response.json()
  messages.value.push({
    role: 'assistant',
    content: data.choices[0].message.content
  })
  loading.value = false
}

const talkContent = useTemplateRef('talk')
onUpdated(() => {
  talkContent.value.scrollTop = talkContent.value.scrollHeight
})

const reset = () => {
  messages.value = []
  error.value = false
}
</script>

<style scoped>
.talk {
  height: calc(100svh - 316px);
  scrollbar-width: 0;
  scroll-behavior: smooth;
}
.talk::-webkit-scrollbar {
  display: none;
}
</style>
