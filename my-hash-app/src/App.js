// src/App.js
import React, { useEffect, useState } from 'react';
import './App.css';
// SHA-256 modülleri
import { SHA_256 } from './Components/Function/calculateSha-256';

import { downloadRandomDummyFile } from './Components/Function/DownloadDummyFile';
import Uploader from './Components/Uploader';
import { SHA_512 } from './Components/Function/calculateSha-512';

function App() {
  const [fileInfo, setFileInfo] = useState(null);
  const [downloadStatus, setDownloadStatus] = useState('');
  const [results, setResults] = useState([])
  useEffect(() => {

  }, [])

  const handleHash = async () => {
    if (!fileInfo) return
    // 1) Dosyayı ArrayBuffer olarak oku
    const buffer = await fileInfo.arrayBuffer()
    const bytes = new Uint8Array(buffer)
    const CHUNK = 1 * 1024 * 1024  // 1 MiB
    const count = Math.ceil(bytes.length / CHUNK)
    const temp = []

    for (let i = 0; i < count; i++) {
      const start = i * CHUNK
      const end = Math.min(start + CHUNK, bytes.length)
      const chunk = bytes.slice(start, end)
      // 2) Baytları metne çevir
      const text = new TextDecoder().decode(chunk)
      // 3) SHA fonksiyonlarını çağır
      const sha256 = SHA_256(text)
      const sha512 = SHA_512(text)
      temp.push({ idx: i + 1, sha256, sha512 })
    }

    setResults(temp)
  }

  const handleDownload = () => {
    try {
      // 100 MB’lık dosya indir
      downloadRandomDummyFile(100);
      setDownloadStatus('İndirme başlatıldı…');
    } catch (err) {
      console.error(err);
      setDownloadStatus('İndirme sırasında hata oluştu.');
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>SHA Hash Uygulaması</h1>
        </header>  
       
        <div className="controls">


          <Uploader onFileSelected={file => setFileInfo(file)} />
          <button onClick={handleDownload}>
            Rastgele dosya üret ve indir
          </button>

        </div>
        <div>
          <button onClick={handleHash} disabled={!fileInfo}>
            Dosyayı 1 MiB’lik bloklara böl ve hashle
          </button>
        </div>
        <>
          {results.length > 0 && (
            <table className="results">
              <thead>
                <tr>
                  <th>Blok No</th>
                  <th>SHA-256</th>
                  <th>SHA-512</th>
                </tr>
              </thead>
              <tbody>
                {results.map(r => (
                  <tr key={r.idx}>
                    <td>{r.idx}</td>
                    <td><code>{r.sha256}</code></td>
                    <td><code>{r.sha512}</code></td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </>
       
    </div>

  );
}


export default App;
