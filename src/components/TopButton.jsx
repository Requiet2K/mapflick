import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleUp } from '@fortawesome/free-solid-svg-icons';

function TopButton({className}) {
  const [topButton, setTopButton] = useState(false);
  const [triggerAnimation, setTriggerAnimation] = useState(false);
  const [isAtBottom, setIsAtBottom] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) {
        setTopButton(true);
      } else {
        setTopButton(false);
      }
      if (
        window.innerHeight + window.scrollY >=
        document.body.offsetHeight - 130
      ) {
        setIsAtBottom(true);
      } else {
        setIsAtBottom(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleTopButton = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  const handleMouseEnter = () => {
    setTriggerAnimation(true);
  };

  const handleMouseLeave = () => {
    setTriggerAnimation(false);
  };

  const styleBottom = () => {
    if(className == "home-top"){
      return "black";
    }
    if(className == "footer-top"){
      return "white";
    }
  }

  return (
    <div>
      {topButton && (
        <button onClick={handleTopButton} className={`back-to-up ${className}`}>
          <FontAwesomeIcon
            size="2xl"
            icon={faCircleUp}
            style={{ color: isAtBottom ? styleBottom() : 'black' }}
            className={`animate__animated ${
              triggerAnimation ? 'animate__bounce' : ''
            }`}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          />
        </button>
      )}
    </div>
  );
}

export default TopButton;