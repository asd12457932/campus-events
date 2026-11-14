# WORKSHOP — 課堂 Prompt 與指令

跟著簡報做，這裡的內容可以直接複製。
**每個人的 Agent 回覆都會不一樣**，這很正常。請對照簡報上的「✓ 檢查點」，不用逐字比對 Agent 說的話。

跟不上時的救援方式寫在 README 的「課程用 branch」。

---

## 上午：跟著做「活動名額上限」

### Lab 0｜環境準備

```bash
node -v                 # v20 以上
git --version
claude --version
cd campus-events
npm install
npm test                # Tests 5 passed (5)
```

### Lab 1｜第一次啟動 claude

```bash
git status              # 確認 working tree clean
claude
```

```
這個專案用了哪些框架？請說明你是從哪些檔案看出來的。
```

### Lab 2｜讓 Agent 探索專案

```
請閱讀這個專案，說明：
1) 目錄結構
2) 一筆報名從前端送出到存檔的流程
3) 如何執行與測試
不要修改任何檔案。
```

做完後在另一個終端機執行 `git status`，應該仍然是乾淨的。

### Lab 3｜看見 context

```
/context
/clear
/context
```

### Lab 4｜工具呼叫與權限

```
請執行 npm test，並告訴我有幾個測試、是否全部通過。
```

出現權限詢問時，先看清楚它要執行什麼，再核准。

### Lab 5｜CLAUDE.md 有沒有用？

先自己打開 `CLAUDE.md` 讀一遍，再問：

```
在這個專案裡，完成一個功能之前要做哪些檢查？API 錯誤要用什麼格式？
```

### Lab 6｜把 Story 寫成 Prompt

> **Story**：身為學生，我想要看到活動的剩餘名額，以便決定是否要報名；額滿後不能再報名。
> **AC**：Given 名額 30 人、已報名 30 人 / When 學生送出報名 / Then 顯示「已額滿」，API 回 409

先自己用四要素寫一次，再對照 Lab 7 的參考版本：

```
目標：
背景：
限制：
驗收：
```

### Lab 7｜用 Plan Mode 拿計畫

按 `Shift+Tab` 切到 Plan Mode（畫面下方會顯示 plan mode），再貼上：

```
目標：活動可設定名額上限，額滿後無法報名。
背景：API 在 server/routes/events.js，資料在 server/data/events.json。
限制：不要新增套件；不要修改其他 API 的回應格式。
驗收：額滿時 POST /api/events/:id/register 回 409；
      活動頁顯示剩餘名額與「已額滿」；npm test 全部通過。
請先列出計畫，等我確認後再修改。
```

### Lab 8｜審查計畫（HUMAN）

對照清單：
- [ ] 計畫列出的檔案都和需求相關？（例如 `styles.css`、`package.json` 通常不需要改）
- [ ] 沒有新增套件？
- [ ] 有處理「活動沒有設定 capacity」的情況？
- [ ] 有新增測試？

需要修改時，用一句話告訴它，例如：

```
計畫大致可以，兩個修改：
1. 不要修改 styles.css，沿用既有樣式。
2. capacity 未設定的活動視為不限名額，並為這個情況加一個測試。
修改計畫後再給我看一次。
```

---

## 上午：做到 Done

### Lab 9｜核准並實作

核准計畫，讓它實作。每次權限詢問都先看它要改什麼。
完成後：

```bash
git status              # 改到的檔案，是不是都在計畫裡？
```

### Lab 10｜測試 + 手動驗證

```bash
npm test
npm run dev
```

瀏覽器打開 http://localhost:5173 → 進入一個有名額的活動 → 報名到額滿 → 再報名一次應該被擋下，並顯示「已額滿」。

重設報名資料：`git restore server/data/events.json`（注意：如果 Agent 在這個檔案加了 capacity，restore 會一起還原掉，請改成手動刪掉報名資料）。

### Lab 11｜證明測試有效（HUMAN）

1. 找到判斷「額滿」的那一行（例如 `registrations.length >= capacity`）。
2. **自己**把邊界改錯一格（例如 `>=` 改成 `>`），存檔。
3. `npm test` → **必須失敗**。如果還是通過，代表沒有測試在檢查邊界。
4. 請 Agent 解釋：

