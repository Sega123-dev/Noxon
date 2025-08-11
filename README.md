<p align="center">
  <img src="assets/textured logo.png" alt="Noxon Logo" width="200">
</p>

<h1 align="center">Noxon</h1>


Is a TypeScript-based library that provides advanced JSON manipulation features like formatting, whitespace filling, key editing (even nested), parsing, merging, and secure data handling. It’s designed to help developers display and manage JSON data both in the browser with optional syntax highlighting and validation. The goal is to make working with JSON easier, more visual, and safer—especially when dealing with complex or sensitive data.**It is also optimized and lightweight**

## ⚙️Core features

- ✅ Format and beautify JSON
- 🔄 Whitespace filler for minimal JSON
- 🧩 Edit keys and values (supports nested structures)
- 🛡️ Strip or encrypt sensitive fields (e.g., tokens, passwords)
- 📁 Merge JSON files and objects
- 🌈 Display JSON in browser with syntax highlighting
- 🧪 Validate and compare JSON structures
- 📦 Fetch and export JSON

## Installation

All you need is:

```bash
npm install noxon
```

## 🎨Support for syntax Highlighting

- Vanilla Javascript
- Typescript
- React
- XML

## Usage

You want to add a key into an object with maximum security? You can do it easily,just type:

```js
import { addKey } from "noxon";

const user = {
  name: "Alice",
  age: 30
};

await addKey({
  object: user,
  newKey: "job",
  keyValue: "software engineer",
  security: "encrypt",
  securityLevel: "advanced",
});
```

## 📆Versions

This library is currently in active development and will be released soon!

## 🤝Contributions

Contributions, bug reports, and feature requests are welcome!
Please open an issue or submit a pull request.
