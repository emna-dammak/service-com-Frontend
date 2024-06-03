// PdfImageExtractor.js
import React, { useEffect, useState } from 'react';
import * as pdfjsLib from 'pdfjs-dist';
import 'pdfjs-dist/web/pdf_viewer.css';

pdfjsLib.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.js`;

const PdfImageExtractor = ({ pdfUrl }) => {
  const [imageSrc, setImageSrc] = useState(null);

  useEffect(() => {
    const loadPdf = async () => {
      const loadingTask = pdfjsLib.getDocument(pdfUrl);
      const pdf = await loadingTask.promise;
      const page = await pdf.getPage(1);
      const scale = 3; // Increase the scale factor for higher resolution
      const viewport = page.getViewport({ scale });

      const canvas = document.createElement('canvas');
      const context = canvas.getContext('2d');
      canvas.height = viewport.height;
      canvas.width = viewport.width;

      await page.render({ canvasContext: context, viewport }).promise;

      const imageData = canvas.toDataURL('image/png');
      setImageSrc(imageData);
    };

    loadPdf();
  }, [pdfUrl]);

  return (
    <div>
      {imageSrc ? (
        <img src={imageSrc} alt="Extracted from PDF" style={{ width: 'auto', height: '650px', border:'2px solid #888888', borderRadius: '10px'}} />
      ) : (
        <p>Loading image...</p>
      )}
    </div>
  );
};

export default PdfImageExtractor;
