import { SSIG0, SSIG1 } from '../Utils.js/Sha-256BitUtils';   


 
export function makeSchedule_256(block) {
  const W = new Uint32Array(64);

  for (let i = 0; i < 16; i++) {
  
    W[i] =
      (block[i * 4]     << 24) |      // B0 << 24
      (block[i * 4 + 1] << 16) |      // B1 << 16
      (block[i * 4 + 2] <<  8) |      // B2 <<  8
       block[i * 4 + 3];              // B3
   
  }

  for (let t = 16; t < 64; t++) {
   
    W[t] = (
      SSIG1(W[t -  2]) +   // σ1
      W[t -  7]        +   // 7 kelime gerideki ham/türetilmiş değer
      SSIG0(W[t - 15]) +   // σ0
      W[t - 16]            // 16 kelime gerideki değer
    ) >>> 0;               
  }

  return W;  
}
