export default function FileInput({ onFileRead, accept = '*' }) {
    const handleChange = async e => {
      const file = e.target.files[0];
      if (!file) return;
  
      if (file.name.endsWith('.pgp')) {
    
        const text = await file.text();
        onFileRead({ file, name: file.name, data: text });
      } else {
    
        const buf = await file.arrayBuffer();
        onFileRead({ file, name: file.name, data: buf });
      }
    };
  
    return <input type="file" accept={accept} onChange={handleChange} />;
  }
  