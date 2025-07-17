<template>
  <div class="flex flex-col bg-background text-text font-main max-w-3xl mx-auto">
    <h1 class="text-xl/loose font-title w-4/5 mx-auto text-center">Mind Canvas 聊天室</h1>

    <div ref="talk" class="overflow-y-auto p-4 talk">
      <div class="space-y-4">
        <div
          v-for="msg in messages"
          :class="{
            'justify-start': msg.role === 'assistant',
            'justify-end': msg.role === 'user'
          }"
          class="flex items-start gap-4">
          <div :class="{ 'order-1': msg.role === 'user' }" class="flex-shrink-0">
            <div class="w-8 h-8 rounded-full bg-primary flex items-center justify-center font-bold">A</div>
          </div>
          <div class="bg-amber-900 w-4/5 p-4 rounded-lg bg-accent/20">
            <p>{{ msg.content }}</p>
          </div>
        </div>
      </div>
    </div>
    <form @submit.prevent="submitMsg" class="py-3 flex justify-center gap-2 items-start w-11/12 mx-auto">
      <textarea v-model.trim="prompt" id="prompt" name="prompt" rows="2" class=" w-full bg-white/10 appearance-none border border-white/20 rounded-lg p-3 text-white placeholder-gray-500 resize-none focus:ring-indigo-500 focus:border-indigo-500" placeholder="輸入與AI的對話..."></textarea>
      <button class=" shrink-0 cursor-pointer p-3 text-white bg-indigo-600 hover:bg-indigo-500 rounded-lg transition-colors shadow-[0_0_20px_rgba(99,102,241,0.5)]">
        送出
      </button>
    </form>
  </div>
</template>

<script setup>
import { onUpdated, ref, useTemplateRef } from 'vue'
const prompt = ref('')
const messages = ref([
])

const defaultSystem = {
  role : 'system',
  content: '用繁體中文回覆'
}
const API_CHAT_URL = import.meta.env.VITE_API_CHAT_URL
const loading = ref(false)
const submitMsg = async () => {
  loading.value = true
  messages.value.push({
    role: 'user',
    content: prompt.value
  })
  prompt.value = ''
  const response = await fetch(API_CHAT_URL + '/openai', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      model: 'gpt-4.1',
      messages: [defaultSystem, ...messages.value]
    })
  })
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
</script>

<style scoped>
.talk {
  height: calc(100svh - 292px);
  scrollbar-width: 0;
}
</style>
