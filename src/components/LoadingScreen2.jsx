import React, { useState, useEffect } from "react";
import Loading from "react-loading";

function LoadingScreen({ className }) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prevProgress) => prevProgress + 1);
    }, 100);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <div className={`loading2 ${className}`}>
      <div className="loading-icon">
        <Loading
          type="spin"
          color={"#ffffff"}
          width={50}
          progress={progress}
        />
      </div>
    </div>
  );
}

export default LoadingScreen;