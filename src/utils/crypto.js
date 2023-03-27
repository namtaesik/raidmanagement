import CryptoJS from "crypto-js";

const secretKey = process.env.CPT_KEY;
// AES256 암호화
export const encryptAES256 = (data) => {
  const encryptedData = CryptoJS.AES.encrypt(
    data,
    CryptoJS.enc.Utf8.parse(secretKey),
    {
      iv: CryptoJS.enc.Utf8.parse(""),
      padding: CryptoJS.pad.Pkcs7,
      mode: CryptoJS.mode.CBC,
    }
  );
  return encryptedData.toString();
};

// AES256 복호화
export const decryptAES256 = (encryptedData) => {
  const decryptedData = CryptoJS.AES.decrypt(encryptedData, secretKey);
  return decryptedData.toString(CryptoJS.enc.Utf8);
};
