<template>
  <div class="min-h-[calc(100vh-73px)]">
    <!-- Header -->
    <div class="border-b border-border bg-surface/50 backdrop-blur-xl">
      <div class="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <div class="flex items-center gap-3">
          <div class="w-10 h-10 rounded-xl bg-linear-to-br from-accent to-primary flex items-center justify-center">
            <i class='bx bx-palette text-xl text-white'></i>
          </div>
          <div>
            <h1 class="font-bold font-title">AI 圖像生成</h1>
            <p class="text-sm text-muted">透過文字描述生成獨特圖像</p>
          </div>
        </div>
      </div>
    </div>

    <div class="max-w-7xl mx-auto px-6 py-8">
      <div class="grid lg:grid-cols-5 gap-8">
        <!-- Sidebar - Settings -->
        <div class="lg:col-span-2">
          <div class="card p-6 sticky top-24">
            <h2 class="text-lg font-bold mb-6 flex items-center gap-2">
              <i class='bx bx-cog text-primary'></i>
              生成設定
            </h2>
            
            <form @submit.prevent="generateImage" class="space-y-6">
              <!-- Prompt -->
              <div>
                <label for="prompt" class="block text-sm font-medium mb-2">
                  描述 <span class="text-red-500">*</span>
                </label>
                <textarea 
                  required 
                  v-model.trim="prompt" 
                  id="prompt" 
                  name="prompt" 
                  rows="4" 
                  class="input w-full resize-none"
                  placeholder="描述您想要生成的圖像，例如：一隻在星空下奔跑的白色獨角獸..."
                ></textarea>
                <p class="text-xs text-muted mt-2">
                  提示：描述越詳細，生成效果越好
                </p>
              </div>

              <!-- Model Selection -->
              <div>
                <label for="model" class="block text-sm font-medium mb-2">
                  模型
                </label>
                <div class="relative">
                  <select 
                    v-model="model" 
                    id="model" 
                    name="model" 
                    class="input w-full appearance-none pr-10 cursor-pointer"
                  >
                    <option v-for="m in models" :key="m" :value="m">{{ m }}</option>
                  </select>
                  <i class='bx bx-chevron-down absolute right-3 top-1/2 -translate-y-1/2 text-muted pointer-events-none'></i>
                </div>
              </div>

              <!-- Size Selection -->
              <div>
                <label for="size" class="block text-sm font-medium mb-2">
                  圖片尺寸
                </label>
                <div class="grid grid-cols-3 gap-2">
                  <button
                    v-for="s in sizes"
                    :key="s.value"
                    type="button"
                    @click="size = s.value"
                    class="px-3 py-2 rounded-lg border text-sm font-medium transition-all cursor-pointer"
                    :class="size === s.value 
                      ? 'border-primary bg-primary/10 text-primary' 
                      : 'border-border hover:border-primary/50'"
                  >
                    {{ s.label }}
                  </button>
                </div>
              </div>

              <!-- Generate Button -->
              <button 
                type="submit"
                :disabled="loading || !prompt"
                class="btn-primary w-full py-4 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <i v-if="loading" class='bx bx-loader-alt bx-spin'></i>
                <i v-else class='bx bx-magic-wand'></i>
                {{ loading ? '生成中...' : '生成圖片' }}
              </button>
            </form>

            <!-- Tips -->
            <div class="mt-8 p-4 rounded-xl bg-surface-elevated border border-border">
              <h3 class="text-sm font-semibold mb-3 flex items-center gap-2">
                <i class='bx bx-bulb text-accent'></i>
                提示技巧
              </h3>
              <ul class="space-y-2 text-sm text-muted">
                <li class="flex items-start gap-2">
                  <i class='bx bx-check text-accent mt-0.5'></i>
                  使用具體的形容詞描述風格
                </li>
                <li class="flex items-start gap-2">
                  <i class='bx bx-check text-accent mt-0.5'></i>
                  指定光線、角度和構圖
                </li>
                <li class="flex items-start gap-2">
                  <i class='bx bx-check text-accent mt-0.5'></i>
                  嘗試不同的藝術風格關鍵字
                </li>
              </ul>
            </div>
          </div>
        </div>

        <!-- Main - Result -->
        <div class="lg:col-span-3">
          <div class="card p-6 min-h-[500px] flex flex-col">
            <div class="flex items-center justify-between mb-6">
              <h2 class="text-lg font-bold flex items-center gap-2">
                <i class='bx bx-image text-primary'></i>
                生成結果
              </h2>
              <button 
                v-if="result"
                @click="downloadImage"
                class="btn-secondary px-4 py-2 text-sm flex items-center gap-2 cursor-pointer"
              >
                <i class='bx bx-download'></i>
                下載
              </button>
            </div>

            <!-- Result Display -->
            <div class="flex-1 flex items-center justify-center">
              <!-- Generated Image -->
              <div v-if="result" class="relative group w-full">
                <div class="absolute -inset-2 bg-gradient-to-r from-primary/20 to-accent/20 rounded-2xl blur-xl opacity-50"></div>
                <img 
                  :src="result" 
                  alt="AI Generated Image" 
                  class="relative w-full rounded-xl shadow-xl"
                />
              </div>

              <!-- Loading State -->
              <div v-else-if="loading" class="text-center">
                <div class="w-24 h-24 mx-auto mb-6 rounded-2xl bg-linear-to-br from-primary/20 to-accent/20 flex items-center justify-center animate-pulse">
                  <i class='bx bx-loader-alt bx-spin text-4xl text-primary'></i>
                </div>
                <p class="text-muted">正在生成您的圖像...</p>
                <p class="text-sm text-muted mt-2">這可能需要幾秒鐘</p>
              </div>

              <!-- Empty State -->
              <div v-else class="text-center">
                <div class="w-24 h-24 mx-auto mb-6 rounded-2xl bg-linear-to-br from-primary/10 to-accent/10 flex items-center justify-center">
                  <i class='bx bx-image-add text-4xl text-muted'></i>
                </div>
                <h3 class="text-lg font-semibold mb-2">尚未生成圖像</h3>
                <p class="text-muted text-sm max-w-sm">
                  在左側輸入您的描述，然後點擊「生成圖片」按鈕開始創作
                </p>
              </div>
            </div>
          </div>

          <!-- Gallery - History -->
          <div class="card p-6 mt-6">
            <div class="flex items-center justify-between mb-4">
              <h2 class="text-lg font-bold flex items-center gap-2">
                <i class='bx bx-history text-primary'></i>
                最近生成
              </h2>
              <button 
                v-if="recentImages.length > 0"
                @click="imageStore.clearHistory()"
                class="text-sm text-muted hover:text-red-500 transition-colors cursor-pointer"
              >
                清除全部
              </button>
            </div>
            <div class="grid grid-cols-4 gap-3">
              <!-- 有歷史紀錄時顯示圖片 -->
              <div 
                v-for="record in recentImages" 
                :key="record.id"
                @click="loadHistoryImage(record)"
                class="group relative aspect-square rounded-lg overflow-hidden border border-border cursor-pointer hover:border-primary transition-colors"
              >
                <img 
                  :src="record.imageData" 
                  :alt="record.prompt"
                  class="w-full h-full object-cover"
                />
                <div class="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <i class='bx bx-search-alt text-2xl text-white'></i>
                </div>
              </div>
              <!-- 空白佔位符 -->
              <div 
                v-for="i in Math.max(0, 4 - recentImages.length)" 
                :key="'empty-' + i"
                class="aspect-square rounded-lg bg-surface-elevated border border-border flex items-center justify-center"
              >
                <i class='bx bx-image text-2xl text-muted'></i>
              </div>
            </div>
            <p v-if="recentImages.length === 0" class="text-sm text-muted text-center mt-4">
              您的生成歷史將顯示在這裡
            </p>
            <p v-else class="text-sm text-muted text-center mt-4">
              點擊圖片可載入該次生成的設定
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref, computed } from 'vue'
import { useImageStore } from '@/stores/imageStore'

