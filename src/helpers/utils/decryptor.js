// import CryptoJS from "crypto-js";

// export default function decryptor(encryptedString) {
//    const encryptMethod = "AES-256-CBC";
//   const secretKey = "beatnik#technolgoy_sampreeti";
//   const secretIv = "beatnik$technolgoy@sampreeti";

//   // Generate key and iv
//   const key = CryptoJS.SHA256(secretKey).toString(CryptoJS.enc.Hex);
//   const iv = CryptoJS.SHA256(secretIv).toString(CryptoJS.enc.Hex).substr(0, 16);

//   // Decrypt
//   const decrypted = CryptoJS.AES.decrypt(
//     encryptedString,
//     CryptoJS.enc.Hex.parse(key),
//     {
//       iv: CryptoJS.enc.Hex.parse(iv),
//       mode: CryptoJS.mode.CBC,
//       padding: CryptoJS.pad.Pkcs7,
//     }
//   );

//   return decrypted.toString(CryptoJS.enc.Utf8);
// }
