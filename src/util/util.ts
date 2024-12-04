import CryptoJS, { SHA256 } from "crypto-js";

export const sha256Encrypt = (data: string) => {
  return SHA256(data).toString();
};

export const aesEncrypt = (data: string) => {
    const key = process.env.REACT_APP_SECRET_KEY ?? ''
    return CryptoJS.AES.encrypt(data, key).toString();
};

export const aesDecrypt = (data: string | null) => {
    if (!data) return "";
    const key = process.env.REACT_APP_SECRET_KEY ?? ''

    const bytes = CryptoJS.AES.decrypt(data, key);
    const decryptedData = bytes.toString(CryptoJS.enc.Utf8);

    return decryptedData;
};

export function isNumeric(str: string) {
  return /^\d+$/.test(str);
}