---
title: "萬昌瓦斯配送系統"
description: "幫家裡瓦斯行做的一整套：收單、計價、派單、來電顯示。"
order: 1
tech: ["ASP.NET Core", ".NET 8", "PostgreSQL", "Kotlin", "Jetpack Compose", "WPF"]
---

一間實際在營業的液化石油氣行，從電話接單到外勤送瓶的完整流程。不是練習專案——每天真的有人在用。

系統分成四個部分：

- **後端 API**（ASP.NET Core / .NET 8）：收單、計價、存氣 ledger、派單，走 JWT 驗證，用 FCM 推播通知外勤。
- **外勤派單 App**（Android，Kotlin + Jetpack Compose）：MVVM + Hilt 架構，先用 mock 資料把畫面與流程做完，再接上真的 server API。
- **桌面端管理程式**（WPF）：店裡櫃檯用的管理介面。
- **來電顯示**：電話一響就把這個客戶的地址、上次叫幾桶、押金狀況叫出來，接電話的人不用再問一次。

「存氣」是這個產業特有的計費方式——客戶先把氣存在行號，之後一桶一桶扣。它不是單純的餘額欄位，而是一本要能往回追的帳，所以資料模型用 ledger 而不是可變的數字。
