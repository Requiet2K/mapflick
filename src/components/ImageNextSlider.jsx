import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleRight, faAngleLeft } from "@fortawesome/free-solid-svg-icons";
import { Blurhash } from "react-blurhash";
import LoadingScreen2 from "./LoadingScreen2";

function ImageSlider({ maps, className, hash }) {
  const slides = [...maps];
  const [currentIndex, setCurrentIndex] = useState(0);
  const [imageLoaded,setImageLoaded] = useState(false);
  const [loadingAnother, setLoadingAnother] = useState(false);

  const handleNextClick = () => {
    setLoadingAnother(true);
    const checking = currentIndex === slides.length - 1;
    const newIndex = checking ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  };

  const handleBackClick = () => {
    setLoadingAnother(true);
    const checking = currentIndex === 0;
    const newIndex = checking ? slides.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  };

  const handleDot = (index) => {
    setCurrentIndex(index);
  };

  useEffect(()=>{
    const img = new Image();
    img.onload = () => {
      setImageLoaded(true);
      setLoadingAnother(false);
    }
    img.src = slides[currentIndex];
  },[handleNextClick,handleBackClick]);

  let dontShow = false;
  if(className == "homeSlider"){
    dontShow = true;                // ayarla burayı
  }

  return (
    <div className="image-slider"> 
    {(!imageLoaded && hash) && (<Blurhash hash={hash} className="hash" resolutionX={32} resolutionY={32} punch={1}/>)}
    {(imageLoaded && !loadingAnother) && (<img className="home-image" src={slides[currentIndex]}/>)}
    {loadingAnother && <LoadingScreen2 className="hash" />}
      <button onClick={handleNextClick} className={`nextButton ${className} ${loadingAnother ? "displaynone" : ""}`}>
        <FontAwesomeIcon  
          className={`next-font ${className}`}
          icon={faAngleRight}
        />
      </button>
      <button
        onClick={handleBackClick}
        className={`previousButton ${className} ${loadingAnother ? "displaynone" : ""}`}
      >
        <FontAwesomeIcon
          className={`next-font ${className}`}
          icon={faAngleLeft}
        />
      </button>
      <div className={`dots ${className} ${loadingAnother ? "displaynone" : ""}`}>
        {slides.map((slide, index) => {
          return (
            <p
              key={index}
              onClick={() => handleDot(index)}
              className={`dot-bar ${className} ${currentIndex === index ? "active" : ""}`}
            >
              -
            </p>
          );
       
        })}
        </div>
      </div>
    );
  }
  
  export default ImageSlider;
  