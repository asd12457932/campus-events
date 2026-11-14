# PLAN：活動名額上限（已核准）

Story：身為學生，我想要看到活動的剩餘名額，以便決定是否要報名；額滿後不能再報名。

## 要修改的檔案

1. `lib/types.ts`：`Event` 加上選填的 `capacity`；`PublicEvent` 加上 `capacity`、`remainingSeats`（未設定時為 `null`）
2. `lib/events.ts`：`toPublic` 計算剩餘名額；新增 `isFull(event)`
3. `data/events.json`：活動 1 設為 30、活動 3 設為 3，活動 2 不設定
4. `app/api/events/[id]/register/route.ts`：額滿（`registrations.length >= capacity`）回 409 `{ error: 'Event is full' }`；capacity 未設定視為不限名額
5. `app/events/[id]/page.tsx`：顯示剩餘名額；額滿時顯示「已額滿」並停用報名按鈕
6. `components/RegisterForm.tsx`：接收 `disabled`，停用送出按鈕
7. `tests/events.test.ts`：+2 個測試
   - 額滿時回 409
   - capacity 未設定時可以報名

## 不做

- 不修改 `globals.css`、`layout.tsx`，沿用既有樣式
- 不新增套件
- 不修改其他 API 的既有欄位
