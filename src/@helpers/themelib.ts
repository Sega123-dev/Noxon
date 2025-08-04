export const themes: Record<string, () => Promise<unknown>> = {
  "atom-one-dark": () => import("highlight.js/styles/atom-one-dark.css"),
  monokai: () => import("highlight.js/styles/monokai.css"),
  vs2015: () => import("highlight.js/styles/vs2015.css"),
  "tokyo-night-dark": () => import("highlight.js/styles/tokyo-night-dark.css"),
  "night-owl": () => import("highlight.js/styles/night-owl.css"),
  obsidian: () => import("highlight.js/styles/obsidian.css"),
  dark: () => import("highlight.js/styles/dark.css"),
  agate: () => import("highlight.js/styles/agate.css"),
  "arta-dark": () => import("highlight.js/styles/arta.css"),
  "a11y-dark": () => import("highlight.js/styles/a11y-dark.css"),

  "atom-one-light": () => import("highlight.js/styles/atom-one-light.css"),
  github: () => import("highlight.js/styles/github.css"),
  googlecode: () => import("highlight.js/styles/googlecode.css"),
  vs: () => import("highlight.js/styles/vs.css"),
  xcode: () => import("highlight.js/styles/xcode.css"),
  default: () => import("highlight.js/styles/default.css"),
  docco: () => import("highlight.js/styles/docco.css"),
  foundation: () => import("highlight.js/styles/foundation.css"),
  idea: () => import("highlight.js/styles/idea.css"),
  "a11y-light": () => import("highlight.js/styles/a11y-light.css"),

  "base16-railscasts": () =>
    import("highlight.js/styles/base16/railscasts.css"),
  "base16-darcula": () => import("highlight.js/styles/base16/darcula.css"),
  "base16-grayscale-dark": () =>
    import("highlight.js/styles/base16/grayscale-dark.css"),
  "base16-grayscale-light": () =>
    import("highlight.js/styles/base16/grayscale-light.css"),
  "base16-snazzy": () => import("highlight.js/styles/base16/snazzy.css"),
  "base16-tomorrow": () => import("highlight.js/styles/base16/tomorrow.css"),
  "base16-tomorrow-night": () =>
    import("highlight.js/styles/base16/tomorrow-night.css"),
};
