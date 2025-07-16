export function downloadRandomDummyFile(sizeMB = 100) {
    const chunkSize = 64 * 1024;              // Web Crypto limiti için 64KB
    const chunks    = [];
    const rnd       = new Uint8Array(chunkSize);
  
    for (let i = 0; i < (sizeMB * 1024 * 1024) / chunkSize; i++) {
      window.crypto.getRandomValues(rnd);
      chunks.push(rnd.slice());
    }
  
    const blob = new Blob(chunks, { type: 'application/octet-stream' });
    const url  = URL.createObjectURL(blob);
    const a    = document.createElement('a');
    a.href     = url;
    a.download = `dummy_random_${sizeMB}MB.bin`;
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
  }
  