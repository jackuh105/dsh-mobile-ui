# dsh-mobile-ui

[English](README.md) | 繁體中文

針對 [DeepSeek Harness](https://github.com/deepseek-ai/deepseek-harness)（dsh）Web 設定面板的小螢幕 CSS 覆寫外掛。

## 作用

在 viewport ≤ 680px（手機瀏覽器）時：

- 設定面板從「800px 寬、側邊 188px 導覽列」的桌面 Modal 改為**全螢幕直式版面**。
- 左側設定導覽改為**頂部橫向可滑動 tab**，並佔滿整列寬度。
- **關閉按鈕**固定在設定視窗的右上角。
- 內容區填滿剩餘高度、獨立捲動，並保留安全區（safe-area）內距。
- General 設定列的內容允許換行，避免把控制項擠出畫面。

桌面 / 平板（>680px）完全不受影響。

## 安裝

### 從 GitHub 安裝

```powershell
dsh plugin --profile web add -w https://github.com/jackuh105/dsh-mobile-ui.git
```

### 從本機目錄安裝

```powershell
git clone https://github.com/jackuh105/dsh-mobile-ui.git
cd dsh-mobile-ui\..
dsh plugin --profile web add -w ./dsh-mobile-ui
```

`dsh plugin` 會自動把有 `dsh.bundle` 宣告的本套件加進 web profile 的 bundles 清單。

安裝後重啟 web profile：

```powershell
dsh web
```

如果你透過 Tailscale 等反向代理連入，請保留原本自己啟動 web 時使用的參數（例如 `--trusted-host`）。

## 驗證

在本機用瀏覽器開發者工具確認回傳的 HTML `<head>` 內有：

```html
<style id="dsh-mobile-ui">...</style>
```

或直接縮小桌面瀏覽器視窗到 680px 以下，打開設定面板確認版面改變。

## 移除

```powershell
dsh plugin --profile web remove dsh-mobile-ui
```

再重啟 dsh web 即可恢復原狀。

## 微調

編輯 `lib/index.js` 內的 `CSS` 字串（例如把 `680px` 改成其他斷點），存檔後重啟 dsh web。

## 相容性

目前 CSS 選擇器對應 dsh `0.1.0-rc.6` 的設定面板結構；未來升級 dsh 後若樣式類別名稱變更，可能需要同步調整。

## 疑難排解

如果 `dsh plugin --profile web add` 出現 `ERR_PNPM_ADDING_TO_ROOT`，請在套件規格前加上 `-w`：

```powershell
dsh plugin --profile web add -w https://github.com/jackuh105/dsh-mobile-ui.git
```

dsh profile 目錄本身是 pnpm workspace root，部分 pnpm 版本要求用 `-w` 才能安裝到該目錄；`dsh plugin` 會把這個旗標原封不動轉交給 pnpm。

