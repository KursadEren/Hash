import {H_INIT_512} from "../Constants/Sha-512CompParameter"
import { bitsToBytes } from "./bitsToBayt";
import {divideBlock_512} from "./divideBlock_512"
import  {makeSchedule_512} from "./makeSchedule_512"
import { processBlock_512 } from "./processBlock_512";
import { createPaddedBlock_512 } from "./createPaddedBlock_512";
export function SHA_512(text){
    const H = Array.from(H_INIT_512);
    const paddedBytes = createPaddedBlock_512(text);
    const BaytText = bitsToBytes(paddedBytes);
    const blocks      = divideBlock_512(BaytText);
    console.log(blocks,"blocks")
    for (const block of blocks) {
      const W = makeSchedule_512(block);             
      processBlock_512(H, W);                      
    }

    return  [...H]
      .map(x => x.toString(16).padStart(16, '0'))
      .join('');
      

  }