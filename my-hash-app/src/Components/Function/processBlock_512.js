// processBlock512.js
import { K_512 } from '../Constants/Sha-512CompParameter.js';
import { BSIG0_512 as Σ0, BSIG1_512 as Σ1, CH_512 as Ch, MAJ_512 as Maj } from '../Utils.js/Sha-512BitUtils.js';

export function processBlock_512(H, W) {
  let [a,b,c,d,e,f,g,h] = H;

  for (let t = 0; t < 80; t++) {
    const T1 = (h + Σ1(e) + Ch(e,f,g) + K_512[t] + W[t]) & 0xffffffffffffffffn;
    const T2 = (Σ0(a) + Maj(a,b,c)) & 0xffffffffffffffffn;

    h = g;
    g = f;
    f = e;
    e = (d + T1) & 0xffffffffffffffffn;
    d = c;
    c = b;
    b = a;
    a = (T1 + T2) & 0xffffffffffffffffn;
  }

  // H güncelle
  H[0] = (H[0] + a) & 0xffffffffffffffffn;
  H[1] = (H[1] + b) & 0xffffffffffffffffn;
  H[2] = (H[2] + c) & 0xffffffffffffffffn;
  H[3] = (H[3] + d) & 0xffffffffffffffffn;
  H[4] = (H[4] + e) & 0xffffffffffffffffn;
  H[5] = (H[5] + f) & 0xffffffffffffffffn;
  H[6] = (H[6] + g) & 0xffffffffffffffffn;
  H[7] = (H[7] + h) & 0xffffffffffffffffn;
}
