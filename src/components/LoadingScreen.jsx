import React, { useState, useEffect } from "react";
import Loading from "react-loading";

function LoadingScreen({ className }) {
  const [progress, setProgress] = useState(0.5);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prevProgress) => prevProgress + 1);
    }, 100);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <div className={`loading ${className}`}>
      <div className="loading-icon">
        <Loading
          type="bars"
          color={"#21D0F3"}
          height={15}
          width={100}
          progress={progress}
        />
      </div>
    </div>
  );
}

export default LoadingScreen;