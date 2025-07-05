// src/Components/makeSchedule_512.js
import {
    SSIG0_512 ,   // küçük sigma-0
    SSIG1_512     // küçük sigma-1
  } from '../Utils.js/Sha-512BitUtils';
  
  /**
   * 128-baytlık blok → 80×64-bit W tablosu (W₀…W₇₉)
   */
  export function makeSchedule_512(block) {
    const W = new Array(80).fill(0n);
    const view = new DataView(block.buffer, block.byteOffset, block.byteLength);
  
    // W₀…W₁₅ = bloktaki 16×64-bit big-endian kelime
    for (let i = 0; i < 16; i++) {
      W[i] = view.getBigUint64(i * 8, false);
    }
  
    // W₁₆…W₇₉ = σ₁(W[t-2]) + W[t-7] + σ₀(W[t-15]) + W[t-16] (mod 2⁶⁴)
    for (let t = 16; t < 80; t++) {
      W[t] = (
        SSIG1_512(W[t - 2]) +
        W[t - 7]    +
        SSIG0_512(W[t - 15]) +
        W[t - 16]
      ) & 0xffffffffffffffffn;  // & maskesiyle 64-bit taşmayı atıyoruz
    }
  
    return W;
  }
  