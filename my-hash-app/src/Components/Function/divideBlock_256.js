export function* divideBlock_256(data ) {
    if (data.length % 64 !== 0) {
      throw new Error('Veri 64 bayt hizasında değil!');
    }
    for (let off = 0; off < data.length; off += 64) {
      yield data.subarray(off, off + 64);
      
    }
  }