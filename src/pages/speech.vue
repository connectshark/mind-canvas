<template>
  <h1 class=" text-4xl/loose py-10 text-center">SPEECH</h1>
  <form class=" w-5/6 mx-auto mb-20" @submit.prevent="submitHandler">
    <label for="prompt" required class="block text-sm font-medium text-gray-400 mb-2">Prompt</label>
    <textarea v-model.trim="prompt" id="prompt" name="prompt" rows="4" class="w-full bg-white/10 appearance-none border border-white/20 rounded-lg p-3 text-white placeholder-gray-500 resize-none focus:ring-indigo-500 focus:border-indigo-500" placeholder="輸入您想生成的語音描述..."></textarea>
    <div class=" text-center py-10">
      <button class=" bg-primary hover:opacity-80 p-2 rounded-2xl cursor-pointer" type="submit">送出文字</button>
    </div>
  </form>
  <div v-if="loading" class="text-center">
    <i class="bx bx-loader-lines bx-spin bx-sm" />
  </div>
  <div v-if="mp3" class="flex justify-center mb-20">
    <audio :src="mp3" controls></audio>
  </div>
</template>

<script setup>
import { ref } from 'vue'
const API_DOMAIN = import.meta.env.VITE_API_URL
const prompt = ref('')

const mp3 = ref(undefined)
const loading = ref(false)
const submitHandler = async () => {
  loading.value = true
  const response = await fetch(`${ API_DOMAIN }/text/speech/${ prompt.value }`)
  const blob = await response.blob()
  const url = URL.createObjectURL(blob)
  mp3.value = url
  loading.value = false
}
</script>