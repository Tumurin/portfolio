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

export const collections = { blog, portfolio };
