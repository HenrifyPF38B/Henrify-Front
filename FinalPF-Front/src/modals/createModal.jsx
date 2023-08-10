import React, { useState } from 'react'

  const imagesMoPerPage = 4;
 

export const ImageModal = ({ isOpen, onImageClick, images, onClose }) => {
  const [currentPageModal, setCurrentPageModal] = useState(1);
  if (!isOpen) {
    return null;
  }
  const handleNextPage = () => {
    if (currentPageModal < Math.ceil(images.length / imagesMoPerPage)) {
      setCurrentPageModal((prevPage) => prevPage + 1);
    } else {
      setCurrentPageModal(1); // volver a la primera pagina
    }
  };
  const handlePrevPage = () => {
    if (currentPageModal > 1) {
      setCurrentPageModal((prevPage) => prevPage - 1);
    } else {
      setCurrentPageModal(Math.ceil(images.length / imagesMoPerPage)); // volver a la primera pagina
    }
  };

  const startIndex = (currentPageModal - 1) * imagesMoPerPage;
  const endIndex = startIndex + imagesMoPerPage;
  const imagesToShow = images.slice(startIndex, endIndex);

  return (
    <div className="imgMo" onClick={onClose}>  
      <div className="imgMo-content" onClick={(e) => e.stopPropagation()}>
      <span className="modal-description">Select an image:</span>      
      <div className="image-container">
      <button className="btnprev" onClick={handlePrevPage}>
        <i class="fa-solid fa-angles-left" style={{ color: "#ffffff" }}></i>
      </button> 
       {imagesToShow.map((image, index) => (
          <img
            key={index}
            src={image}
            onClick={() => onImageClick(image)}
            alt={`image_${index}`}
          />
        ))}        
        <button className="btnprev" onClick={handleNextPage}>
        <i class="fa-solid fa-angles-right" style={{ color: "#ffffff" }}></i>
        </button>
      </div>
    </div>
    </div>
  );
};