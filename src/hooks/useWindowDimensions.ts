import { useEffect, useState } from "react";

const useWindowDimensions = () => {
  const setDimensions = useState("")[1];

  useEffect(() => {
    const init = () => {
      console.log("resize");
      setDimensions(window.innerWidth + "_" + window.innerHeight);
    };

    window.addEventListener("orientationchange", init);
    window.addEventListener("resize", init);

    return () => {
      window.removeEventListener("orientationchange", init);
      window.removeEventListener("resize", init);
    };
  }, [setDimensions]);

  return { width: window.innerWidth, height: window.innerHeight };
};

export default useWindowDimensions;
