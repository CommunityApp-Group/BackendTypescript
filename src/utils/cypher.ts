import crypto from "crypto";
import cryptoJS from "crypto-js";
import dotenv from "dotenv";

dotenv.config();
let { RESPONSE_AESKEY, RESPONSE_IVKEY } = process.env;

class Cypher {
  static async encrypt(
    text: string,
    aesKey: string | any,
    ivKey: string | any,
    algorithm: string | any
  ) {
    try {
      const cypher = crypto.createCipheriv(
        algorithm,
        Buffer.from(aesKey),
        ivKey
      );

      let encrypted = cypher.update(JSON.stringify(text));
      encrypted = Buffer.concat([encrypted, cypher.final()]);
      return encrypted.toString("hex");
    } catch (error) {
      return null;
    }
  }

  static async decrypt(
    text: string,
    aesKey: string | any,
    ivKey: string | any,
    algorithm: string | any
  ) {
    try {
      const encryptedText = Buffer.from(text, "hex");
      const decipher = crypto.createDecipheriv(
        algorithm,
        Buffer.from(aesKey),
        ivKey
      );
      let decrypted = decipher.update(encryptedText);
      decrypted = Buffer.concat([decrypted, decipher.final()]);
      return JSON.parse(decrypted.toString());
    } catch (error) {
      return null;
    }
  }

  static async encryptWallet(
    text: string,
    aesKey: string | any,
    ivKey: string | any,
    algorithm: string | any
  ) {
    try {
      const iv = Buffer.alloc(16, ivKey);
      let cipher = crypto.createCipheriv(algorithm, aesKey, iv);
      let encrypted = cipher.update(text);
      encrypted = Buffer.concat([encrypted, cipher.final()]);
      return encrypted.toString("hex");
    } catch (error) {
      throw error;
    }
  }

  static async decryptWallet(
    text: string,
    aesKey: string | any,
    ivKey: string | any,
    algorithm: string | any
  ) {
    try {
      if (!text) return;
      const iv = Buffer.alloc(16, ivKey);
      let decipher = crypto.createDecipheriv(algorithm, aesKey, iv);
      let dec = decipher.update(text, "hex", "utf8");
      dec += decipher.final("utf8");
      return JSON.parse(dec);
    } catch (error) {
      throw error;
    }
  }

  static async cryptoJSEncrypt(payload: string) {
    if (RESPONSE_AESKEY && RESPONSE_IVKEY){
      const key = cryptoJS.enc.Hex.parse(RESPONSE_AESKEY);
      const iv = cryptoJS.enc.Hex.parse(RESPONSE_IVKEY);
      return cryptoJS.AES.encrypt(payload, key, {
        iv,
      }).toString();
    }
    throw new Error("AES and IV keys must be set");
  }

  static async cryptoJSDecrypt(text: string) {
    if (RESPONSE_AESKEY && RESPONSE_IVKEY) {
      const key = cryptoJS.enc.Hex.parse(RESPONSE_AESKEY);
      const iv = cryptoJS.enc.Hex.parse(RESPONSE_IVKEY);
      const decryptedData = cryptoJS.AES.decrypt(text, key, {
        iv,
      }).toString(cryptoJS.enc.Utf8);
      return decryptedData;
    }
    throw new Error("AES and IV keys must be set");
  }
}

export default Cypher;
