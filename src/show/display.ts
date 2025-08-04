import { format } from "../formats/formatter";
import { stringifyJSON } from "../utils/stringify";
import hljs from "highlight.js/lib/core";
import json from "highlight.js/lib/languages/json";
import javascript from "highlight.js/lib/languages/javascript";
import typescript from "highlight.js/lib/languages/typescript";
import xml from "highlight.js/lib/languages/xml";
import "highlight.js/styles/atom-one-light.min.css";

hljs.registerLanguage("javascript", javascript);
hljs.registerLanguage("json", json);
hljs.registerLanguage("typescript", typescript);
hljs.registerLanguage("xml", xml);

type HLJSLanguage = "javascript" | "typescript" | "json" | "xml";
export const consoleDisplay = (
  value: Record<string, any>
): void | undefined => {
  try {
    if (typeof value !== "object")
      throw new Error("Passed value must be an object in consoleDisplay()");

    console.log(format(value, 2));
  } catch (error) {
    console.error(error);
    return undefined;
  }
};

export const display = <displayValue>(
  value: displayValue,
  selector: string
): void | undefined => {
  try {
    if (value === null) throw new Error("Value passed in display is null");

    if (typeof selector !== "string")
      throw new Error("Selector must be a string");

    let wrapper = document.querySelector(selector) as HTMLElement;
    let preElement: HTMLPreElement = document.createElement("pre");

    if (typeof value === "object") {
      let stringified: string | undefined = stringifyJSON(value);
      if (stringified === undefined)
        throw new Error("Object value is undefined");
      preElement.innerText += stringified;
      wrapper.appendChild(preElement);
      return;
    }

    preElement.innerText += value;
    wrapper.appendChild(preElement);
  } catch (error) {
    console.error(error);
    return undefined;
  }
};

export const colormatic = async <Value extends any>(
  value: Value,
  lang: HLJSLanguage,
  selector: string,
  theme: string = "atom-one-light"
): Promise<void> => {
  try {
    const themes: Record<string, () => Promise<unknown>> = {
      "atom-one-dark": () => import("highlight.js/styles/atom-one-dark.css"),
      monokai: () => import("highlight.js/styles/monokai.css"),
      vs2015: () => import("highlight.js/styles/vs2015.css"),
      "tokyo-night-dark": () =>
        import("highlight.js/styles/tokyo-night-dark.css"),
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
    };
    const loader = async () => {
      if (!themes[theme]) throw new Error("This theme is not supported");
      await themes[theme]();
    };
    loader();
    const wrapper = document.querySelector(selector);
    if (!wrapper) throw new Error("Wrapper element not found");

    if (value === undefined || value === null)
      throw new Error("Value is undefined or null");
    if (!lang) throw new Error("Language is undefined or null");

    const stringified: string | undefined =
      typeof value === "string" ? value : format(value, 10);

    const highlighted: string = hljs.highlight(stringified!, {
      language: lang,
    }).value;

    const pre = document.createElement("pre");
    const code = document.createElement("code");

    code.classList.add("hljs", lang);

    code.innerHTML += highlighted;

    pre.appendChild(code);

    wrapper.appendChild(pre);
  } catch (error) {
    console.error(error);
    return undefined;
  }
};
