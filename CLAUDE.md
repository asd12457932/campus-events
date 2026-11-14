# campus-events — 校園活動報名系統

## Tech stack
- Client: Vite + React (client/)
- Server: Express (server/)
- Data: JSON 檔 (server/data/)

## Commands
- npm run dev   # 同時啟動前後端
- npm test      # Vitest + Supertest

## Structure
- server/routes/  API 路由
- tests/          後端測試

## Rules
- 新增依賴前必須先詢問
- API 錯誤一律回傳 { error: string }
- 修改 API 時同步更新 tests/

## Definition of Done
- npm test 全部通過才回報完成
