
export function downloadRandomDummyFile(sizeMB, charToUse = 'A') {
    const BYTES_IN_MB = 1000 * 1000;
    const sizeBytes   = sizeMB * BYTES_IN_MB;
  
    // Maksimum string dilim boyutu: 64 KB (bellek optimizasyonu)
    const SLICE = 64 * 1000;
    const sliceStr = charToUse.repeat(SLICE);
  
    const parts = [];
    let remain  = sizeBytes;
  
    // Belleği verimli kullanmak için 64 KB'lık metin dilimleri ekle
    while (remain >= SLICE) {
      parts.push(sliceStr);
      remain -= SLICE;
    }
    if (remain > 0) parts.push(charToUse.repeat(remain));
  
    // Metin dosyasını Blob olarak oluştur (UTF‑8)
    const blob = new Blob(parts, { type: 'text/plain;charset=utf-8' });
    triggerDownload(blob, `dummy_${sizeMB}MB.txt`);
  }
  
  // İndirmeyi tetikleyen yardımcı
  function triggerDownload(blob, filename) {
    const url = URL.createObjectURL(blob);
    const a   = document.createElement('a');
    a.href        = url;
    a.download    = filename;
    a.style.display = 'none';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }
  