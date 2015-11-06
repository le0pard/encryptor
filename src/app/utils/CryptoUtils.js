import CryptoJS from 'crypto-js'

class CryptoUtils {
  constructor(keySize = 256, keyIterations = 1000) {
    this.keySize = keySize
    this.keyIterations = keyIterations
    // binds
    this.generateHex = this.generateHex.bind(this)
    this.generateKey = this.generateKey.bind(this)
    this.encrypt = this.encrypt.bind(this)
    this.decrypt = this.decrypt.bind(this)
    this.cryptOptions = this.cryptOptions.bind(this)
  }

  generateHex() {
    return CryptoJS.lib.WordArray.random(128 / 8).toString(CryptoJS.enc.Hex)
  }

  generateKey(passPhrase, salt) {
    return CryptoJS.PBKDF2(
      passPhrase,
      CryptoJS.enc.Hex.parse(salt),
      {
        keySize:    (this.keySize / 32),
        iterations: this.keyIterations
      }
    )
  }

  encrypt(message, key, iv) {
    const encrypted = CryptoJS.AES.encrypt(message, key, this.cryptOptions(iv))
    return encrypted.ciphertext.toString(CryptoJS.enc.Base64)
  }

  decrypt(ciphertext, key, iv) {
    const cipherParams = CryptoJS.lib.CipherParams.create({
      ciphertext: CryptoJS.enc.Base64.parse(ciphertext)
    })
    const decrypted = CryptoJS.AES.decrypt(cipherParams, key, this.cryptOptions(iv))
    return decrypted.toString(CryptoJS.enc.Utf8)
  }

  cryptOptions(iv) {
    return {
      mode:    CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7,
      iv:      CryptoJS.enc.Hex.parse(iv)
    }
  }
}

export default CryptoUtils
