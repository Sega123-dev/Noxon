import { addKey } from "./mods/keys";
import { colormatic } from "./show/display";

export { exportJSON, exportJS } from "./fileHandling/export";
export { fetchJSON } from "./fileHandling/fetch";
export { format, formatFill, minifyJSON } from "./formats/formatter";
export { addKey, removeKey, renameKey, modifyKeyValue } from "./mods/keys";
export { merge, mergeFiles } from "./mods/merge";
export { encrypt, decrypt, getPKAdvanced, getPKBasic } from "./secure/security";
export { display, colormatic } from "./show/display";
export { parseJSON } from "./utils/parse";
export { sortObjectArray } from "./utils/sort";
export { stringifyJSON } from "./utils/stringify";
export { validate, compareKeys, typeSchema } from "./utils/validate";
const user = {
  name: "Alex",
  age: 25,
  email: "alex@example.com",
  isAdmin: false,
  preferences: {
    theme: "dark",
    notifications: true,
    cookie: "cookie",
  },
  hobbies: ["reading", "gaming", "coding"],
};

console.log(
  await addKey({
    object: user,
    newKey: "aaa",
    keyValue: 123,
    security: "encrypt",
    securityLevel: "advanced",
  })
);
await colormatic(
  `export const colormatic = <Value extends any>(
  value: Value,
  lang: HLJSLanguage,
  selector: string
): void => {
  try {
  const wrapper = document.querySelector(selector);
  if (!wrapper) throw new Error("Wrapper element not found");

    if (value === undefined || value === null)
      throw new Error("Value is undefined or null");
    if (!lang) throw new Error("Language is undefined or null");

    const stringified: string | undefined =
      typeof value === "string" ? value : format(value, 2);

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
`,
  "typescript",
  "#app",
  "base16-grayscale-light"
);
