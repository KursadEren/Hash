import {H_INIT_256} from "../Constants/Sha-256CompParameter"
import { createPaddedBlock_512 } from "./createPaddedBlock_512";
import {bitsToBytes} from "./bitsToBayt"
import {divideBlock_256} from "./divideBlock_256"
import {makeSchedule_256} from "./makeSchedule_256"
import {processBlock_256} from "./processBlock_256"

export function SHA_256(text) 
   
  {
    
    const H = Uint32Array.from(H_INIT_256);
    const BinaryText = createPaddedBlock_512(text, 256);
    console.log(BinaryText)
    const BaytText = bitsToBytes(BinaryText);
    const blocks = divideBlock_256(BaytText);
    console.log(blocks,"blocks")
    for (const block of blocks) {
      const W = makeSchedule_256(block);             
      processBlock_256(H, W);                      
    }

    return [...H]
      .map(x => x.toString(16).padStart(8, '0'))
      .join('');
      

  
  }