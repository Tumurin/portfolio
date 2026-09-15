---
title: "個人作品集（本站）"
description: "你正在看的這個網站：Astro 靜態站，雙模式視覺。"
order: 6
tech: ["Astro", "Tailwind CSS", "Cloudflare Workers"]
githubUrl: "https://github.com/Tumurin/portfolio"
---

你正在看的這個網站。Astro 建成純靜態站，部署在 Cloudflare Workers，推上 GitHub 就自動上線。

深色與淺色走**兩套不同調性**，不是同一組配色的深淺鏡像：深色是深藏青加琥珀色的科技感，淺色是米黃紙感加陶土色的紙藝手作風。兩套的強調色與標籤色都逐一實測過 WCAG AA 對比度才定案。

幾個做起來比想像中麻煩的地方：

- **深淺模式切換**是以按鈕為圓心的圓形擴散轉場，用瀏覽器原生的 View Transitions API。
- **首頁流程時間軸**捲動到才畫線，桌機水平、手機垂直，線畫到一半文字才依序浮現。
- **導覽列**在手機變成線條圖標，當前頁用一條會滑動的底線標示。

色彩與字體全部走 CSS 變數接 Tailwind 的 `@theme inline`，元件裡不出現寫死的色階——要調色只改一個檔案。
