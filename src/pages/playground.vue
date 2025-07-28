<template>
  <div class="min-h-screen">
    <div class="container mx-auto px-6 py-12">
      <div class="grid md:grid-cols-3 gap-12">
        <div class="md:col-span-1 p-6 rounded-xl border border-text/10 bg-text text-background shadow-lg backdrop-blur-lg">
          <h2 class="text-2xl font-bold mb-6 text-center">Playground</h2>
          
          <form @submit.prevent="generateImage" class="space-y-6">
            <div>
              <label for="prompt" class="block text-sm font-medium text-text-400 mb-2">Prompt</label>
              <textarea required v-model.trim="prompt" id="prompt" name="prompt" rows="4" class="w-full bg-white/10 appearance-none border border-text/20 rounded-lg p-3 placeholder-gray-500 resize-none focus:ring-indigo-500 focus:border-indigo-500" placeholder="輸入您想生成的圖片描述..."></textarea>
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
            
            <button :disabled="loading" class="cursor-pointer w-full px-8 py-3 bg-primary rounded-2xl text-background hover:opacity-80 transition-opacity">生成圖片</button>
          </form>
        </div>

        <div class="md:col-span-2">
          <div class="bg-text p-4 rounded-xl border border-text/10 shadow-lg backdrop-blur-lg h-full">
            <img class="w-full h-full object-contain" v-if="result" :src="result" alt="ai image">
            <div v-else-if="loading" class=" flex items-center justify-center h-full">
              <i class="bx bx-loader-lines bx-spin bx-sm" />
            </div>
            <div v-else class="aspect-square bg-gradient-to-br from-primary/10 to-accent/10 rounded-lg flex items-center justify-center">
              <p class="text-text/60">圖片生成結果將顯示於此</p>
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
const API_DOMAIN = import.meta.env.VITE_API_URL

const generateImage = async () => {
  loading.value = true
  result.value = ''
  try {
    const response = await fetch(`${ API_DOMAIN }/image/${ prompt.value }?model=${ model.value }`)
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
    const response = await fetch(API_DOMAIN + '/image/models')
    const data = await response.json()
    models.value = data
  } catch (error) {
    console.error(error)
  }
}

onMounted(async () => {
  await getAllModels()
  if (models.value?.length) model.value = models.value[0]
})

</script>