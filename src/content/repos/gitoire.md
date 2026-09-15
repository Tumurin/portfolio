---
title: "Gitoire"
description: "把值得留下的 GitHub repo 完整鏡像到自己的 NAS，分類標記。"
order: 2
tech: ["Python", "FastAPI", "GTK4", "TrueNAS"]
---

GitHub 上的東西不會永遠在。作者刪 repo、帳號停用、專案轉私有——想回頭找的時候常常已經沒了。Gitoire 把值得留下的 repo 完整鏡像下來、分類標記，存在自己的 NAS 上。

**前後端分離**：收藏、資料庫與 AI 金鑰只住在 TrueNAS 上的 FastAPI 後端，桌面 App 與 CLI 是薄客戶端。這樣分的理由很實際——前端電腦重灌不影響收藏。

桌面端用 GTK4，Mac 與 Linux 共用同一份程式碼。
