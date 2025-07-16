<template>
  <div class="bg-[#0A0A0A] text-gray-300 min-h-screen">
    <div class="container mx-auto px-6 py-12">
      <div class="grid md:grid-cols-3 gap-12">
        <div class="md:col-span-1 bg-white/5 p-6 rounded-xl border border-white/10 shadow-lg backdrop-blur-lg">
          <h2 class="text-2xl font-bold mb-6 text-center">Playground</h2>
          
          <div class="space-y-6">
            <div>
              <label for="prompt" class="block text-sm font-medium text-gray-400 mb-2">Prompt</label>
              <textarea v-model.trim="prompt" id="prompt" name="prompt" rows="4" class="w-full bg-white/10 appearance-none border border-white/20 rounded-lg p-3 text-white placeholder-gray-500 resize-none focus:ring-indigo-500 focus:border-indigo-500" placeholder="輸入您想生成的圖片描述..."></textarea>
            </div>

            <div>
              <label for="model" class="block text-sm font-medium text-gray-400 mb-2">Model</label>
              <select v-model="model" id="model" name="model" class="w-full bg-white/10 border border-white/20 rounded-lg p-3 text-white focus:ring-indigo-500 focus:border-indigo-500">
                <option v-for="model in models" :value="model">{{ model }}</option>
              </select>
            </div>

            <div>
              <label for="size" class="block text-sm font-medium text-gray-400 mb-2">圖片大小</label>
              <select id="size" name="size" class="w-full bg-white/10 border border-white/20 rounded-lg p-3 text-white focus:ring-indigo-500 focus:border-indigo-500">
                <option>1024x1024</option>
                <option>512x512</option>
                <option>256x256</option>
              </select>
            </div>
            
            <button @click="generateImage" :disabled="loading" class="cursor-pointer w-full px-8 py-3 text-white bg-indigo-600 hover:bg-indigo-500 rounded-lg transition-colors shadow-[0_0_20px_rgba(99,102,241,0.5)]">
              生成圖片
            </button>
          </div>
        </div>

        <!-- Image Display -->
        <div class="md:col-span-2">
          <div class="bg-white/5 p-4 rounded-xl border border-white/10 shadow-lg backdrop-blur-lg h-full">
            <img class="w-full h-full object-contain" v-if="result" :src="result" alt="ai image">
            <div v-else class="aspect-square bg-gradient-to-br from-purple-500/10 to-blue-500/10 rounded-lg flex items-center justify-center">
              <p class="text-gray-500">圖片生成結果將顯示於此</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
const prompt = ref('')
const model = ref('')

const loading = ref(false)
const result = ref('')
const API_DOMAIN = import.meta.env.VITE_API_IMAGE_URL

const generateImage = async () => {
  loading.value = true
  result.value = ''
  try {
    const response = await fetch(API_DOMAIN + `/prompt/${ prompt.value }?model=${ model.value }&safe=false`)
    const blob = await response.blob()
    const url = URL.createObjectURL(blob)
    result.value = url
  } catch (error) {
    console.error(error)
  } finally {
    loading.value = false
  }
}

const models = ref([])

const getAllModels = async () => {
  try {
    const response = await fetch(API_DOMAIN + '/models')
    const data = await response.json()
    models.value = data.models
  } catch (error) {
    console.error(error)
  }
}

onMounted(async () => {
  await getAllModels()
  model.value = models.value[0]
})

</script>