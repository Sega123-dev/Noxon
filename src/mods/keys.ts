import { encrypt, getPKBasic, getPKAdvanced } from "../secure/security";

type Security = "strip" | "encrypt" | "none";
type SecurityLevel = "basic" | "advanced";
interface AddKeyParameters {
  object: Record<string, any> | undefined;
  newKey: string;
  keyValue: any;
  nested?: string;
  security?: Security;
  securityLevel?: SecurityLevel;
}

interface RemoveKeyParameters {
  object: Record<string, any> | undefined;
  key: string;
  nested?: string;
  security?: Security;
  securityLevel?: SecurityLevel;
}

interface ModifyKeyParameters {
  object: Record<string, any> | undefined;
  key: string;
  newValue: any;
  nested?: string;
  security?: Security;
  securityLevel?: SecurityLevel;
}

interface RenameKeyParameters {
  object: Record<string, any> | undefined;
  oldKey: string;
  newKey: string;
  nested?: string;
  security?: Security;
  securityLevel?: SecurityLevel;
}

export const addKey = async ({
  object,
  newKey,
  keyValue,
  nested,
  security = "encrypt",
  securityLevel = "basic",
}: AddKeyParameters): Promise<Object | undefined> => {
  const PKBasic = getPKBasic();
  const PKAdvanced = getPKAdvanced();

  const selectedSecurityLevel: Set<string> =
    securityLevel === "advanced" ? PKAdvanced : PKBasic;

  try {
    if (
      object === undefined ||
      newKey === undefined ||
      keyValue === undefined
    ) {
      console.warn("Warning: One or couple of values are not provided");
      return;
    }
    if (object === null || typeof object !== "object")
      throw new Error("Object must be defined and must be type of an object");
    if (newKey === null || typeof newKey !== "string")
      throw new Error("New key must be defined and type of a string");
    if (keyValue === null || keyValue === undefined)
      throw new Error("Key value must be defined and type of a string");

    if (!nested) {
      if (security === "strip") {
        selectedSecurityLevel.forEach((pkKey) => {
          if (pkKey in object) object[pkKey] = "";
        });
      } else if (security === "encrypt") {
        for (const pkKey of selectedSecurityLevel) {
          if (pkKey in object && typeof object[pkKey] === "string") {
            const encrypted = await encrypt(object[pkKey]);
            if (encrypted) object[pkKey] = encrypted.encryptedData;
          }
        }
      }
      object[newKey] = keyValue;
      return object;
    }

    const path: string[] | undefined = nested?.split(".");
    let current: any = object;

    for (let i = 0; i < path!.length; i++) {
      const segment = path![i];
      const index = Number(segment);
      const isArrayIndex = !isNaN(index);

      if (isArrayIndex) {
        if (!Array.isArray(current)) {
          current = current[path![i - 1]] = [];
        }
        if (!current[index]) {
          current[index] = {};
        }
        current = current[index];
      } else {
        if (
          !Object.prototype.hasOwnProperty.call(current, segment) ||
          typeof current[segment] !== "object" ||
          current[segment] === null
        ) {
          current[segment] = {};
        }
        current = current[segment];
      }
    }

    if (security === "strip") {
      selectedSecurityLevel.forEach((pkKey) => {
        if (pkKey in current) current[pkKey] = "";
      });
    } else if (security === "encrypt") {
      for (const pkKey of selectedSecurityLevel) {
        if (pkKey in current && typeof current[pkKey] === "string") {
          const encrypted = await encrypt(current[pkKey]);
          if (encrypted) current[pkKey] = encrypted.encryptedData;
        }
      }
    }

    current[newKey] = keyValue;
    return object;
  } catch (error) {
    console.error(error);
    return undefined;
  }
};

export const removeKey = async ({
  object,
  key,
  nested,
  security = "encrypt",
  securityLevel = "basic",
}: RemoveKeyParameters): Promise<Object | undefined> => {
  const PKBasic = getPKBasic();
  const PKAdvanced = getPKAdvanced();

  const selectedSecurityLevel: Set<string> =
    securityLevel === "advanced" ? PKAdvanced : PKBasic;
  try {
    if (object === undefined || key === undefined) {
      console.warn("Warning: One of the passed values are not defined");
      return;
    }
    if (object === null || typeof object !== "object")
      throw new Error("Object must be defined and must be type of an object");
    if (key === null || typeof key !== "string")
      throw new Error("Key must be defined and type of a string");

    if (!nested) {
      if (security === "strip") {
        selectedSecurityLevel.forEach((pkKey) => {
          if (pkKey in object) object[pkKey] = "";
        });
      } else if (security === "encrypt") {
        for (const pkKey of selectedSecurityLevel) {
          if (pkKey in object && typeof object[pkKey] === "string") {
            const encrypted = await encrypt(object[pkKey]);
            if (encrypted) object[pkKey] = encrypted.encryptedData;
          }
        }
      }

      delete object[key];
      return object;
    }

    const path: string[] = nested?.split(".");
    let current: any = object;
    for (let i = 0; i < path.length; i++) {
      const segment = path[i];
      const index = Number(segment);
      const isArrayIndex = !isNaN(index);

      if (isArrayIndex) {
        if (!Array.isArray(current)) {
          current = current[path[i - 1]] = [];
        }
        if (!current[index]) {
          current[index] = {};
        }
        current = current[index];
      } else {
        if (
          !Object.prototype.hasOwnProperty.call(current, segment) ||
          typeof current[segment] !== "object" ||
          current[segment] === null
        ) {
          current[segment] = {};
        }
        current = current[segment];
      }
    }

    if (security === "strip") {
      selectedSecurityLevel.forEach((pkKey) => {
        if (pkKey in current) current[pkKey] = "";
      });
    } else if (security === "encrypt") {
      for (const pkKey of selectedSecurityLevel) {
        if (pkKey in current && typeof current[pkKey] === "string") {
          const encrypted = await encrypt(current[pkKey]);
          if (encrypted) current[pkKey] = encrypted.encryptedData;
        }
      }
    }

    delete current[key];
    return object;
  } catch (error) {
    console.error(error);
    return undefined;
  }
};

