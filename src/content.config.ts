// 這個檔案定義「每篇 .md 檔的 frontmatter 要長怎樣」。
// 少寫欄位、或型別寫錯（例如日期打成文字），astro check／astro build
// 都會直接報錯擋下來，比等網站做出來才發現內容漏東西快很多。
import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

// 部落格：真正的技術文章用，日期欄位叫 pubDate。
const blog = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/blog' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.coerce.date(),
    tags: z.array(z.string()).default([]),
  }),
});

// 作品集：接案案例故事，日期欄位叫 date（跟 blog 的 pubDate 不同名，
// 是歷史留下來的差異，兩個集合各自獨立，沒有共用邏輯）。
// link／coverImage 是 .optional()——沒有真實網址或照片時可以留空，
// coverImage 留空時前台會顯示 ImagePlaceholder.astro 那個「待補」版位。
const portfolio = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/portfolio' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    date: z.coerce.date(),
    tags: z.array(z.string()).default([]),
    link: z.string().url().optional(),
    coverImage: z.string().optional(),
  }),
});

// 專案：關於我頁的卡片與各自的站內內頁。
// githubUrl 是 .optional()——私有 repo 不填，內頁就不會長出一個點了會 404
// 的「看原始碼」按鈕。coverImage 同樣選填，留空時 RepoCover.astro 會用
// 標題的雜湊畫一張跟著深淺模式走的向量封面。
const repos = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/repos' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    order: z.number(),
    tech: z.array(z.string()).default([]),
    coverImage: z.string().optional(),
    githubUrl: z.string().url().optional(),
  }),
});

// 關於我：整份履歷只有這一個檔。結構化的欄位（學歷、技能、經歷）寫在
// frontmatter，自傳那種長文寫在本文——長文放 frontmatter 會失去 markdown
// 排版，結構化資料寫進本文則沒辦法讓 astro check 幫忙擋漏欄位。
//
// 🔴 這份檔案刻意不含姓名、Email、電話、居住城市。聯絡方式只有 LINE 與
// GitHub 兩個連結，新增欄位時不要把個資加回來。
const about = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/about' }),
  schema: z.object({
    role: z.string(),
    tagline: z.string(),
    intro: z.array(z.string()).default([]),
    photo: z.string().optional(),
    lineUrl: z.string().url(),
    githubUrl: z.string().url(),
    education: z
      .array(
        z.object({
          school: z.string(),
          program: z.string(),
          period: z.string(),
        })
      )
      .default([]),
    skills: z.array(z.string()).default([]),
    others: z.array(z.string()).default([]),
    experience: z
      .array(
        z.object({
          org: z.string(),
          role: z.string().optional(),
          period: z.string(),
          highlights: z.array(z.string()).default([]),
        })
      )
      .default([]),
  }),
});

export const collections = { blog, portfolio, repos, about };
