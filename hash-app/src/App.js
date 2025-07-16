/* src/App.js */
import React, { useState, useEffect } from 'react'
import './App.css'
import { downloadRandomDummyFile } from './Component/downloadRandomDummyFile'
import Uploader from './Component/Uploader'
import { md5 as hashMd5, sha256 as hashSha256, sha512 as hashSha512 } from 'hash-wasm'

// İsteğe bağlı: parça yükleme yapılacaksa backend URL'i burada belirt
const CHUNK_UPLOAD_URL = 'https://localhost:5001/api/Dosya/DosyaParcalariYukle' // ← gerekirse düzenle

export default function App () {
  const [fileInfo, setFileInfo]       = useState(null)
  const [downloadStatus, setStatus]   = useState('')
  const [chunkHashes, setChunkHashes] = useState([])      // 1 MB (1000×1000) blok hash'leri
  const [fileHashes, setFileHashes]   = useState(null)    // Tam dosya hash'leri
  const [chunks, setChunks]           = useState([])      // Blob URL + boyut listesi
  const [isHashing, setHashing]       = useState(false)
  const [progress, setProgress]       = useState(0)

  // Bellekte oluşturulan blob adreslerini temizle
  useEffect(() => {
    return () => chunks.forEach(c => URL.revokeObjectURL(c.url))
  }, [chunks])

  /* ------------------------------------------------------------------ */
  const handleDownload = () => {
    try {
      downloadRandomDummyFile(5)
      setStatus('100 MB dosya indirme başlatıldı…')
    } catch (err) {
      console.error(err)
      setStatus('İndirme sırasında hata oluştu.')
    }
  }

  /* ------------------------------------------------------------------ */
  const handleHashAndSplit = async () => {
    if (!fileInfo) return

    setHashing(true)
    setChunkHashes([])
    setFileHashes(null)
    setChunks([])
    setProgress(0)

    try {
      const buffer  = await fileInfo.arrayBuffer()
      const bytes   = new Uint8Array(buffer)
      const CHUNK   = 1 * 1000 * 1000   // 1 MB (decimal)
      const count   = Math.ceil(bytes.length / CHUNK)

      const tmpChunkHashes = []
      const tmpChunks      = []

      for (let i = 0; i < count; i++) {
        const start = i * CHUNK
        const end   = Math.min(start + CHUNK, bytes.length)
        const slice = bytes.subarray(start, end)

        // Hash'ler
        const md5    = await hashMd5(slice)
        const sha256 = await hashSha256(slice)
        const sha512 = await hashSha512(slice)

        tmpChunkHashes.push({ idx: i + 1, md5, sha256, sha512 })

        // Blob oluştur – kullanıcı indirip saklayabilsin veya backend'e yollayabilelim
        const blob      = new Blob([slice])
        const url       = URL.createObjectURL(blob)
        tmpChunks.push({ idx: i + 1, url, size: slice.length, blob })

        // İlerleme çubuğu
        setProgress(Math.floor(((i + 1) / count) * 100))

        // İsteğe bağlı: Her parçayı backend'e yolla
        // await uploadChunk(i + 1, blob, sha256)
      }

      // Tam dosya hash'leri
      const fileMd5    = await hashMd5(bytes)
      const fileSha256 = await hashSha256(bytes)
      const fileSha512 = await hashSha512(bytes)
      setFileHashes({ md5: fileMd5, sha256: fileSha256, sha512: fileSha512 })

      setChunkHashes(tmpChunkHashes)
      setChunks(tmpChunks)
    } catch (err) {
      console.error('Hashing / split error:', err)
    } finally {
      setHashing(false)
    }
  }

  /* ------------------------------------------------------------------ */
  // Backend'e parça yükleme fonksiyonu (isteğe bağlı çağrılır)
  async function uploadChunk (partNo, blob, hash) {
    const fd = new FormData()
    fd.append('ticketID', '<ticket-guid>')        // ← ticketID'yi uygun şekilde doldur
    fd.append('tempKlasorID', '<temp-id>')        // ← DosyaMetaDataKaydiOlustur yanıtı
    fd.append('parcaHash', hash)
    fd.append('parcaNumarasi', partNo)
    fd.append('parca', blob)                      // Controller'da IFormFile parca olmalı

    try {
      const res = await fetch(CHUNK_UPLOAD_URL, {
        method: 'POST',
        body: fd
      })
      if (!res.ok) throw new Error(await res.text())
      console.info(`Parça ${partNo} yüklendi!`)
    } catch (e) {
      console.error(`Parça ${partNo} yüklenemedi:`, e)
    }
  }

  /* ------------------------------------------------------------------ */
  return (
    <div className='App'>
      <header className='App-header'>
        <h1>SHA &amp; MD5 Hash Uygulaması</h1>

        <div className='controls'>
          <Uploader onFileSelected={setFileInfo} />
          <button className='btn' onClick={handleDownload}>İndir (100 MB)</button>
          <button
            className='btn btn-primary'
            onClick={handleHashAndSplit}
            disabled={!fileInfo || isHashing}
          >
            {isHashing ? `İşleniyor… ${progress}%` : 'Hashle + Böl'}
          </button>
        </div>

        {isHashing && (
          <div className='progress-bar'>
            <div className='progress-fill' style={{ width: `${progress}%` }} />
          </div>
        )}

        {/* Tam dosya hash'leri */}
        {fileHashes && (
          <table className='results'>
            <thead>
              <tr><th colSpan={3}>Tüm Dosya Hash'leri</th></tr>
              <tr><th>MD5</th><th>SHA-256</th><th>SHA-512</th></tr>
            </thead>
            <tbody>
              <tr>
                <td><code>{fileHashes.md5}</code></td>
                <td><code>{fileHashes.sha256}</code></td>
                <td><code>{fileHashes.sha512}</code></td>
              </tr>
            </tbody>
          </table>
        )}

        {/* Parça hash'leri */}
        {chunkHashes.length > 0 && (
          <table className='results'>
            <thead>
              <tr><th colSpan={4}>1 MB Parça Hash'leri</th></tr>
              <tr><th>Blok #</th><th>MD5</th><th>SHA-256</th><th>SHA-512</th></tr>
            </thead>
            <tbody>
              {chunkHashes.map(r => (
                <tr key={r.idx}>
                  <td>{r.idx}</td>
                  <td><code>{r.md5}</code></td>
                  <td><code>{r.sha256}</code></td>
                  <td><code>{r.sha512}</code></td>
                </tr>
              ))}
            </tbody>
          </table>
        )}

        {/* Kullanıcının indirip saklayabileceği parça dosyaları */}
        {chunks.length > 0 && (
          <div className='chunk-list'>
            <h3>{chunks.length} parça oluşturuldu</h3>
            <ul>
              {chunks.map(c => (
                <li key={c.idx}>
                  <a href={c.url} download={`${fileInfo.name}.part${c.idx}`}>Parça {c.idx} - {(c.size / 1000).toFixed(1)} KB</a>
                </li>
              ))}
            </ul>
          </div>
        )}

        {downloadStatus && <p className='status'>{downloadStatus}</p>}
      </header>
    </div>
  )
}