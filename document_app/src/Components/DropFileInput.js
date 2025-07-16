// DropFileInput.jsx
import React, { useRef, useState } from 'react';
import PropTypes from 'prop-types';
import './drop-file-input.css';

const DropFileInput = props => {
  const wrapperRef = useRef(null);
  const [fileList, setFileList] = useState([]);

  const onDragEnter = () => wrapperRef.current.classList.add('dragover');
  const onDragLeave = () => wrapperRef.current.classList.remove('dragover');
  const onDrop = () => wrapperRef.current.classList.remove('dragover');

  const onFileDrop = e => {
    const newFiles = Array.from(e.target.files);     // get all selected files
    if (newFiles.length) {
      const updatedList = [...fileList, ...newFiles];
      setFileList(updatedList);
      props.onFileChange(updatedList);
    }
    // Clear the input so the same file(s) can be re-selected if needed
    e.target.value = null;
  };

  const fileRemove = file => {
    const updatedList = fileList.filter(f => f !== file);
    setFileList(updatedList);
    props.onFileChange(updatedList);
  };

  return (
    <>
      <div
        ref={wrapperRef}
        className="drop-file-input"
        onDragEnter={onDragEnter}
        onDragLeave={onDragLeave}
        onDrop={onDrop}
      >
        <div className="drop-file-input__label">
          <img
            src="https://media.geeksforgeeks.org/wp-content/uploads/20240308113922/Drag-.png"
            alt="drag icon"
          />
          <p>Drag & Drop your files here</p>
        </div>
        <input
          type="file"
          multiple                              // ← allow multiselect
          onChange={onFileDrop}
          // no `value` prop so the input can reset
        />
      </div>

      {fileList.length > 0 && (
        <div className="drop-file-preview">
          <p className="drop-file-preview__title">Ready to upload</p>
          {fileList.map((item, index) => (
            <div key={index} className="drop-file-preview__item">
              <div className="drop-file-preview__item__info">
                <p>{item.name}</p>
                <p>{item.size.toLocaleString()} B</p>
              </div>
              <span
                className="drop-file-preview__item__del"
                onClick={() => fileRemove(item)}
              >
                ×
              </span>
            </div>
          ))}
        </div>
      )}
    </>
  );
};

DropFileInput.propTypes = {
  onFileChange: PropTypes.func
};

export default DropFileInput;
