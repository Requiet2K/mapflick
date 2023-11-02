import React, { useState, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleRight,faAngleLeft } from "@fortawesome/free-solid-svg-icons";
import "../css/comp.css";

function ImageComparision({ img1, img2 }) {
  const [imageFraq, setImageFraq] = useState(0.5);
  const imgContainer = useRef(undefined);

  const slide = (xPosition) => {
    const x = imgContainer.current.getBoundingClientRect();
    setImageFraq(() => {
      if (xPosition < x.left) return 0;
      else if (xPosition > x.right) return 1;
      else {
        return (xPosition - x.left) / x.width;
      }
    });
  };

  const handleMouseDown = () => {
    window.onmousemove = handleMouseMove;
    window.onmouseup = handleMouseUp;
  };

  const handleMouseMove = (event) => {
    slide(event.clientX);
  };

  const handleMouseUp = (event) => {
    window.onmousemove = undefined;
    window.onmouseup = undefined;
  };

  const handleTouchMove = (event) => {
    slide(event.touches.item(0).clientX);
  };

  return (
    <>
      <div className="compDiv" ref={imgContainer}>
        <img className="img1" src={img1} alt="" />
        <img
          className="img2"
          src={img2}
          alt=""
          style={{
            clipPath: `polygon(0 0,${imageFraq * 100}% 0, ${
              imageFraq * 100
            }% 100%, 0 100%)`,
          }}
        />
        <div
          className="slider"
          style={{
            left: `${imageFraq * 100}%`,
          }}
        >
          <div className="slider-items">
            <div className="bar"></div>
            <div onMouseDown={handleMouseDown} onTouchMove={handleTouchMove} className="handler">
            <FontAwesomeIcon className="slider-next" icon={faAngleLeft} style={{ color: "#ffc107" }} />
            <FontAwesomeIcon className="slider-next" icon={faAngleRight} style={{ color: "#ffc107" }} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ImageComparision;
