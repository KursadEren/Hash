import * as openpgp from 'openpgp';

export async function generateKeyPair(name, email, passphrase) {
  const { privateKey, publicKey } = await openpgp.generateKey({
    type: 'rsa',
    rsaBits: 2048,
    userIDs: [{ name, email }],
    passphrase
  });
  return { privateKey, publicKey };
}

export async function encryptData(plainBuffer, publicKeyArmored) {
  const publicKey = await openpgp.readKey({ armoredKey: publicKeyArmored });
  const message   = await openpgp.createMessage({ binary: new Uint8Array(plainBuffer) });
  return await openpgp.encrypt({
    message:message,
    encryptionKeys: publicKey
  });
}

export async function decryptData(encryptedArmored, privateKeyArmored, passphrase) {
  const privateKey = await openpgp.decryptKey({
    privateKey: await openpgp.readPrivateKey({ armoredKey: privateKeyArmored }),
    passphrase
  });
  const message = await openpgp.readMessage({ armoredMessage: encryptedArmored });
  const { data: decrypted } = await openpgp.decrypt({
    message,
    decryptionKeys: privateKey
  });
  return decrypted;
}


export function downloadEncrypted(encryptedText, filename ) {
  const blob = new Blob([encryptedText], { type: 'application/pgp-encrypted' });
  const url  = URL.createObjectURL(blob);
  const a    = document.createElement('a');
  a.href     = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}


export function downloadDecrypted(decryptedData, filename) {
    
    const payload = 
      typeof decryptedData === 'string'
        ? new TextEncoder().encode(decryptedData)
        : decryptedData;
    const blob = new Blob([payload], { type: 'application/octet-stream' });
    const url  = URL.createObjectURL(blob);
    const a    = document.createElement('a');
    a.href     = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }
  