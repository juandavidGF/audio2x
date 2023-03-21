import React, { useState } from 'react';
import styles from '@/styles/DropZone.module.css';
import { Upload as UploadIcon } from "lucide-react";

const ImageDropZone = ({ onVideoChange }) => {

	const [videoState, setVideoState] = useState("Upload the Video");


  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();

    const files = e.dataTransfer.files;
    if (files.length) {
      const file = files[0];
      if (file.type.startsWith('video/')) {
				setVideoState("Uploaded")
        // Handle the image or video file here
				onVideoChange(file);
      }
    }
  };

  const handleClick = () => {
    document.getElementById('file-input').click();
  };

  const handleChange = (e) => {
    const file = e.target.files[0];
    if (file.type.startsWith('video/')) {
			setVideoState("Uploaded")
      // Handle the image or video file here
			onVideoChange(file);
    }
  };

  return (
    <div id="drop-zone" className={styles.dropZone} onClick={handleClick} onDragOver={(e) => e.preventDefault()} onDrop={handleDrop}>
      <input type="file" id="file-input" className={styles.fileInput} accept="video/*" onChange={handleChange} />
      <p>
				<UploadIcon className="icon" />
				{videoState}
			</p>
    </div>
  );
};

export default ImageDropZone;