const imageStore = useImageStore()

const prompt = ref('')
const model = ref('')
const size = ref('1024x1024')

const sizes = [
  { value: '1024x1024', label: '1:1' },
  { value: '1024x768', label: '4:3' },
  { value: '768x1024', label: '3:4' }
]

const loading = ref(false)
const result = ref('')
const API_DOMAIN = import.meta.env.VITE_API_URL

// 取得最近 4 筆生成紀錄
const recentImages = computed(() => imageStore.getRecentItems(4))

// 將 Blob 轉換為 Base64
const blobToBase64 = (blob) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onloadend = () => resolve(reader.result)
    reader.onerror = reject
    reader.readAsDataURL(blob)
  })
}

const generateImage = async () => {
  if (!prompt.value || loading.value) return
  
  loading.value = true
  result.value = ''
  const params = new URLSearchParams()
  params.append('model', model.value)
  params.append('prompt', encodeURIComponent(prompt.value))
  params.append('width', size.value.split('x')[0])
  params.append('height', size.value.split('x')[1])
  try {
    const response = await fetch(`${API_DOMAIN}/image/generate?${params.toString()}`)
    const blob = await response.blob()
    const url = URL.createObjectURL(blob)
    result.value = url
    
    const base64Image = await blobToBase64(blob)
    imageStore.addImage({
      imageData: base64Image,
      prompt: prompt.value,
      model: model.value,
      size: size.value,
      width: parseInt(size.value.split('x')[0]),
      height: parseInt(size.value.split('x')[1])
    })
  } catch (error) {
    console.error(error)
  } finally {
    loading.value = false
  }
}

const downloadImage = () => {
  if (!result.value) return
  
  const link = document.createElement('a')
  link.href = result.value
  link.download = `mind-canvas-${Date.now()}.png`
  link.click()
}

const models = ref([])

const getAllModels = async () => {
  try {
    const response = await fetch(API_DOMAIN + '/image/models')
    const data = await response.json()
    models.value = data
  } catch (error) {
    console.error(error)
  }
}

// 載入歷史紀錄中的圖片
const loadHistoryImage = (record) => {
  result.value = record.imageData
  prompt.value = record.prompt
  model.value = record.model
  size.value = record.size
}

onMounted(async () => {
  await getAllModels()
  if (models.value?.length) model.value = models.value[0]
})
</script>
