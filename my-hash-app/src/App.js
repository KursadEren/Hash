// src/App.js
import React, { useEffect, useState } from 'react';
import './App.css';
// SHA-256 modülleri
import { createPaddedBlock_256 } from './Components/Function/createPaddedBlock_256';
import { bitsToBytes }          from './Components/Function/bitsToBayt';
import { divideBlock_256 }     from './Components/Function/divideBlock_256';
import { makeSchedule_256 }     from './Components/Function/makeSchedule_256';
import { processBlock_256 }     from './Components/Function/processBlock_256';
import { H_INIT_256 }           from './Components/Constants/Sha-256CompParameter';

// SHA-512 modülleri
import { createPaddedBlock_512 }  from './Components/Function/createPaddedBlock_512'
import { divideBlock_512 }       from './Components/Function/divideBlock_512';
import { makeSchedule_512 }       from './Components/Function/makeSchedule_512';
import { processBlock_512 }       from './Components/Function/processBlock_512';
import { H_INIT_512 }             from './Components/Constants/Sha-512CompParameter';


function App() {
  const [digest_256, setDigest_256] = useState("");
  const [digest_512, setDigest_512] = useState("");
  useEffect(() => {
    SHA_256();
    SHA_512();
  }, [])

  function SHA_512(){
    const H = Array.from(H_INIT_512);
    const text = "abcdffabcdffabcdffabcdffabcdffabcdffabcdffabcdffabcdffabcdffabcdffabcdffabcdffabcdffabcdffabcdffabcdffabcdffabcdffabcdffabcdffabcdffabcdff"
    const paddedBytes = createPaddedBlock_512(text);
    const BaytText = bitsToBytes(paddedBytes);
    const blocks      = divideBlock_512(BaytText);
    console.log(blocks,"blocks")
    for (const block of blocks) {
      const W = makeSchedule_512(block);             
      processBlock_512(H, W);                      
    }

    const hex = [...H]
      .map(x => x.toString(16).padStart(16, '0'))
      .join('');
      setDigest_512(hex);

  }
  

  function SHA_256() 
  {
    
    const H = Uint32Array.from(H_INIT_256);
    const text = "abcdffabcdffabcdffabcdffabcdffabcdffabcdffabcdffabcdffabcdffabcdffabcdffabcdffabcdffabcdffabcdffabcdffabcdffabcdffabcdffabcdffabcdffabcdff"
    const BinaryText = createPaddedBlock_256(text, 256);
    console.log(BinaryText)
    const BaytText = bitsToBytes(BinaryText);
    const blocks = divideBlock_256(BaytText);
    console.log(blocks,"blocks")
    for (const block of blocks) {
      const W = makeSchedule_256(block);             
      processBlock_256(H, W);                      
    }

    const hex = [...H]
      .map(x => x.toString(16).padStart(8, '0'))
      .join('');
      setDigest_256(hex);

  
  }
  return (
    <div className="App">
      <header className="App-header">
        <h2>SHA-256 Özet</h2>
     
        <code style={{ wordBreak: 'break-all' }}>{digest_256}</code>
        <h2>SHA-512 Özet</h2>
     
     <code style={{ wordBreak: 'break-all' }}>{digest_512}</code>
      </header>
    </div>
  );
}


export default App;
