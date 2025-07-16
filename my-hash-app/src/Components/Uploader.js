import React, { useRef, useState } from 'react'
import './UploaderBox.css';

export default function Uploader({onFileSelected}) {
    const [isDragOver, setIsDragOver] = useState("")
    const inputRef = useRef();
    const handleDragOver = e => {
        e.preventDefault();
        setIsDragOver(true)
    }
    const handleDragLeave = e =>{
        e.preventDefault()
        setIsDragOver(false)
    }
    const handleDrop = e => {
        e.preventDefault()
        setIsDragOver(false);
        const file = e.dataTransfer.files[0];
        if(file) 
        onFileSelected(file);
    }
    const handleClick = () => {
        inputRef.current.click();
      };
      const handleChange = e => {
        const file = e.target.files[0];
        if (file) onFileSelected(file);
      };
      return (
        <div className='Container'>
        <div
          className={`upload-box${isDragOver ? ' drag-over' : ''}`}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={handleClick}
        >
          <input
            ref={inputRef}
            type="file"
            onChange={handleChange}
            style={{ display: 'none' }}
          />
          <div className="upload-content">
            <div className="icon">📂</div>
            <div className="primary-text">
              Drag &amp; Drop&nbsp;
              <span className="browse">or browse</span>
            </div>
            <div className="support-text">Supports any file type</div>
          </div>
        </div>
        </div>
      );
}

