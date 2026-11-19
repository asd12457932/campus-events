# WORKSHOP-UIUX — AI × UI/UX 工作坊

「AI × UI/UX：用 AI 重新設計產品體驗」工作坊用的就是這個專案，課堂上稱為 **CampusHub**。
每一個 Lab 的 Prompt 都在講義裡，這份文件只說明**進度存檔（branch）**和**跟不上時怎麼接上**。

## 開始之前（Lab 0）

整堂課只用 Claude App 的 **Code** 分頁：

1. 左上角選 **Code** →「＋ 新增」→ 輸入框下方「選擇資料夾」→ 選 `campus-events`
2. 在對話區貼上：

   ```
   請幫我切換到 uiux/start 的進度
   ```

3. 從 Preview 選單啟動網站（設定在 `.claude/launch.json`，執行 `pnpm run dev`，port 3000）
4. 看到 CampusHub 活動列表就成功了

## 進度存檔（branch）

| Branch | 內容 | 從哪個 Lab 接上 |
|---|---|---|
| `uiux/start` | 起點：改版前的 CampusHub | Lab 0 |
| `uiux/flow` | ＋ `design/01-problem.md`、`design/02-flow.md` | Lab 3 / Lab 4 |
| `uiux/ui` | ＋ 活動列表頁改版、`design/03-prompt.md` | Lab 5 |
| `uiux/tokens` | ＋ `design/04-tokens.md`、`app/globals.css` 的 `@theme` Token | Lab 6 |
| `uiux/done` | ＋ `EventCard` 元件、報名表單改版（完成版） | Lab 7 |

救援進度裡的 `design/` 檔案是講師示範版本，只是其中一種答案。

## 跟不上時

在對話區用中文請 Claude 代勞就好，例如：

```
請幫我切換到 uiux/flow 的進度，有沒存的改動先幫我保留
```

想把報名資料恢復成原本的樣子：

```
請幫我把 data/events.json 恢復成原本的內容
```

<details>
<summary>給熟悉 git 的同學：原始指令</summary>

```bash
git stash push -u -m "my-work"   # 先保留自己的改動（含新檔案）
git switch uiux/flow             # 切到救援進度
git stash list                   # 之後想找回自己的改動
git restore data/events.json     # 重設報名資料
```

</details>
