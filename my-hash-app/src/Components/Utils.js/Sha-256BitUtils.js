// Döngüsel / mantıksal kaydırmalar
export const ROTR = (x, n) => (x >>> n) | (x << (32 - n));
export const SHR  = (x, n) => x >>> n;

// Büyük sigma’lar (RFC 6234 §5.1)
export const BSIG0 = x => ROTR(x, 2)  ^ ROTR(x, 13) ^ ROTR(x, 22);
export const BSIG1 = x => ROTR(x, 6)  ^ ROTR(x, 11) ^ ROTR(x, 25);

// Küçük sigma’lar
export const SSIG0 = x => ROTR(x, 7)  ^ ROTR(x, 18) ^ SHR(x, 3);
export const SSIG1 = x => ROTR(x, 17) ^ ROTR(x, 19) ^ SHR(x, 10);

// Mantıksal seçim & çoğunluk
export const CH  = (x, y, z) => (x & y) ^ (~x & z);
export const MAJ = (x, y, z) => (x & y) ^ (x & z) ^ (y & z);
