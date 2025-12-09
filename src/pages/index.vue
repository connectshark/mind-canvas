<template>
  <div class="relative overflow-hidden">
    <!-- Hero Section -->
    <section class="relative min-h-[90vh] flex items-center">
      <!-- Background Effects -->
      <div class="absolute inset-0 overflow-hidden">
        <div class="absolute top-1/4 -left-32 w-96 h-96 bg-primary/20 rounded-full blur-3xl animate-pulse"></div>
        <div class="absolute bottom-1/4 -right-32 w-96 h-96 bg-accent/20 rounded-full blur-3xl animate-pulse" style="animation-delay: 1s;"></div>
        <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-secondary/10 rounded-full blur-3xl"></div>
        <div class="absolute inset-0 dot-pattern opacity-30"></div>
      </div>

      <div class="relative max-w-7xl mx-auto px-6 py-24">
        <div class="text-center max-w-4xl mx-auto">
          <!-- Badge -->
          <div class="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-surface-elevated border border-border mb-8">
            <span class="relative flex h-2 w-2">
              <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75"></span>
              <span class="relative inline-flex rounded-full h-2 w-2 bg-accent"></span>
            </span>
            <span class="text-sm font-medium text-muted">AI 驅動的創意工具</span>
          </div>

          <!-- Headline -->
          <h1 class="text-5xl md:text-7xl lg:text-8xl font-bold font-title leading-tight mb-8">
            <span class="gradient-text animate-gradient">釋放您的</span>
            <br />
            <span>無限創造力</span>
          </h1>

          <!-- Subheadline -->
          <p class="text-lg md:text-xl text-muted max-w-2xl mx-auto mb-12 leading-relaxed">
            Mind Canvas 是一款 AI 驅動的視覺化協作平台，將您的靈感、想法和專案匯集於一處。
            從腦力激盪到專案管理，我們助您化繁為簡。
          </p>

          <!-- CTA Buttons -->
          <div class="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <router-link to="/chat" class="btn-primary text-lg px-8 py-4 glow cursor-pointer">
              <i class='bx bx-rocket mr-2'></i>
              立即開始，完全免費
            </router-link>
            <router-link to="/playground" class="btn-secondary text-lg px-8 py-4 cursor-pointer">
              <i class='bx bx-play mr-2'></i>
              探索 Playground
            </router-link>
          </div>

          <!-- Social Proof -->
          <div class="mt-16 flex flex-col sm:flex-row items-center justify-center gap-8 text-muted">
            <div class="flex -space-x-3">
              <div class="w-10 h-10 rounded-full bg-linear-to-br from-primary to-secondary flex items-center justify-center text-white text-sm font-bold border-2 border-background">A</div>
              <div class="w-10 h-10 rounded-full bg-linear-to-br from-accent to-primary flex items-center justify-center text-white text-sm font-bold border-2 border-background">B</div>
              <div class="w-10 h-10 rounded-full bg-linear-to-br from-secondary to-accent flex items-center justify-center text-white text-sm font-bold border-2 border-background">C</div>
              <div class="w-10 h-10 rounded-full bg-surface-elevated flex items-center justify-center text-sm font-medium border-2 border-background">+99</div>
            </div>
            <span class="text-sm">加入數百位創作者的行列</span>
          </div>
        </div>
      </div>

      <!-- Scroll Indicator -->
      <div class="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <i class='bx bx-chevron-down text-3xl text-muted'></i>
      </div>
    </section>

    <!-- Features Section -->
    <section class="relative py-32">
      <div class="max-w-7xl mx-auto px-6">
        <!-- Section Header -->
        <div class="text-center mb-20">
          <span class="text-sm font-semibold text-primary uppercase tracking-wider">功能特色</span>
          <h2 class="text-4xl md:text-5xl font-bold font-title mt-4 mb-6">
            為創意工作者打造
          </h2>
          <p class="text-lg text-muted max-w-2xl mx-auto">
            我們提供一系列強大的 AI 工具，幫助您將創意轉化為現實
          </p>
        </div>

        <!-- Feature Cards -->
        <div class="grid md:grid-cols-3 gap-8">
          <div 
            v-for="(feature, index) in features" 
            :key="index"
            class="group relative card p-8 hover:border-primary/50 transition-all duration-300"
          >
            <!-- Glow Effect -->
            <div class="absolute inset-0 bg-linear-to-br from-primary/5 to-accent/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
            
            <div class="relative">
              <div class="w-14 h-14 rounded-xl bg-linear-to-br from-primary to-secondary flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <i :class="feature.icon" class="text-2xl text-white"></i>
              </div>

              <h3 class="text-xl font-bold mb-3">{{ feature.title }}</h3>
              <p class="text-muted leading-relaxed">{{ feature.description }}</p>

              <router-link 
                :to="feature.link" 
                class="inline-flex items-center gap-2 mt-6 text-primary font-medium hover:gap-3 transition-all"
              >
                開始使用
                <i class='bx bx-right-arrow-alt'></i>
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="relative py-32 overflow-hidden">
      <div class="absolute inset-0 bg-linear-to-b from-transparent via-surface to-transparent"></div>
      
      <div class="relative max-w-7xl mx-auto px-6">
        <div v-for="(showcase, index) in showcases" :key="index" class="mb-32 last:mb-0">
          <div class="grid md:grid-cols-2 gap-12 items-center" :class="{ 'md:flex-row-reverse': index % 2 === 1 }">
            <div :class="{ 'md:order-2': index % 2 === 1 }">
              <span class="text-sm font-semibold text-accent uppercase tracking-wider">{{ showcase.badge }}</span>
              <h3 class="text-3xl md:text-4xl font-bold font-title mt-4 mb-6">{{ showcase.title }}</h3>
              <p class="text-lg text-muted leading-relaxed mb-8">{{ showcase.description }}</p>
              
              <ul class="space-y-4">
                <li v-for="(item, i) in showcase.features" :key="i" class="flex items-start gap-3">
                  <div class="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center shrink-0 mt-0.5">
                    <i class='bx bx-check text-primary'></i>
                  </div>
                  <span class="text-muted">{{ item }}</span>
                </li>
              </ul>
            </div>

            <!-- Image -->
            <div :class="{ 'md:order-1': index % 2 === 1 }">
              <div class="relative group">
                <!-- Glow -->
                <div class="absolute -inset-4 bg-linear-to-r from-primary/20 to-accent/20 rounded-3xl blur-2xl opacity-50 group-hover:opacity-75 transition-opacity"></div>
                
                <!-- Card -->
                <div class="relative card-elevated p-2 overflow-hidden">
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Stats Section -->
    <section class="relative py-24">
      <div class="max-w-7xl mx-auto px-6">
        <div class="card-elevated p-12 md:p-16">
          <div class="grid md:grid-cols-4 gap-8 md:gap-12">
            <div v-for="stat in stats" :key="stat.label" class="text-center">
              <div class="text-4xl md:text-5xl font-bold gradient-text mb-2">{{ stat.value }}</div>
              <div class="text-muted">{{ stat.label }}</div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA Section -->
    <section class="relative py-32">
      <!-- Background -->
      <div class="absolute inset-0 overflow-hidden">
        <div class="absolute top-0 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-3xl"></div>
        <div class="absolute bottom-0 right-1/4 w-96 h-96 bg-accent/20 rounded-full blur-3xl"></div>
      </div>

      <div class="relative max-w-4xl mx-auto px-6 text-center">
        <h2 class="text-4xl md:text-6xl font-bold font-title mb-6">
          準備好改變您的<br />
          <span class="gradient-text">工作方式</span>了嗎？
        </h2>
        <p class="text-lg text-muted mb-12 max-w-2xl mx-auto">
          立即加入，探索 AI 驅動的視覺化協作全新境界。無需信用卡，永久免費。
        </p>
        <div class="flex flex-col sm:flex-row gap-4 justify-center">
          <router-link to="/chat" class="btn-primary text-lg px-10 py-5 glow cursor-pointer">
            <i class='bx bx-rocket mr-2'></i>
            立即開始
          </router-link>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ImageBlock } from '../components/base'