export const modifyKeyValue = async ({
  object,
  key,
  newValue,
  nested,
  security = "encrypt",
  securityLevel = "basic",
}: ModifyKeyParameters): Promise<Object | undefined> => {
  const PKBasic = getPKBasic();
  const PKAdvanced = getPKAdvanced();

  const selectedSecurityLevel: Set<string> =
    securityLevel === "advanced" ? PKAdvanced : PKBasic;

  try {
    if (object === null || typeof object !== "object")
      throw new Error("Object must be defined and must be type of an object");
    if (key === null || typeof key !== "string")
      throw new Error("Key must be defined and type of a string");

    if (!nested) {
      if (security === "strip") {
        selectedSecurityLevel.forEach((pkKey) => {
          if (pkKey in object) object[pkKey] = "";
        });
      } else if (security === "encrypt") {
        for (const pkKey of selectedSecurityLevel) {
          if (pkKey in object && typeof object[pkKey] === "string") {
            const encrypted = await encrypt(object[pkKey]);
            if (encrypted) object[pkKey] = encrypted.encryptedData;
          }
        }
      }
      object[key] = newValue;
      return object;
    }

    const path: string[] = nested.split(".");
    let target: any = object;

    for (let i = 0; i < path.length; i++) {
      const segment = path[i];
      const index = Number(segment);
      const isArrayIndex = !isNaN(index);

      if (isArrayIndex) {
        if (!Array.isArray(target)) {
          target = [];
        }
        if (!target[index]) {
          target[index] = {};
        }
        target = target[index];
      } else {
        if (
          !Object.prototype.hasOwnProperty.call(target, segment) ||
          typeof target[segment] !== "object" ||
          target[segment] === null
        ) {
          target[segment] = {};
        }
        target = target[segment];
      }
    }
    if (security === "strip") {
      selectedSecurityLevel.forEach((pkKey) => {
        if (pkKey in object) object[pkKey] = "";
      });
    } else if (security === "encrypt") {
      for (const pkKey of selectedSecurityLevel) {
        if (pkKey in target && typeof target[pkKey] === "string") {
          const encrypted = await encrypt(target[pkKey]);
          if (encrypted) target[pkKey] = encrypted.encryptedData;
        }
      }
    }
    target[key] = newValue;
    return object;
  } catch (error) {
    return undefined;
  }
};

export const renameKey = async ({
  object,
  oldKey,
  newKey,
  nested,
  security = "encrypt",
  securityLevel = "basic",
}: RenameKeyParameters): Promise<Object | undefined> => {
  const PKBasic = getPKBasic();
  const PKAdvanced = getPKAdvanced();

  const selectedSecurityLevel: Set<string> =
    securityLevel === "advanced" ? PKAdvanced : PKBasic;
  try {
    if (object === null || typeof object !== "object")
      throw new Error("Object must be defined and must be type of an object");
    if (oldKey === null || typeof oldKey !== "string")
      throw new Error("Old key must be defined and type of a string");
    if (newKey === null || typeof newKey !== "string")
      throw new Error("New key must be defined and type of a string");

    if (!nested) {
      if (security === "strip") {
        selectedSecurityLevel.forEach((pkKey) => {
          if (pkKey in object) object[pkKey] = "";
        });
      } else if (security === "encrypt") {
        for (const pkKey of selectedSecurityLevel) {
          if (pkKey in object && typeof object[pkKey] === "string") {
            const encrypted = await encrypt(object[pkKey]);
            if (encrypted) object[pkKey] = encrypted.encryptedData;
          }
        }
      }
      object[newKey] = object[oldKey];
      delete object[oldKey];
      return object;
    }

    const path: string[] = nested!.split(".");
    let target: any = object;
    for (let i = 0; i < path.length; i++) {
      const segment = path[i];

      const index = Number(segment);
      const isArrayIndex = !isNaN(index);

      if (isArrayIndex) {
        if (!Array.isArray(target)) {
          target = target[path[i - 1]] = [];
        }
        if (!target[index]) {
          target[index] = {};
        }
        target = target[index];
      } else {
        if (
          !Object.prototype.hasOwnProperty.call(target, segment) ||
          typeof target[segment] !== "object" ||
          target[segment] === null
        ) {
          target[segment] = {};
        }
        target = target[segment];
      }
    }
    if (security === "strip") {
      selectedSecurityLevel.forEach((pkKey) => {
        if (pkKey in object) object[pkKey] = "";
      });
    } else if (security === "encrypt") {
      for (const pkKey of selectedSecurityLevel) {
        if (pkKey in target && typeof target[pkKey] === "string") {
          const encrypted = await encrypt(target[pkKey]);
          if (encrypted) target[pkKey] = encrypted.encryptedData;
        }
      }
    }
    target[newKey] = target[oldKey];
    delete target[oldKey];
    return object;
  } catch (error) {
    console.error(error);
    return undefined;
  }
};
