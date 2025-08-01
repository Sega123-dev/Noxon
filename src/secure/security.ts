import { decryptText, encryptText } from "../@helpers/cryptoutils";
import {
  prohibitedKeysAdvanced,
  prohibitedKeysBasic,
} from "../@helpers/prohibitedKeys";

interface EncryptParams {
  encryptedData: string;
  iv: string;
  key: string;
}
export const encrypt = async (
  plain: string
): Promise<Record<string, any> | undefined> => {
  return await encryptText(plain);
};

export const decrypt = async ({
  encryptedData,
  iv,
  key,
}: EncryptParams): Promise<string | undefined> => {
  return await decryptText(encryptedData, iv, key);
};

export const getPKAdvanced = (): Set<string> => {
  return prohibitedKeysAdvanced;
};

export const getPKBasic = (): Set<string> => {
  return prohibitedKeysBasic;
};
