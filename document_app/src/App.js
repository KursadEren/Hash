// src/App.jsx
import React, { useEffect, useState } from 'react';

import DropFileInput from './Components/DropFileInput';
import './App.css';  // global stil dosyanız
import PdfReader from './Components/PdfReader';
import { parseFile } from './Components/parseFile';


function App() {
  const [files, setFiles] = useState([]);
  const [numPages, setNumPages] = useState(null);
  const [metadata, setMetadata] = useState({});
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [readFiles, setReadFiles] = useState([
    // başlangıçta boş dizi ya da tek bir boş nesne
    { author: '', date: '', title: '', text: '' ,type:''}
  ]);

  const addReadFile = entry => {
    setReadFiles(prev => [...prev, entry]);
  };
  const handleFile = async () => {
    setLoading(true);
    setError(null);
    try {
      const entries = await parseFile(files);
      setReadFiles(entries);
    } catch (err) {
      console.error(err);
      setError('Dosyalar işlenirken bir hata oldu.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
   
  }, [files])

  const handleFileChange = updatedList => {
    setFiles(updatedList);
  };

  return (
    <>

      <main className="app-container">
        <section id="upload">
          <h2>Dosya Yükleme</h2>
          <DropFileInput onFileChange={handleFileChange} />
          {files.length > 0 && (
            <button className="process-btn" onClick={handleFile}>
              Yüklenen Dosyaları İşle
            </button>
          )}
        </section>

        <section id="files">
          <h2>Yüklenen Dosyalar</h2>
          <ul>
            {files.map((f, i) => (
              <li key={i}>
                {f.name} ({(f.size / 1024).toFixed(1)} KB)
              </li>
            ))}
          </ul>
        </section>

      </main>
    </>
  );
}

export default App;
