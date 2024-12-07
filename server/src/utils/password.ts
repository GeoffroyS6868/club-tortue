import Crypto from "crypto-js";

export function getHashPassword(password: string): string {
  return Crypto.AES.encrypt(password, process.env.PASSWORD_KEY!).toString();
}

export function comparePassword(password: string, hash: string): boolean {
  return (
    Crypto.AES.decrypt(hash, process.env.PASSWORD_KEY!).toString(
      Crypto.enc.Utf8
    ) === password
  );
}
