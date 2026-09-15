# 「關於我」改成一頁式履歷 — 設計規格

日期：2026-09-15

## 目標

把 `/about` 從一段自我介紹的短頁，改成完整的一頁式履歷：自我介紹＋大頭照、專案卡片橫排（放不下時跑馬燈、可點進站內內頁）、學歷／技能／其他、履歷時間軸、自傳。

內容來源是蝸牛既有的 Notion 履歷（`shelled-waterfall-a4a.notion.site/Zhao-Kuan-Min-…`），文字照搬、排版重做。

## 硬性限制

**不出現任何個資。** 姓名、Email、電話、居住城市一律不放。公司與學校名稱保留（那是經歷，不是識別資料）。聯絡方式只有兩個：全站共用的 LINE 加好友連結、GitHub 個人頁。

這條限制也適用於 `<title>`、`description`、structured data 與圖片檔名。

## 版面結構

由上到下五區：

1. **自我介紹＋大頭照** — 桌機左右並排（文字 1.4fr／照片 1fr），手機上下堆疊。左邊是職稱、一句標語、四行摘要、LINE 與 GitHub 連結；右邊是大頭照（尚未提供，先用 `ImagePlaceholder` 的「大頭照待補」版位）。
2. **專案** — 卡片一橫排，放不下時跑馬燈滾動。
3. **學歷 · 技能 · 其他** — 桌機三欄，手機單欄。
4. **履歷** — 五段經歷的垂直時間軸，每段有期間、角色、成就列點。
5. **自傳** — 長文，走 `prose`。

## 資料結構

### `about` 內容集合（單一檔案）

`src/content/about/about.md`。frontmatter 放結構化欄位，本文（markdown）放自傳。蝸牛之後要改履歷只需要動這一個檔。

| 欄位 | 型別 | 說明 |
| --- | --- | --- |
| `role` | string | 職稱，例：全端工程師 |
| `tagline` | string | 一句標語 |
| `intro` | string[] | 自我介紹的幾行摘要 |
| `photo` | string? | 大頭照路徑，留空顯示待補版位 |
| `lineUrl` / `githubUrl` | string | 兩個聯絡連結 |
| `education` | { school, program, period }[] | 學歷 |
| `skills` / `others` | string[] | 兩組技能 |
| `experience` | { org, role, period, highlights[] }[] | 履歷 |

### `repos` 內容集合

`src/content/repos/*.md`，一個專案一篇。

| 欄位 | 型別 | 說明 |
| --- | --- | --- |
| `title` | string | 卡片與內頁標題 |
| `description` | string | 卡片上那一句說明 |
| `order` | number | 卡片排序，小的在前 |
| `tech` | string[] | 技術標籤 |
| `coverImage` | string? | 留空時用程式產生的向量封面 |
| `githubUrl` | string? | 私有 repo 不填，內頁就不顯示「看原始碼」 |

本文是「這是什麼、開發過程」的敘述。

## 元件

### `RepoCover.astro` — 程式產生的向量封面

沒有 `coverImage` 時用它。畫一組抽象的「程式碼列」圖形：3～5 條圓角長條，寬度由標題字串的雜湊決定（同一個標題永遠畫出同一張圖），配色取自全站既有的 `--tag-N-bg`／`--tag-N-fg` 五色變數。

用 CSS 變數而不是產生 PNG 的原因：**深淺模式會自動切換**，而且不必管理圖檔。蝸牛之後把真圖填進 `coverImage` 就自動換掉。

### `RepoCard.astro`

上方 4:3 圖片區（真圖或 `RepoCover`），下方標題＋一句說明。固定寬度 `w-64`，讓一橫排的排版可預期。連到 `/repos/<slug>`。

### `RepoMarquee.astro`

外層 `overflow-hidden`，內層 track 是 `flex`。DOM 裡永遠畫兩份卡片，第二份標記 `data-repo-clone`。

載入與 resize 時由 script 決定模式：

- **放得下**（原始卡片總寬 ≤ 容器寬）：複本 `hidden`，不跑動畫。
- **放不下**：複本顯示，track 跑 `translateX(0) → translateX(-(base + gap))` 的線性無限動畫。位移量用 px 精確算，不用 `-50%`——兩份卡片中間那一道 gap 會讓 `-50%` 少半個 gap，接縫會漂移。
- 速度固定 40px/秒，所以 `animation-duration` 由 script 依實際寬度算出來寫進 `--marquee-duration`。

滑鼠移上去、鍵盤 focus、手指觸碰時暫停（`animation-play-state: paused`），否則點不到會動的卡片。

`prefers-reduced-motion: reduce` 時完全不跑動畫，改成 `overflow-x: auto` 讓使用者自己橫向捲——不能只把動畫時間壓成 0，那會讓卡片瞬間跳到終點。

### `/repos/[slug].astro`

沿用 `blog/[slug].astro` 的版型：返回連結（回 `/about`）、標題、技術標籤、封面圖、`<Content />`。有 `githubUrl` 才顯示「看原始碼」按鈕。

導覽列維持四項，不加第五項——專案內頁從「關於我」進去。

## 種子內容

先放 6 篇 repo（萬昌瓦斯配送系統、Gitoire、Karvan、MooCare、DealOtter、個人作品集），內容只寫查得到的事實：GitHub 上的 repo 描述、實際使用的技術、筆記庫裡已記載的架構。**不虛構開發過程**——那一段留給蝸牛自己補。

萬昌、Karvan、Gitoire、MooCare、DealOtter 在 GitHub 上都是私有的，`githubUrl` 一律不填。

## 驗收

- `astro check` 0 錯誤、`astro build` 全部路由編出（原 9 頁 ＋ 6 篇 repo 內頁 = 15 頁）
- 全站輸出 grep 不到姓名、Email、電話
- 320／375／1280px 三個寬度下 `/about` 不橫向溢出
- 跑馬燈：1280px 量到「放不下→有動畫」、窄容器同樣有動畫；hover 時 `animation-play-state` 變 `paused`
- repo 內頁的返回連結、標籤、封面、內文都算得出來
