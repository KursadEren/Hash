import React, { useState } from 'react';
import './App.css';
import FileInput from './Components/FıleInput';
import {
  generateKeyPair,
  encryptData,
  decryptData,
  downloadEncrypted,
  downloadDecrypted
} from './Components/pgpUtils';

function App() {
  const [keys, setKeys] = useState({});
  const [plainFile, setPlainFile] = useState(null);
  const [encryptedFile, setEncryptedFile] = useState(null);
  const [decrypted, setDecrypted] = useState('');

  const createKeys = async () => {
    const k = await generateKeyPair('Kullanıcı', 'user@example.com', 'sifre123');
    setKeys(k);
  };


  const onPlainRead = f => setPlainFile(f);


  const doEncrypt = async () => {
    const cipher = await encryptData(plainFile.data, keys.publicKey);
    downloadEncrypted(cipher, `${plainFile.name}.pgp`);
  };


  const onEncryptedRead = async ({ file }) => {
    const text = await file.text();
    setEncryptedFile(text);
  };


  const doDecrypt = async () => {
    const plain = await decryptData(encryptedFile, keys.privateKey, 'sifre123');
    setDecrypted(plain);
    downloadDecrypted(plain, plainFile.name.replace(/\.\w+$/, '') + '_cozuldu.txt');
  };


  return (
    <div className="container">
      <h2 className="header">PGP Demo</h2>

      <div className="section">
        <h3 className="section-title">Anahtar Üret</h3>
        <button className="btn" onClick={createKeys}>Anahtar Çifti Oluştur</button>
        <h3 className="section-title">Public Key</h3>
        {keys.publicKey && <pre className="pre">{keys.publicKey}</pre>}
        <h3 className="section-title">Private Key</h3>
        {keys.publicKey && <pre className="pre">{keys.privateKey}</pre>}
      </div>
     

      <div className="section">
        <h3 className="section-title">1) Dosya Şifreleme</h3>
        <FileInput accept="" onFileRead={onPlainRead} />
        {plainFile && <p className="file-name">Seçilen dosya: {plainFile.name}</p>}
        <button className="btn" onClick={doEncrypt} disabled={!plainFile}>
          Şifrele ve İndir
        </button>
      </div>

      <div className="section">
        <h3 className="section-title">2) Dosya Çözme</h3>
        <FileInput accept=".gpg,.pgp" onFileRead={onEncryptedRead} />
        {encryptedFile && <p className="file-name">Şifreli içerik yüklendi.</p>}
        <button className="btn" onClick={doDecrypt} disabled={!encryptedFile}>
          Çöz ve İndir
        </button>
        {decrypted && (
          <>
            <h4 className="section-title">Çözülen İçerik</h4>
            <pre className="pre">{decrypted}</pre>
          </>
        )}
      </div>
    </div>
  );
}

export default App;
