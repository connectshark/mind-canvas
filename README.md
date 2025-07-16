# Mind Canvas

[![create-release](https://github.com/connectshark/mind-canvas/actions/workflows/create-release.yml/badge.svg?branch=main)](https://github.com/connectshark/mind-canvas/actions/workflows/create-release.yml)
[![GitHub last commit](https://img.shields.io/github/last-commit/connectshark/mind-canvas.svg?style=flat)](https://github.com/connectshark/mind-canvas)
![GitHub stars](https://img.shields.io/github/stars/connectshark/mind-canvas.svg?style=social&label=Stars&style=plastic)
![https://img.shields.io/badge/Vite-B73BFE?style=for-the-badge&logo=vite&logoColor=FFD62E](https://img.shields.io/badge/Vite-B73BFE?style=for-the-badge&logo=vite&logoColor=FFD62E)
![https://img.shields.io/badge/Vue.js-35495E?style=for-the-badge&logo=vuedotjs&logoColor=4FC08D](https://img.shields.io/badge/Vue.js-35495E?style=for-the-badge&logo=vuedotjs&logoColor=4FC08D)
![https://img.shields.io/badge/tailwindcss-35495E?style=for-the-badge&logo=tailwindcss&logoColor=38BCF8](https://img.shields.io/badge/tailwindcss-35495E?style=for-the-badge&logo=tailwindcss&logoColor=38BCF8)

**Mind Canvas** 是一個現代化的 Vue 3 前端開發模板，旨在提供開發者一個高效、功能完備的起點。專案整合了最新的前端技術，包含 Vite 7、Pinia、Vue Router 4 和 Tailwind CSS 4，並預先設定了自動化部署流程，讓您能專注於打造出色的應用程式。

## ✨ 功能特性

本模板整合了多項實用功能，加速您的開發流程：

- **⚡️ 高速開發體驗**: 採用 [Vite](https://vitejs.dev/) 作為建置工具，提供閃電般的熱模組替換 (HMR) 和極速的啟動時間。
- **🔩 最新 Vue 生態**: 基於 [Vue 3](https://vuejs.org/)，並整合了官方的狀態管理工具 [Pinia](https://pinia.vuejs.org/) 和路由管理 [Vue Router](https://router.vuejs.org/)。
- **🎨 檔案式路由**: 透過 `unplugin-vue-router` 實現，您只需要在 `src/pages` 目錄下建立 `.vue` 檔案，路由就會自動產生，無需手動設定。
- **💅 強大的樣式工具**: 內建 [Tailwind CSS 4](https://tailwindcss.com/)，提供高效的 Utility-First CSS 框架。
- **🛠️ 開發者工具**: 整合 `vite-plugin-vue-devtools`，提供強大的 Vue 開發者工具，方便您在開發過程中進行偵錯。

## 🚀 快速上手

### 環境準備

請確認您的開發環境已安裝 [Node.js](https://nodejs.org/) (建議版本 >= 18.x) 和 [pnpm](https://pnpm.io/)。

### 安裝與啟動

1.  **複製專案**
    ```bash
    git clone https://github.com/connectshark/mind-canvas.git
    cd mind-canvas
    ```

2.  **安裝依賴**
    ```bash
    pnpm install
    ```

3.  **啟動開發伺服器**
    ```bash
    pnpm dev
    ```
    應用程式將會在 `http://localhost:8080` 上啟動。

### 建置專案

若要建置用於生產環境的靜態檔案，請執行：

```bash
npm run build
```

建置後的檔案會存放在 `dist` 目錄下。

## 📁 專案結構與路由

本專案採用檔案式路由，核心邏輯位於 `src/pages` 目錄：

-   `src/pages/index.vue` -> `/`
-   `src/pages/playground.vue` -> `/playground`
-   `src/pages/[...slug].vue` -> 處理所有未匹配的路由 (404 頁面)

您只需要專注於在 `src/pages` 中建立頁面元件，路由系統會自動處理其餘部分。

## 🌐 API 串接

專案中已預留與 AI 圖像生成服務串接的空間，您可以參考以下服務來擴充功能：

-   [Pollinations.ai](https://pollinations.ai/)

## 📜 版權

本專案採用 [MIT](/LICENSE) 授權。
