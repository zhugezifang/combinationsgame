// components/ImageSplitter.js
import React, { useState } from 'react';
import JSZip from 'jszip';
import { saveAs } from 'file-saver';

const ImageSplitter = ({
  locale = '',
  indexLanguageText
  }) => {
  const [image, setImage] = useState(null);
  const [rows, setRows] = useState(3);
  const [cols, setCols] = useState(3);
  const [chunks, setChunks] = useState([]);

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = (e) => {
      setImage(e.target.result);
    };
    reader.readAsDataURL(file);
  };

  const handleSplitAndDisplay = () => {
    if (!image) return;

    const img = new Image();
    img.src = image;
    img.onload = () => {
      const { width, height } = img;
      const chunkWidth = Math.floor(width / cols);
      const chunkHeight = Math.floor(height / rows);

      const newChunks = [];

      for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
          const canvas = document.createElement('canvas');
          const ctx = canvas.getContext('2d');
          canvas.width = chunkWidth;
          canvas.height = chunkHeight;

          ctx.drawImage(
            img,
            col * chunkWidth,
            row * chunkHeight,
            chunkWidth,
            chunkHeight,
            0,
            0,
            chunkWidth,
            chunkHeight
          );

          newChunks.push(canvas.toDataURL('image/png'));
        }
      }

      setChunks(newChunks);
    };
  };

  const handleDownload = () => {
    const zip = new JSZip();

    chunks.forEach((chunk, index) => {
      const base64Data = chunk.split(',')[1];
      zip.file(`chunk_${index}.png`, base64Data, { base64: true });
    });

    zip.generateAsync({ type: 'blob' }).then((content) => {
      saveAs(content, 'image_chunks.zip');
    });
  };

  return (
              <div
                className={"w-[100%] mx-auto rounded-tl-[30px] rounded-tr-[30px] object-fill"} >
                        <iframe src="https://combinations.org/" allow="autoplay"  style={{ top: '0px', left: '0px',width: '100%', height: '1000px'}}></iframe>

              </div>
            
    

  );
};

export default ImageSplitter;