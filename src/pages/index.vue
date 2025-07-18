<template>
  <div class="bg-[#0A0A0A] text-gray-300">
    <div class="pt-32">
      <section class="text-center container mx-auto px-6 py-24">
        <h1 class="text-5xl md:text-7xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400 leading-tight">
          釋放您的無限創造力
        </h1>
        <p class="mt-6 text-lg text-gray-400 max-w-2xl mx-auto">
          Mind Canvas 是一款視覺化協作平台，將您的靈感、想法和專案匯集於一處。從腦力激盪到專案管理，我們助您化繁為簡。
        </p>
        <div class="mt-10">
          <router-link to="/chat" class="px-8 py-4 font-semibold bg-primary hover:opacity-80 transition-opacity rounded-2xl text-background">
            立即開始，完全免費
          </router-link>
        </div>
      </section>

      <section v-for="img in images" class=" group container mx-auto px-6 py-20">
        <div class="flex items-center justify-center gap-12">
          <div class="w-1/2 group-odd:order-1">
            <h2 class="text-3xl font-bold text-white mb-4">{{ img.title }}</h2>
            <p class="text-gray-400 leading-relaxed">{{ img.description }}</p>
          </div>
          <div class="w-1/2 bg-white/5 p-4 rounded-xl border border-white/10 shadow-lg backdrop-blur-lg">
            <Suspense>
              <ImageBlock/>
              <template #fallback>
                <div :class="img.bg" class="aspect-video bg-gradient-to-br rounded-lg animate-pulse" />
              </template>
            </Suspense>
          </div>
        </div>
      </section>

      <section class="container mx-auto px-6 py-24 text-center">
          <h2 class="text-4xl font-bold text-white">準備好改變您的工作方式了嗎？</h2>
          <p class="mt-4 text-lg text-gray-400">立即加入，探索視覺化協作的全新境界。</p>
          <div class="mt-8">
            <router-link to="/chat" class="px-8 py-4 font-semibold bg-primary hover:opacity-80 transition-opacity rounded-2xl text-background">
              立即開始，完全免費
            </router-link>
          </div>
      </section>

    </div>
  </div>
</template>

<script setup>
import { ImageBlock } from '../components/base'
const images = [
  {
    title: '無限畫布，無限可能',
    description: '擺脫傳統簡報和文件的線性束縛。在我們的無限畫布上，您可以自由地組織想法、繪製流程圖、貼上便條，並建立一個專屬於您和團隊的視覺化知識庫。空間再也不是限制，您的思維可以無限延伸。',
    bg: 'from-purple-500/20 to-blue-500/20'
  },
  {
    title: '即時協作，同步思維',
    description: '邀請您的團隊成員加入畫布，即時進行腦力激盪與協作。看著每個人的游標在畫布上移動，共同編輯、評論和註釋。無論團隊身在何處，都能像在同一個房間一樣緊密合作，激發集體智慧。',
    bg: 'from-pink-500/20 to-indigo-500/20'
  },
  {
    title: '強大整合，無縫工作',
    description: 'Mind Canvas 能與您喜愛的工作流程無縫整合。輕鬆嵌入來自 Figma、Google Docs、YouTube 的內容，或透過我們的 API 將工作流程自動化。我們致力於打破工具間的壁壘，讓您的工作流暢無阻。',
    bg: 'from-green-500/20 to-cyan-500/20'
  }
]
</script>
