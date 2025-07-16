import { SHA_256 } from "./calculateSha-256";
import { SHA_512 } from "./calculateSha-512";
const processFile = async () => {
    const buf   = await fileInfo.arrayBuffer();
    const bytes = new Uint8Array(buf);
    const CHUNK = 1 * 1024 * 1024;
  
    const blocks = chunkBytes(bytes, CHUNK);
    for (let i = 0; i < blocks.length; i++) {
      const block = blocks[i];
      SHA_512()
      SHA_256()
    }
  };

  export default processFile;
  