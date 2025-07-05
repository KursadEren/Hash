export function bitsToBytes(bitString) {
    if (bitString.length % 8 !== 0) {
      throw new Error('Bit dizisi 8’in katı değil!');
    }
  
    const bytes = new Uint8Array(bitString.length / 8);
  
    for (let i = 0; i < bytes.length; i++) {
      const byteBits = bitString.slice(i * 8, (i + 1) * 8); 
      bytes[i] = parseInt(byteBits, 2);                     // "10101100" → 0xAC
    }
    return bytes;
  }
 