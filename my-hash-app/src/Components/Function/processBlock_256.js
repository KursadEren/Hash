

import { K_256 } from '../Constants/Sha-256CompParameter.js';
import {                        
                       
  BSIG0, BSIG1,               
  CH, MAJ                      
} from '../Utils.js/Sha-256BitUtils.js';

/**
 * @param {Uint32Array} H  
 * @param {Uint32Array} W  
 */
export function processBlock_256 (H, W) {

  let [a, b, c, d, e, f, g, h] = H;

  /* 2️⃣ 64 tur döngüsü */
  for (let t = 0; t < 64; t++) {
    // --- ara toplamlar ---
    const T1 = (
      h + BSIG1(e) + CH(e, f, g) + K_256[t] + W[t]
    ) >>> 0;                      // mod 2³²

    const T2 = (
      BSIG0(a) + MAJ(a, b, c)
    ) >>> 0;

    // --- sekiz kayıtı sağa kaydır ---
    h = g;
    g = f;
    f = e;
    e = (d + T1) >>> 0;
    d = c;
    c = b;
    b = a;
    a = (T1 + T2) >>> 0;
  }

  /* 3️⃣ Blok sonu — iç durumu (H) yerinde güncelle */
  H[0] = (H[0] + a) >>> 0;
  H[1] = (H[1] + b) >>> 0;
  H[2] = (H[2] + c) >>> 0;
  H[3] = (H[3] + d) >>> 0;
  H[4] = (H[4] + e) >>> 0;
  H[5] = (H[5] + f) >>> 0;
  H[6] = (H[6] + g) >>> 0;
  H[7] = (H[7] + h) >>> 0;
}
