import React, { useState } from 'react';
import styles from '@/styles/DropZone.module.css';
import { Upload as UploadIcon } from "lucide-react";
import sleep from "../utils/sleep";

const ImageDropZone = ({ onVideoChange, loading, setLoading, videoURL }) => {

	const [videoState, setVideoState] = useState("Upload the Video");

  const handleDrop = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    const files = e.dataTransfer.files;
    if (files.length) {
      const file = files[0];
      if (file.type.startsWith('video/')) {
				setLoading(true);
				await sleep(3_000);
				setLoading(false);
				setVideoState("Uploaded")
        // Handle the image or video file here
				onVideoChange(file);
      }
    }
  };

  const handleClick = () => {
    document.getElementById('file-input').click();
  };

  const handleChange = async (e) => {
    const file = e.target.files[0];
    if (file.type.startsWith('video/')) {
			setLoading(true);
			await sleep(3_000);
			setLoading(false);
			setVideoState(" Video Uploaded")
      // Handle the image or video file here
			onVideoChange(file);
    }
  };

  return (
    <div 
			id="drop-zone" 
			className={styles.dropZone}
			onClick={handleClick}
			onDragOver={(e) => e.preventDefault()} onDrop={handleDrop}
		>
			{loading ? (
        <div className={styles.loading}>
          <div className={styles.circle}></div>
          <div className={styles.circle}></div>
          <div className={styles.circle}></div>
        </div>
      ) : videoURL ? (
				<video src={videoURL} width={320} height={240} controls/>
			) : (
				<div>
					<input type="file" id="file-input" className={styles.fileInput} accept="video/*" onChange={handleChange} />
					<p>
						<UploadIcon className="icon" />
						{videoState}
					</p>
				</div>
      )}
    </div>
  );
};

export default ImageDropZone;
