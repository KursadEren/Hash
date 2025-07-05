export function* divideBlock_512(data) {
    if (data.length % 128 !== 0) {
      throw new Error('Veri 128 bayt hizasında değil!');
    }
    for (let off = 0; off < data.length; off += 128) {
      yield data.subarray(off, off + 128);
    }
  }
  