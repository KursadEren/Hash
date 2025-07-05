// Bit-utils-64.js
export const ROTR64 = (x, n) =>
  ((x >> BigInt(n)) | (x << BigInt(64 - n))) & BigInt("0xFFFFFFFFFFFFFFFF");

export const SHR64 = (x, n) =>
  x >> BigInt(n);

// Büyük sigma’lar (Σ₀, Σ₁) — 64-bit versiyon
export const BSIG0_512 = x =>
  ROTR64(x, 28) ^ ROTR64(x, 34) ^ ROTR64(x, 39);
export const BSIG1_512 = x =>
  ROTR64(x, 14) ^ ROTR64(x, 18) ^ ROTR64(x, 41);

// Küçük sigma’lar (σ₀, σ₁)
export const SSIG0_512 = x =>
  ROTR64(x, 1)  ^ ROTR64(x, 8)  ^ SHR64(x, 7);
export const SSIG1_512 = x =>
  ROTR64(x, 19) ^ ROTR64(x, 61) ^ SHR64(x, 6);

// Ch & Maj aynen ama BigInt ile
export const CH_512  = (x, y, z) => (x & y) ^ (~x & z);
export const MAJ_512 = (x, y, z) => (x & y) ^ (x & z) ^ (y & z);
