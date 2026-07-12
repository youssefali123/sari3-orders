import { useEffect, useRef } from "react";

const Ad = () => {
  const adRef = useRef(null);

  useEffect(() => {
    // Set Adsterra options
    (window as any).atOptions = {
      key: "f4fe752d2b50062587b5ddc95f1fbdb4",
      format: "iframe",
      height: 60,
      width: 468,
      params: {},
    };

    // Create script
    const script = document.createElement("script");
    script.src =
      "https://www.highperformanceformat.com/f4fe752d2b50062587b5ddc95f1fbdb4/invoke.js";
    script.async = true;

    adRef.current.appendChild(script);

    return () => {
      if (adRef.current) {
        adRef.current.innerHTML = "";
      }
    };
  }, []);

  return (
    <div style={{
      width:"100%",
      overflow: "hidden"
    }}>
    <div
      
      ref={adRef}
      style={{
        width: "468px",
        height: "60px",
      }}
    />
    </div>
  );
};

export const Ad2 = () => {
  const adRef = useRef(null);

  useEffect(() => {
    // Set Adsterra options
    (window as any).atOptions = {
      key: "2a6014fc45b670959a6a94c3d8fef5c7",
      format: "iframe",
      height: 60,
      width: 468,
      params: {},
    };

    // Create script
    const script = document.createElement("script");
    script.src =
      "https://www.highperformanceformat.com/2a6014fc45b670959a6a94c3d8fef5c7/invoke.js";
    script.async = true;

    adRef.current.appendChild(script);

    return () => {
      if (adRef.current) {
        adRef.current.innerHTML = "";
      }
    };
  }, []);

  return (
    <div style={{
      width:"100%",
      overflow: "hidden"
    }}>
    <div
      
      ref={adRef}
      style={{
        width: "468px",
        height: "60px",
      }}
    />
    </div>
  );
};

export default Ad;