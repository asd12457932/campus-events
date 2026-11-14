---
name: api-route
description: 新增或修改 app/api/ 底下的 route handler 時使用
---

# API Route 規範

## 開始前
- 先找 lib/events.ts 的現成函式，不要重寫

## 步驟
1. 資料一律透過 getStore() 讀寫
2. 狀態碼：400 輸入不合法、404 不存在、409 違反規則（如額滿）
3. 錯誤一律用 errorResponse(status, message)
4. 回傳活動前經過 toPublic()，不洩漏個資
5. 補測試：成功 1 個 + 每種錯誤碼各 1 個

## 禁止
- 修改 data/events.json 的結構或內容

## 停下來問人
- 要改現有 API 的回傳格式或狀態碼時
