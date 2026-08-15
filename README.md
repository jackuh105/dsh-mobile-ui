# dsh-mobile-ui

English | [繁體中文](README_ZH.md)

Responsive CSS override plugin for the [DeepSeek Harness](https://github.com/deepseek-ai/deepseek-harness) (dsh) web settings panel.

## What it does

On viewports ≤ 680px (mobile browsers), it:

- Turns the 800px-wide desktop settings modal into a **full-screen vertical sheet**.
- Converts the 188px left nav rail into a **full-width, horizontally scrollable tab bar** at the top.
- Pins the **close button** to the top-right corner.
- Makes the content area fill the remaining height with independent scrolling and safe-area padding.
- Lets General settings rows wrap instead of squeezing their controls off-screen.

Desktop / tablet (>680px) is unaffected.

## Install

### From GitHub

```powershell
dsh plugin --profile web add https://github.com/jackuh105/dsh-mobile-ui.git
```

### From a local checkout

```powershell
git clone https://github.com/jackuh105/dsh-mobile-ui.git
cd dsh-mobile-ui\..
dsh plugin --profile web add .\dsh-mobile-ui
```

`dsh plugin` automatically adds this package to the web profile's bundle list because it declares `dsh.bundle`.

Restart the web profile after installing:

```powershell
dsh web
```

If you access the web UI through a reverse proxy such as Tailscale, keep your existing startup flags (for example `--trusted-host`).

## Verify

Open the browser developer tools and confirm the returned HTML `<head>` contains:

```html
<style id="dsh-mobile-ui">...</style>
```

Or narrow a desktop browser window below 680px and open the settings panel to see the layout change.

## Uninstall

```powershell
dsh plugin --profile web remove dsh-mobile-ui
```

Then restart `dsh web` to restore the original layout.

## Tweak

Edit the `CSS` string in `lib/index.js` (for example change the `680px` breakpoint), then restart `dsh web`.

## Compatibility

The CSS selectors currently target the settings panel structure of dsh `0.1.0-rc.6`. If dsh is upgraded and its class names change, the selectors may need to be updated.
