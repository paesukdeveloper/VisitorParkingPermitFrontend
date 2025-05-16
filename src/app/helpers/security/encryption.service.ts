import { Injectable } from '@angular/core';
import * as CryptoJS from 'crypto-js';


@Injectable()
export class EncryptionService {
  private key: any = '7e4bac048db766e8367ec8c079e1f88c2eb69090';

  // Encrypt Plain text to cypher
  public OpenSSLEncrypt(plainText: string, typeObj?: boolean): string {
    const data = typeObj ? JSON.stringify(plainText) : plainText;
    const encrypted = CryptoJS.AES.encrypt(data, this.key);
    return encrypted.toString();
  }

  // Decrypt Cypher to plain text
  public OpenSSLDecrypt(cipherText: string): string {
    let decrypt: any;
    decrypt = CryptoJS.AES.decrypt(cipherText, this.key);
    return decrypt.toString(CryptoJS.enc.Utf8);
  }
}
