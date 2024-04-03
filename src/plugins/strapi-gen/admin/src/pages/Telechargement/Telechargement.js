import React from 'react';
import { MdFileDownload } from 'react-icons/md';
import html2canvas from 'html2canvas';
import { saveAs } from 'file-saver';

const Telechargement = ({ content }) => {
  const handleDownload = async (extension) => {
    const fileName = 'interface_overview' + extension;

    if (extension === '.pdf') {
      const canvas = await html2canvas(content);
      const dataURL = canvas.toDataURL();
      saveAs(dataURL, fileName);
    } else if (extension === '.jpg') {
      const canvas = await html2canvas(content);
      const dataURL = canvas.toDataURL('image/jpeg', 1.0);
      saveAs(dataURL, fileName);
    }
  };

  return (
    <div>
      <button onClick={() => handleDownload('.pdf')}>
        <MdFileDownload size={20} />
        .pdf
      </button>
      <button onClick={() => handleDownload('.jpg')}>
        <MdFileDownload size={20} />
        .jpg
      </button>
    </div>
  );
};

export default Telechargement;