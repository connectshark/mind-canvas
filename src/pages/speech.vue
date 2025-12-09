<template>
  <div class="min-h-[calc(100vh-73px)]">
    <!-- Header -->
    <div class="border-b border-border bg-surface/50 backdrop-blur-xl">
      <div class="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between">
        <div class="flex items-center gap-3">
          <div class="w-10 h-10 rounded-xl bg-linear-to-br from-secondary to-accent flex items-center justify-center">
            <i class='bx bx-microphone text-xl text-white'></i>
          </div>
          <div>
            <h1 class="font-bold font-title">語音合成</h1>
            <p class="text-sm text-muted">將文字轉換為自然語音</p>
          </div>
        </div>
      </div>
    </div>

    <div class="max-w-4xl mx-auto px-6 py-12">
      <!-- Main Card -->
      <div class="card p-8">
        <!-- Input Section -->
        <div class="mb-8">
          <label for="prompt" class="block text-sm font-medium mb-3">
            輸入文字 <span class="text-red-500">*</span>
          </label>
          <textarea 
            v-model.trim="prompt" 
            id="prompt" 
            name="prompt" 
            rows="6" 
            required
            class="input w-full resize-none"
            placeholder="輸入您想要轉換為語音的文字內容..."
          ></textarea>
          <div class="flex justify-between items-center mt-2">
            <p class="text-xs text-muted">
              支援中文、英文等多種語言
            </p>
            <p class="text-xs text-muted">
              {{ prompt.length }} 字元
            </p>
          </div>
        </div>

        <!-- Quick Templates -->
        <div class="mb-8">
          <p class="text-sm font-medium mb-3">快速範本</p>
          <div class="flex flex-wrap gap-2">
            <button 
              v-for="template in templates" 
              :key="template"
              @click="prompt = template"
              class="px-4 py-2 rounded-lg bg-surface-elevated border border-border hover:border-primary/50 text-sm transition-all cursor-pointer"
            >
              {{ template.slice(0, 20) }}...
            </button>
          </div>
        </div>

        <!-- Generate Button -->
        <form @submit.prevent="submitHandler">
          <button 
            type="submit"
            :disabled="loading || !prompt"
            class="btn-primary w-full py-4 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <i v-if="loading" class='bx bx-loader-alt bx-spin'></i>
            <i v-else class='bx bx-volume-full'></i>
            {{ loading ? '生成中...' : '生成語音' }}
          </button>
        </form>
      </div>

      <!-- Result Section -->
      <div v-if="mp3 || loading" class="card p-8 mt-8">
        <h2 class="text-lg font-bold mb-6 flex items-center gap-2">
          <i class='bx bx-music text-primary'></i>
          生成結果
        </h2>

        <!-- Loading State -->
        <div v-if="loading" class="text-center py-12">
          <div class="w-20 h-20 mx-auto mb-6 rounded-2xl bg-linear-to-br from-secondary/20 to-accent/20 flex items-center justify-center">
            <i class='bx bx-loader-alt bx-spin text-4xl text-secondary'></i>
          </div>
          <p class="text-muted">正在生成您的語音...</p>
          <p class="text-sm text-muted mt-2">這可能需要幾秒鐘</p>
        </div>

        <!-- Audio Player -->
        <div v-else-if="mp3" class="space-y-6">
          <!-- Custom Audio Player -->
          <div class="bg-surface-elevated rounded-xl p-6 border border-border">
            <div class="flex items-center gap-4">
              <!-- Play Button -->
              <button 
                @click="togglePlay"
                class="w-14 h-14 rounded-full bg-linear-to-br from-primary to-secondary flex items-center justify-center hover:scale-105 transition-transform cursor-pointer"
              >
                <i :class="isPlaying ? 'bx-pause' : 'bx-play'" class='bx text-2xl text-white ml-0.5'></i>
              </button>

              <!-- Waveform Placeholder -->
              <div class="flex-1">
                <div class="flex items-center gap-1 h-12">
                  <div 
                    v-for="i in 40" 
                    :key="i"
                    class="flex-1 rounded-full transition-all duration-200"
                    :class="isPlaying ? 'bg-primary animate-pulse' : 'bg-border'"
                    :style="{ 
                      height: `${Math.random() * 100}%`,
                      animationDelay: `${i * 50}ms`
                    }"
                  ></div>
                </div>
              </div>

              <!-- Download Button -->
              <button 
                @click="downloadAudio"
                class="w-12 h-12 rounded-xl bg-surface border border-border hover:border-primary/50 flex items-center justify-center transition-all cursor-pointer"
              >
                <i class='bx bx-download text-xl'></i>
              </button>
            </div>

            <!-- Native Audio (hidden but functional) -->
            <audio 
              ref="audioPlayer"
              :src="mp3" 
              @play="isPlaying = true"
              @pause="isPlaying = false"
              @ended="isPlaying = false"
              class="hidden"
            ></audio>
          </div>

          <!-- Actions -->
          <div class="flex gap-3">
            <button 
              @click="resetAudio"
              class="btn-secondary flex-1 py-3 flex items-center justify-center gap-2 cursor-pointer"
            >
              <i class='bx bx-refresh'></i>
              重新生成
            </button>
            <button 
              @click="downloadAudio"
              class="btn-primary flex-1 py-3 flex items-center justify-center gap-2 cursor-pointer"
            >
              <i class='bx bx-download'></i>
              下載音檔
            </button>
          </div>
        </div>
      </div>

      <!-- Features -->
      <div class="grid md:grid-cols-3 gap-6 mt-12">
        <div class="card p-6 text-center">
          <div class="w-12 h-12 mx-auto mb-4 rounded-xl bg-linear-to-br from-primary/20 to-secondary/20 flex items-center justify-center">
            <i class='bx bx-world text-2xl text-primary'></i>
          </div>
          <h3 class="font-semibold mb-2">多語言支援</h3>
          <p class="text-sm text-muted">支援中文、英文等多種語言的語音合成</p>
        </div>
        <div class="card p-6 text-center">
          <div class="w-12 h-12 mx-auto mb-4 rounded-xl bg-linear-to-br from-accent/20 to-primary/20 flex items-center justify-center">
            <i class='bx bx-headphone text-2xl text-accent'></i>
          </div>
          <h3 class="font-semibold mb-2">高品質音訊</h3>
          <p class="text-sm text-muted">採用先進 AI 技術，生成自然流暢的語音</p>
        </div>
        <div class="card p-6 text-center">
          <div class="w-12 h-12 mx-auto mb-4 rounded-xl bg-linear-to-br from-secondary/20 to-accent/20 flex items-center justify-center">
            <i class='bx bx-download text-2xl text-secondary'></i>
          </div>
          <h3 class="font-semibold mb-2">免費下載</h3>
          <p class="text-sm text-muted">生成的音檔可免費下載，無任何限制</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, useTemplateRef } from 'vue'

