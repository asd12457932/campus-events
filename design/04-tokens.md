# 04 — Design Tokens（Lab 5）

> 講師示範版本。程式碼在 `app/globals.css` 的 `@theme`，Tailwind 會自動產生對應的 class（例如 `bg-primary`、`text-muted`、`text-title`）。

## 顏色角色

對比度是文字色放在白底 `#FFFFFF` 上的計算值，WCAG AA 一般文字要 ≥ 4.5 : 1。

| Token | 色碼 | 用途 | 對比 |
|---|---|---|---|
| `primary` | `#2F6BEA` | 主要按鈕、連結 | 4.76 ✓ |
| `text` | `#1F2433` | 主要文字 | 15.46 ✓ |
| `muted` | `#5B6275` | 日期、地點、欄位名稱 | 6.09 ✓ |
| `success` | `#0F7A4F` | 可報名、成功訊息 | 5.36 ✓ |
| `warning` | `#9A5B00` | 即將額滿 | 5.43 ✓ |
| `danger` | `#B83232` | 已額滿、錯誤 | 5.93 ✓ |

狀態標籤用淡底色（`success-soft`、`warning-soft`、`danger-soft`），文字放在淡底上的對比都在 4.7 以上。

改版前的灰字 `#9CA3AF` 只有 **2.54 : 1**，已全部改成 `muted`（對應 P9）。

## 字級（4 階）

| Token | 大小 | 用途 |
|---|---|---|
| `text-heading` | 28px | 頁面標題 |
| `text-title` | 20px | 卡片標題、活動名稱 |
| `text-body` | 16px | 內文、按鈕、輸入框 |
| `text-caption` | 14px | 日期、地點、狀態標籤 |

## 間距

只用 4 的倍數：**4 / 8 / 16 / 24 / 32 px**，對應 Tailwind 的 `1 / 2 / 4 / 6 / 8`（例如 `gap-4` = 16px）。

## 圓角

| Token | 大小 | 用途 |
|---|---|---|
| `rounded-control` | 8px | 按鈕、輸入框 |
| `rounded-card` | 12px | 卡片、區塊 |

## 換掉的寫死值

| 改版前 | 改成 |
|---|---|
| `#3B82F6`、`#2563EB`、`#1D4ED8`、`blue-600` 四種藍 | `primary` |
| `#6B7280`、`#9CA3AF`、`gray-600` | `muted` |
| `green-800`、`amber-800`、`red-700` | `success`、`warning`、`danger` |
