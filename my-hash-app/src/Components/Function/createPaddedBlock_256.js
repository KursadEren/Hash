import { findZeroCount_256 } from "./findZeroCount_256";
import { GenerateToBinary } from "./GenerateToBinary"
export function createPaddedBlock_256(text, Type) {
  let BinaryText = "";
  let Zeros;
  console.log(text.length)
  if (Type === 256) {

    for (let i = 0; i < text.length; i++) {

      BinaryText += GenerateToBinary(text.charCodeAt(i))

    }
    BinaryText += '1';
    Zeros = findZeroCount_256(BinaryText);
    
    for (let a = 0; a < Zeros; a++) {
      BinaryText += 0
    }
   
    const L = text.length * 8;
    const lenBinary64 = L
      .toString(2)
      .padStart(64, '0');
    BinaryText += lenBinary64;
   

  } else if (Type === 512) {

    for (let i = 0; i < text.length; i++) {
      // Örneğin:
      BinaryText += GenerateToBinary(text[i])

    }
  }

  return BinaryText
}