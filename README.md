# campus-events

校園活動報名系統。「AI Coding Agent：從 Prompt 到 Agentic Development」課程的練習專案。

## 開始

需要 Node.js 20 以上。

```bash
git clone <repo-url> campus-events
cd campus-events
npm install
npm test        # 應該看到 Tests 5 passed (5)
npm run dev     # 前端 http://localhost:5173 ，後端 http://localhost:3001
```

## 功能

- 活動列表、活動詳情
- 報名（姓名、學號、Email 必填；同一學號不能重複報名）

## API

| Method | Path | 說明 |
|---|---|---|
| GET | `/api/events` | 活動列表（含報名人數，不含個資） |
| GET | `/api/events/:id` | 單一活動 |
| POST | `/api/events/:id/register` | 報名，body：`{ name, studentId, email }` |

錯誤一律回傳 `{ "error": "..." }`。

## 目錄

```
client/src/        前端（App.jsx、api.js、pages/）
server/app.js      建立 Express app
server/routes/     API 路由
server/store.js    資料存取（檔案 / 記憶體）
server/data/       活動資料 events.json
tests/             後端測試（Vitest + Supertest，使用記憶體資料，不會改到 events.json）
```

## 課程用 branch

跟不上進度時，用下列指令把自己的工作目錄換成該步驟完成後的狀態（會覆蓋你目前的修改）：

| Branch | 狀態 | 指令 |
|---|---|---|
| `lab/start` | 起點 | `git restore --source=lab/start -- .` |
| `lab/plan` | 附核准後的計畫 `PLAN.md` | `git restore --source=lab/plan -- .` |
| `lab/impl` | 名額上限已實作、測試通過 | `git restore --source=lab/impl -- .` |
| `lab/done` | 名額上限已 commit（下午的起點） | `git switch lab/done` |

想重設報名資料：`git restore server/data/events.json`