const features = [
  {
    icon: 'bx bx-chat',
    title: 'AI 智能對話',
    description: '與先進的 AI 助手進行自然對話，獲得即時回應和創意建議，讓您的想法快速成形。',
    link: '/chat'
  },
  {
    icon: 'bx bx-image',
    title: '圖像生成',
    description: '透過文字描述生成獨特的視覺圖像，支援多種風格和模型，激發您的視覺創意。',
    link: '/playground'
  },
  {
    icon: 'bx bx-microphone',
    title: '語音合成',
    description: '將文字轉換為自然流暢的語音，適用於內容創作、無障礙設計等多種場景。',
    link: '/speech'
  }
]

const showcases = [
  {
    badge: '無限畫布',
    title: '無限畫布，無限可能',
    description: '擺脫傳統簡報和文件的線性束縛。在我們的無限畫布上，您可以自由地組織想法、繪製流程圖、貼上便條，並建立一個專屬於您和團隊的視覺化知識庫。',
    features: [
      '自由縮放和平移的無限空間',
      '豐富的繪圖和標註工具',
      '智能連接和自動佈局'
    ],
    gradient: 'from-violet-500/30 to-indigo-500/30'
  },
  {
    badge: '即時協作',
    title: '即時協作，同步思維',
    description: '邀請您的團隊成員加入畫布，即時進行腦力激盪與協作。看著每個人的游標在畫布上移動，共同編輯、評論和註釋。',
    features: [
      '多人即時編輯',
      '游標追蹤和存在感知',
      '評論和討論串'
    ],
    gradient: 'from-rose-500/30 to-pink-500/30'
  },
  {
    badge: '強大整合',
    title: '強大整合，無縫工作',
    description: 'Mind Canvas 能與您喜愛的工作流程無縫整合。輕鬆嵌入來自各種來源的內容，或透過我們的 API 將工作流程自動化。',
    features: [
      '支援多種檔案格式',
      '第三方應用整合',
      '開放 API 和 Webhook'
    ],
    gradient: 'from-emerald-500/30 to-teal-500/30'
  }
]

const stats = [
  { value: '10K+', label: '活躍用戶' },
  { value: '50K+', label: '生成圖像' },
  { value: '99.9%', label: '服務可用性' },
  { value: '24/7', label: '技術支援' }
]
</script>
