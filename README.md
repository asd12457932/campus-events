# campus-events

校園活動報名系統。「AI Coding Agent：從 Prompt 到 Agentic Development」課程的練習專案。

Next.js（App Router）+ TypeScript + Tailwind CSS，資料存在 JSON 檔。

## 開始

需要 Node.js 22.18 以上（建議 24）與 pnpm。

```bash
npm install -g pnpm          # 還沒有 pnpm 的話
git clone https://github.com/asd12457932/campus-events.git
cd campus-events
pnpm install
pnpm test                    # 應該看到 pass 5、fail 0
pnpm dev                     # 打開 http://localhost:3000
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
app/
├─ page.tsx                          活動列表
├─ events/[id]/page.tsx              活動詳情
└─ api/events/
   ├─ route.ts                       GET 列表
   └─ [id]/
      ├─ route.ts                    GET 單一活動
      └─ register/route.ts           POST 報名
components/RegisterForm.tsx          報名表單（client component）
lib/
├─ types.ts                          資料型別
├─ events.ts                         共用邏輯（toPublic、findEvent、errorResponse）
└─ store.ts                          資料存取（檔案 / 記憶體）
data/events.json                     活動資料
tests/events.test.ts                 API 測試（node:test，用記憶體資料，不會改到 events.json）
```

測試用 Node.js 內建的 `node --test` 直接執行 TypeScript，所以相對路徑的 import 都要寫 `.ts` / `.tsx` 副檔名。

## 課程用 branch

跟不上進度時，用下列指令把自己的工作目錄換成該步驟完成後的狀態（會覆蓋你目前的修改）：

| Branch | 狀態 | 指令 |
|---|---|---|
| `lab/start` | 起點 | `git restore --source=lab/start -- .` |
| `lab/plan` | 附核准後的計畫 `PLAN.md` | `git restore --source=lab/plan -- .` |
| `lab/impl` | 名額上限已實作、測試通過 | `git restore --source=lab/impl -- .` |
| `lab/done` | 名額上限已 commit（下午的起點） | `git switch lab/done` |

想重設報名資料：`git restore data/events.json`

## UI/UX 工作坊 branch

「AI × UI/UX」工作坊使用 `uiux/*` 系列 branch（`uiux/start` → `uiux/flow` → `uiux/ui` → `uiux/tokens` → `uiux/done`），
說明與救援方式寫在 [WORKSHOP-UIUX.md](WORKSHOP-UIUX.md)。設計文件存放在 `design/`。
