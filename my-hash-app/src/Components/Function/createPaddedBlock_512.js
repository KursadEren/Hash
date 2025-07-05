
import { findZeroCount_512 } from "./findZeroCount_512";
import { GenerateToBinary } from "./GenerateToBinary";
export function createPaddedBlock_512(text) {
  // 1) Mesajı 8-bit’lik ikili stringe çevir
  let bits = '';
  let Zeros=0;
  for (let i = 0; i < text.length; i++) {
    bits += GenerateToBinary(text.charCodeAt(i));
  }

  // 2) "1" biti ve "0" bitlerini ekle
  bits += '1';
  Zeros = findZeroCount_512(bits)
  for (let a = 0; a < Zeros; a++) {
    bits += 0
  }
  bits += ( (text.length * 8).toString(2).padStart(128, '0') );

  return bits;  // string uzunluğu tam 1024’ün katı
}
