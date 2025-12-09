<template>
  <div class="min-h-[calc(100vh-73px)] flex flex-col">
    <!-- Header -->
    <div class="border-b border-border bg-surface/50 backdrop-blur-xl">
      <div class="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between">
        <div class="flex items-center gap-3">
          <div class="w-10 h-10 rounded-xl bg-linear-to-br from-primary to-secondary flex items-center justify-center">
            <i class='bx bx-bot text-xl text-white'></i>
          </div>
          <div>
            <h1 class="font-bold font-title">AI 智能對話</h1>
            <p class="text-sm text-muted">與 AI 助手進行對話</p>
          </div>
        </div>
        <button 
          @click="reset" 
          class="btn-secondary px-4 py-2 text-sm cursor-pointer flex items-center gap-2"
        >
          <i class='bx bx-refresh'></i>
          新對話
        </button>
      </div>
    </div>

    <!-- Chat Area -->
    <div ref="talk" class="flex-1 overflow-y-auto">
      <!-- Empty State -->
      <div v-if="messages.length === 0" class="h-full flex items-center justify-center p-6">
        <div class="text-center max-w-md">
          <div class="w-20 h-20 mx-auto mb-6 rounded-2xl bg-linear-to-br from-primary/20 to-accent/20 flex items-center justify-center">
            <i class='bx bx-message-rounded-dots text-4xl text-primary'></i>
          </div>
          <h2 class="text-2xl font-bold font-title mb-3">開始新對話</h2>
          <p class="text-muted mb-8">
            輸入您的問題或想法，AI 助手將為您提供即時回應和創意建議。
          </p>
          
          <!-- Quick Prompts -->
          <div class="space-y-2">
            <p class="text-sm text-muted mb-3">試試這些提示：</p>
            <button 
              v-for="suggestion in suggestions" 
              :key="suggestion"
              @click="prompt = suggestion"
              class="block w-full text-left px-4 py-3 rounded-xl bg-surface-elevated border border-border hover:border-primary/50 transition-all text-sm cursor-pointer"
            >
              {{ suggestion }}
            </button>
          </div>
        </div>
      </div>

      <!-- Messages -->
      <div v-else class="max-w-4xl mx-auto px-6 py-8 space-y-6">
        <div 
          v-for="(msg, index) in messages" 
          :key="index"
          class="flex gap-4"
          :class="msg.role === 'user' ? 'flex-row-reverse' : ''"
        >
          <!-- Avatar -->
          <div class="flex-shrink-0">
            <div 
              v-if="msg.role === 'user'" 
              class="w-10 h-10 rounded-xl bg-linear-to-br from-accent to-primary flex items-center justify-center"
            >
              <i class='bx bx-user text-lg text-white'></i>
            </div>
            <div 
              v-else 
              class="w-10 h-10 rounded-xl bg-linear-to-br from-primary to-secondary flex items-center justify-center"
            >
              <i class='bx bx-bot text-lg text-white'></i>
            </div>
          </div>

          <!-- Message Bubble -->
          <div 
            class="max-w-[80%] rounded-2xl px-5 py-4"
            :class="msg.role === 'user' 
              ? 'bg-linear-to-br from-primary to-secondary text-white' 
              : 'bg-surface-elevated border border-border'"
          >
            <TextBlock :content="msg.content"/>
          </div>
        </div>

        <!-- Loading -->
        <div v-if="loading" class="flex gap-4">
          <div class="w-10 h-10 rounded-xl bg-linear-to-br from-primary to-secondary flex items-center justify-center flex-shrink-0">
            <i class='bx bx-bot text-lg text-white'></i>
          </div>
          <div class="bg-surface-elevated border border-border rounded-2xl px-5 py-4">
            <div class="flex items-center gap-2">
              <div class="w-2 h-2 rounded-full bg-primary animate-bounce" style="animation-delay: 0ms;"></div>
              <div class="w-2 h-2 rounded-full bg-primary animate-bounce" style="animation-delay: 150ms;"></div>
              <div class="w-2 h-2 rounded-full bg-primary animate-bounce" style="animation-delay: 300ms;"></div>
            </div>
          </div>
        </div>

        <!-- Error -->
        <div v-if="error" class="flex justify-center">
          <div class="bg-red-500/10 border border-red-500/20 rounded-xl px-6 py-4 flex items-center gap-4">
            <i class='bx bx-error-circle text-2xl text-red-500'></i>
            <div>
              <p class="font-medium text-red-500">發生錯誤</p>
              <p class="text-sm text-muted">請稍後再試或開始新對話</p>
            </div>
            <button 
              @click="reset" 
              class="ml-4 px-4 py-2 bg-red-500/20 hover:bg-red-500/30 rounded-lg text-red-500 text-sm font-medium transition-colors cursor-pointer"
            >
              重試
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Input Area -->
    <div class="border-t border-border bg-surface/50 backdrop-blur-xl">
      <form @submit.prevent="submitMsg" class="max-w-4xl mx-auto px-6 py-4">
        <div class="flex gap-3 items-end">
          <div class="flex-1 relative">
            <textarea 
              v-model.trim="prompt" 
              id="prompt" 
              required 
              name="prompt" 
              rows="1"
              @input="autoResize"
              @keydown.enter.exact.prevent="submitMsg"
              class="input w-full min-h-[52px] max-h-[200px] resize-none pr-12"
              placeholder="輸入訊息... (Enter 發送)"
            ></textarea>
          </div>
          <button 
            type="submit" 
            :disabled="loading || !prompt"
            class="btn-primary h-[52px] w-[52px] flex items-center justify-center cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <i class='bx bx-send text-xl'></i>
          </button>
        </div>
        <p class="text-xs text-muted mt-3 text-center">
          AI 可能會產生不準確的資訊，請謹慎驗證重要內容
        </p>
      </form>
    </div>
  </div>
</template>

<script setup>
import { onUpdated, ref, useTemplateRef } from 'vue'
import { TextBlock } from '@/components/base'

const prompt = ref('')
const messages = ref([])

const suggestions = [
  '幫我寫一個產品介紹的文案',
  '解釋什麼是機器學習',
  '給我一些提高生產力的建議'
]

const API_DOMAIN = import.meta.env.VITE_API_URL
const loading = ref(false)
const error = ref(false)

const submitMsg = async () => {
  if (!prompt.value || loading.value) return
  
  loading.value = true
  error.value = false
  messages.value.push({
    role: 'user',
    content: prompt.value
  })
  prompt.value = ''
  
  try {
    const response = await fetch(`${API_DOMAIN}/text`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        messages: messages.value
      })
    })
    
    if (!response.ok) {
      throw new Error('Request failed')
    }
    
    const data = await response.json()
    messages.value.push({
      role: 'assistant',
      content: data.choices[0].message.content
    })
  } catch (err) {
    error.value = true
    console.error(err)
  } finally {
    loading.value = false
  }
}

const talkContent = useTemplateRef('talk')
onUpdated(() => {
  if (talkContent.value) {
    talkContent.value.scrollTop = talkContent.value.scrollHeight
  }
})

const reset = () => {
  messages.value = []
  error.value = false
  prompt.value = ''
}

const autoResize = (e) => {
  const textarea = e.target
  textarea.style.height = 'auto'
  textarea.style.height = Math.min(textarea.scrollHeight, 200) + 'px'
}
</script>

<style scoped>
.talk {
  scrollbar-width: thin;
  scroll-behavior: smooth;
}
</style>