const API_DOMAIN = import.meta.env.VITE_API_URL
const prompt = ref('')
const mp3 = ref(undefined)
const loading = ref(false)
const isPlaying = ref(false)

const templates = [
  '歡迎使用 Mind Canvas，這是一款 AI 驅動的創意工具平台。',
  '今天天氣晴朗，適合出門散步，享受美好的一天。',
  'Hello, welcome to Mind Canvas. Let creativity flow freely.'
]

const audioPlayer = useTemplateRef('audioPlayer')

const submitHandler = async () => {
  if (!prompt.value || loading.value) return
  
  loading.value = true
  mp3.value = undefined
  
  try {
    const response = await fetch(`${API_DOMAIN}/text/speech/${prompt.value}`)
    const blob = await response.blob()
    const url = URL.createObjectURL(blob)
    mp3.value = url
  } catch (error) {
    console.error(error)
  } finally {
    loading.value = false
  }
}

const togglePlay = () => {
  if (!audioPlayer.value) return
  
  if (isPlaying.value) {
    audioPlayer.value.pause()
  } else {
    audioPlayer.value.play()
  }
}

const downloadAudio = () => {
  if (!mp3.value) return
  
  const link = document.createElement('a')
  link.href = mp3.value
  link.download = `mind-canvas-speech-${Date.now()}.mp3`
  link.click()
}

const resetAudio = () => {
  mp3.value = undefined
  isPlaying.value = false
}
</script>
