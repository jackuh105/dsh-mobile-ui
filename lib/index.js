/**
 * dsh-mobile-ui — node half.
 *
 * Injects a small responsive CSS override into the index.html served by the
 * DSH web profile. The override only activates under `max-width: 680px`, so
 * desktop/tablet behavior is unchanged. No React tree is touched and no
 * behavior changes; removing the plugin removes the styles.
 *
 * Selectors are prefixed with `html body` (higher specificity) so the rules
 * win over the runtime-injected plugin styles that appear later in the DOM.
 */

const PLUGIN_ID = "dsh-mobile-ui";

const CSS = `
@media screen and (max-width: 680px) {
  /* Settings modal becomes a full-screen sheet */
  html body .VOzbGW_overlay {
    align-items: stretch;
    justify-content: stretch;
  }
  html body .VOzbGW_panel {
    width: 100vw;
    max-width: 100vw;
    height: 100vh;
    height: 100dvh;
    max-height: 100vh;
    max-height: 100dvh;
    border-radius: 0;
    box-shadow: none;
    flex-direction: column;
  }

  /* Left settings nav becomes a full-width horizontal tab bar at the top */
  html body .VOzbGW_nav {
    box-sizing: border-box;
    width: 100% !important;
    max-width: 100% !important;
    flex: none;
    flex-direction: column;
    gap: 6px;
    padding: calc(6px + env(safe-area-inset-top)) 52px 6px 10px !important;
    border-bottom: 1px solid var(--dsw-alias-border-l2);
    overflow-x: auto;
    overflow-y: hidden;
    scrollbar-width: none;
  }
  html body .VOzbGW_nav::-webkit-scrollbar {
    display: none;
  }
  html body .VOzbGW_navTitle {
    display: none;
  }
  html body .VOzbGW_navList {
    width: 100% !important;
    min-width: 100%;
    max-width: 100%;
    flex-direction: row;
    gap: 6px;
  }
  html body .VOzbGW_navCell {
    flex: 0 0 auto;
    height: 34px;
    padding: 6px 12px !important;
    border-radius: 17px;
    white-space: nowrap;
  }
  html body .VOzbGW_navLabel {
    flex: 0 0 auto;
    white-space: nowrap;
  }

  /* Close button: pin it to the top-right corner of the settings window */
  html body .VOzbGW_close {
    position: absolute;
    top: calc(8px + env(safe-area-inset-top));
    right: 12px;
    z-index: 3;
    width: 32px;
    height: 32px;
    background: var(--dsw-alias-bg-layer-2);
    box-shadow: var(--dsw-shadow-lv1);
  }
  html body .VOzbGW_close:hover {
    background: var(--dsw-alias-interactive-bg-hover);
  }

  /* Content column takes the remaining height */
  html body .VOzbGW_content {
    flex: 1 1 auto;
    min-height: 0;
  }
  html body .VOzbGW_header {
    box-sizing: border-box;
    height: auto;
    min-height: 44px;
    padding: 8px 12px 4px !important;
  }
  html body .VOzbGW_options {
    box-sizing: border-box;
    width: 100%;
    max-width: 100%;
    padding: 0 12px calc(20px + env(safe-area-inset-bottom)) !important;
    -webkit-overflow-scrolling: touch;
  }

  /* Let General-settings rows wrap instead of squeezing their controls */
  [data-slot="settings.general.item"],
  [data-slot="settings.general.item"] > * {
    min-width: 0;
    max-width: 100%;
  }
  [data-slot="settings.general.item"] > div {
    flex-wrap: wrap;
    gap: 8px;
    padding-top: 12px;
    padding-bottom: 12px;
  }
}
`;

function injectStyle(html) {
  if (typeof html !== "string") return html;
  if (html.includes(`id="${PLUGIN_ID}"`)) return html;
  const style = `<style id="${PLUGIN_ID}">${CSS}</style>`;
  const headEnd = html.indexOf("</head>");
  if (headEnd !== -1) {
    return `${html.slice(0, headEnd)}${style}${html.slice(headEnd)}`;
  }
  return `${style}${html}`;
}

export function apply(ctx) {
  ctx.inject(["webServer"], (webCtx) => {
    const dispose = webCtx.webServer.tapIndex(injectStyle);
    ctx.effect(() => dispose, "dsh-mobile-ui: responsive settings CSS");
  });
}
