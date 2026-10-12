---
title: "Gitoire"
description: "把值得留下的 GitHub 專案鏡像到自己的 NAS，AI 幫你分類、寫中文摘要。"
order: 3
tech: ["Python", "FastAPI", "SQLite", "GTK4", "libadwaita", "Git", "Docker", "TrueNAS", "LLM"]
coverImage: "/images/repos/gitoire/cover.webp"
---

## 痛點

**GitHub 上的東西不會永遠在。** 作者刪掉 repo、帳號被停用、專案轉成私有，想回頭找的時候常常已經沒了。

這不是假設。我收藏的 `tonhowtf/omniget`，有一天上游整個被刪除：GitHub 回 404，`git ls-remote` 說 Repository not found。如果只是按了星星，它就這樣消失了。

**收藏一多，就找不到東西。** GitHub 的星星清單只有名字和一行英文描述，幾百個之後，想不起來「那個做影片剪輯的專案叫什麼」。

## 為什麼要寫這個

我想要一個自己的程式碼圖書館：**存在自己的硬碟上，誰都刪不掉；用中文分好類，要找的時候找得到。**

## 解決了我什麼需求

- **不怕上游消失。** 每個專案都完整鏡像到家裡的 NAS，包含所有分支、tag 與歷史。omniget 被刪的時候，我手上那份 75 MB、95 個 ref 完整無缺，`git fsck` 乾淨。上游已刪的專案會標成「收藏」，從此不再同步也不能刪除。
- **找得到。** AI 讀完專案的 README，用中文寫一段摘要，再從我定好的詞庫裡挑分類與標籤。可以依分類、擁有者、同步狀態分組，依星星數、大小、新增時間排序，或直接搜尋。
- **不用自己顧。** 每天凌晨 4 點自動同步全部專案，結果用 Telegram 傳給我。
- **換電腦也不怕。** 收藏、資料庫、AI 金鑰都只住在 NAS 上，Mac 上的 App 只是畫面。電腦重灌，收藏一筆都不會少。

## 實際功能展示

依星星數排序。每張卡片：原本的英文描述、AI 寫的中文摘要（藍字）、分類下拉選單與標籤，底下是星星數、fork 數、佔用空間與同步時間：

<figure>
  <img src="/images/repos/gitoire/stars.png" alt="Gitoire 主視窗，依星星數排序，每張卡片有英文描述、AI 中文摘要、分類與標籤" width="1280" height="860" />
  <figcaption>主視窗。底部是總數：672 個專案、407.47 GB，已同步 651 個。</figcaption>
</figure>

切成「依分類分組」，每一類旁邊顯示專案數量與佔用空間，每一組可以各自設定組內的排序：

<figure>
  <img src="/images/repos/gitoire/grouped.png" alt="Gitoire 依分類分組：學習資源 100 個、開發框架與函式庫 73 個、SKILLs 71 個等" width="780" height="700" class="mx-auto" />
  <figcaption>依分類分組，依專案數量排序。</figcaption>
</figure>

分類與標籤是**我自己定的詞庫**，AI 只能從裡面挑，不會自己發明新的分類：

<figure>
  <img src="/images/repos/gitoire/vocab.png" alt="設定裡的分類與標籤詞庫，標示 AI 只能從中選擇" width="1280" height="860" />
  <figcaption>設定 › 分類與標籤。刪掉詞庫裡的分類不會動到專案，那些專案會集中到「待重新分類」。</figcaption>
</figure>

## 技術做法

**前後端分離。** 後端是 FastAPI，以 Docker 跑在 TrueNAS 上，擁有資料庫、所有鏡像與 AI 金鑰；Mac 上的前端是 GTK4／libadwaita 的桌面 App 與一支 CLI，只透過 HTTP API 跟後端說話。前後端拆成兩個 repo——只靠慣例維持的分離，遲早會被某個 import 打破。

**鏡像，不是下載壓縮檔。** 每個專案用 `git clone --mirror` 存成完整的 bare repository，同步前先問 GitHub 哪些有更新，沒變的不碰。超大的專案走可續傳的路徑：先抓不含檔案內容的歷史，再一批一批補檔案，斷線重跑會從斷掉的地方接下去。目前最大的一個是 43 GB，5,573 個物件一個不缺。

**詞庫是規定，資料庫來保證。** 分類與標籤存在 SQLite 的詞庫表裡，專案只能透過外鍵指向詞庫，AI 回答了詞庫以外的值會被擋下來，而不是悄悄存進去。AI 服務商是可替換的：OpenAI 相容的服務加一列設定就能用，不必寫程式。

**背景工作不能悄悄死掉。** 同步、算空間、AI 批次都在背景跑，最常見的故障是例外被吞掉、畫面停在「同步中」卻沒有人在做。所有背景任務都要回報結果；連外的 git 有閒置逾時，而且全部經過同一個入口發名額，同時最多 4 條——一次加入兩百多個專案時，NAS 不會再被幾十條 git 塞到連 API 都沒回應。前後端加起來超過 800 個自動測試。