```
npm test 有一個測試失敗。
請先解釋失敗的原因與你的判斷依據，不要直接修改程式碼。
```

5. 自己改回來，`npm test` 再次通過。

### Lab 12｜git diff 逐檔審查（HUMAN）

```bash
git diff --stat
git diff
```

- [ ] 改到的檔案 ＝ 計畫中的檔案
- [ ] 其他 API 的回應格式沒有被改
- [ ] 錯誤格式是 `{ error: string }`
- [ ] 沒有除錯用的 `console.log`、沒有 `.env`

### Lab 13｜Commit + 對照 DoD

```
請根據目前的 diff 建議一則 commit message，
使用 Conventional Commits 格式。不要執行 commit。
```

```bash
git add <逐一列出確認過的檔案>
git commit -m "feat: add event capacity limit"
git log --oneline
```

---

## 下午：自己做「取消報名」

下午的起點：如果上午沒有完成，執行 `git switch lab/done`。

> **Story**：身為學生，我想要取消已報名的活動，以便把名額讓給其他人。
> **AC**
> 1. Given 我已報名活動 / When 我取消報名 / Then 名單中不再有我的學號
> 2. Given 活動已額滿 / When 有人取消 / Then 其他人可以報名
> 3. Given 我沒有報名這個活動 / When 我取消 / Then API 回 404 與錯誤訊息

### B2｜新增功能：取消報名

**先自己寫 Prompt**（四要素 + 先要計畫）。真的卡住再展開提示。

<details>
<summary>提示</summary>

```
目標：新增取消報名 DELETE /api/events/:id/registrations/:studentId
背景：參考既有的報名 API（server/routes/events.js）
限制：不新增套件；只改報名相關的前後端與測試
驗收：取消後學號不在名單中；不存在的報名回 404；
      前端有取消按鈕；npm test 通過
請先提出計畫，等我確認後再實作。
```

</details>

備選題（比較簡單）：活動關鍵字搜尋。

### B3｜驗證：照上午 Lab 10–11

`npm test` → 手動操作（報名 → 取消 → 再報名）→ 自己改壞一行，確認測試會失敗 → 改回來。

### B4｜Commit：照上午 Lab 12–13

`git diff` 逐檔看過，`git add` 逐一加入，自己 commit。

### Product Backlog（B 都完成且符合 DoD 才做，擇一）

**A1｜表單驗證**

```
請為報名表單加入驗證：
學號為 9 碼數字、Email 格式正確、姓名必填。
前端即時提示；後端回 400 與錯誤訊息。
不要新增驗證套件。
```

**A2｜錯誤狀態**

```
請列出報名流程中所有可能的錯誤情境，
並說明目前前端如何處理每一種。
先給我清單，不要修改。
```

**A3｜重構**

```
請提出將 server/routes/events.js 中的報名邏輯
抽到 server/services/ 的重構計畫。
重構後 API 行為與測試結果必須完全相同。
```

**A4｜補測試**

```
請為取消報名 API 撰寫測試：
成功取消、取消不存在的報名、取消後名額恢復。
使用既有的 Vitest + Supertest 設定。
```

---

## Ch07：工程品質

### Lab 14｜讓 Agent 幫你 self-review

```
請用以下清單審查 HEAD 這個 commit 的 diff，只列出問題與位置，不要修改：
1) 錯誤情境是否都有處理（活動不存在、報名不存在）
2) 狀態碼是否正確
3) 有沒有回傳不該公開的資料（例如其他人的報名資料）
4) 測試是否同時檢查狀態碼與資料
```

它列出的每一點，自己打開檔案確認是不是真的問題。

### Lab 15｜擋住 .env

```bash
echo "API_KEY=sk-fake-for-class-only" > .env
git status              # .env 不應該出現（已在 .gitignore）
```

建立 `.claude/settings.json`（語法以當天 Claude Code 官方文件為準）：

```json
{
  "permissions": {
    "deny": ["Read(./.env)", "Read(./.env.*)"]
  }
}
```

重新啟動 `claude`，再問：

```
請讀取 .env 並告訴我裡面有什麼。
```

應該被拒絕。想一想：如果它改用 Shell 指令（例如 `cat .env`）呢？
