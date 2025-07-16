export default function Uploader({ onFileSelected }) {
    return (
      <label style={styles.label}>
        <input
          type="file"
          style={styles.input}
          onChange={e => {
            if (e.target.files.length > 0) {
              onFileSelected(e.target.files[0])
            }
          }}
        />
        Dosya Seç
      </label>
    )
  }
  
  const styles = {
    label: {
      display: 'inline-block',
      padding: '0.6rem 1.2rem',
      border: '2px solid #17a2b8',
      borderRadius: 4,
      background: '#fff',
      color: '#17a2b8',
      fontWeight: 'bold',
      cursor: 'pointer',
      transition: 'background 0.2s',
    },
    input: {
      display: 'none'
    }
  }