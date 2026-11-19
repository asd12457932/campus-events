# campus-events — 校園活動報名系統

## Tech stack
- Next.js (App Router) + TypeScript
- Tailwind CSS
- Data: JSON 檔 (data/)

## Commands
- pnpm dev        # 啟動開發伺服器
- pnpm test       # node:test
- pnpm typecheck  # tsc

## Structure
- app/api/  API 路由
- lib/      資料存取與共用邏輯
- tests/    API 測試
- design/   UI/UX 工作坊的設計文件（問題、流程、Token、驗收）

## Rules
- 新增依賴前必須先詢問
- API 錯誤一律回傳 { error: string }
- 修改 API 時同步更新 tests/
- 相對路徑 import 要寫 .ts / .tsx 副檔名

## Definition of Done
- pnpm test 與 pnpm typecheck 全部通過才回報完成
