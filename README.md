# 這是什麼？

這是我，寬，一名軟體工程師的個人網站。
這裡有我的作品集展示，以及會在這裡分享我的技術文章。

# 技術架構

Astro + Tailwind CSS。
內容來自平時的筆記庫 Obsidian 檔案管理。

## 啟動專案

```sh
npm install
npm run dev
```

打開 http://localhost:4321 。改任何檔案存檔就會自動重整。

## 常用指令

| 指令 | 作用 |
| --- | --- |
| `npm install` | 安裝依賴 |
| `npm run dev` | 啟動本地開發伺服器（http://localhost:4321） |
| `npm run build` | 編譯成靜態網站，輸出到 `dist/` |
| `npm run preview` | 本地預覽 `build` 出來的結果 |
| `npx astro check` | 檢查型別與 frontmatter 是否正確 |

## 新增一篇部落格文章

1. 在 `src/content/blog/` 建一個新的 `.md` 檔（檔名會變成網址，例如 `my-post.md` → `/blog/my-post`）
2. 開頭寫 frontmatter：

   ```md
   ---
   title: "文章標題"
   description: "一句話摘要"
   pubDate: 2026-09-11
   tags: ["標籤一", "標籤二"]
   ---
   ```

3. 下面接內文，標準 Markdown 語法。存檔即可，`npm run dev` 會自動出現在 `/blog` 列表。

**寫作習慣提醒**：如果先在 Obsidian 寫草稿，複製過來時要把 Obsidian 專屬語法改成標準 Markdown——`[[筆記名]]` 改成 `[文字](連結)`，`![[圖片.png]]` 改成 `![alt](路徑)`。這個網站看不懂 Obsidian 的 wikilink 語法。

## 新增一個作品集項目

跟部落格文章一樣，在 `src/content/portfolio/` 建一個 `.md` 檔，frontmatter 多兩個可選欄位：

```md
---
title: "專案名稱"
description: "一句話摘要"
date: 2026-09-11
tags: ["React", "TypeScript"]
link: "https://github.com/你的帳號/專案"   # 可省略
coverImage: "/images/project.png"           # 可省略
---
```

## 專案結構

```
src/
  content/
    blog/        文章 .md 檔
    portfolio/   作品 .md 檔
  content.config.ts   內容欄位規則（frontmatter schema）
  pages/         網站路由，檔名對應網址
  layouts/       共用版型（BaseLayout）
  components/    Header／Footer／Card／ThemeToggle
  styles/        global.css（Tailwind 設定 + 深色模式）
public/          靜態檔案（圖片、favicon）
```

## 深色模式

右上角按鈕一鍵切換，選擇會存在瀏覽器 `localStorage`，下次開啟網站記得住。

## 部署到 Vercel

1. 把這個 repo 推到你自己的 GitHub（目前本地 git 還沒接 remote）：

   ```sh
   git remote add origin <你的 GitHub repo 網址>
   git push -u origin main
   ```

2. 到 [vercel.com](https://vercel.com) 用你的帳號匯入這個 GitHub repo，框架選 Astro，其餘用預設值（build 指令 `npm run build`，輸出目錄 `dist/`）即可。
3. 之後每次 `git push` 到主分支，Vercel 會自動重新部署。
