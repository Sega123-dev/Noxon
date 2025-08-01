import { addKey } from "./mods/keys";

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
