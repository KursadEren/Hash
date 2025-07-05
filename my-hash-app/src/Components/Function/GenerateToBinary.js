   export function GenerateToBinary (code) {         // ← code = 0-255
     const binary = code.toString(2).padStart(8, '0');
     return binary;
}   