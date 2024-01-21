import React, { useEffect, useRef, useState } from "react";
import jsQR from "jsqr";

const QRScanner = ({ onScan }) => {
  const videoRef = useRef(null);
  const [scannedData, setScannedData] = useState(null);

  useEffect(() => {
    const startCamera = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: true,
        });

        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      } catch (error) {
        console.error("Error accessing camera:", error);
      }
    };

    startCamera();

    const handleAnimationFrame = () => {
      if (
        videoRef.current &&
        videoRef.current.videoWidth > 0 &&
        videoRef.current.videoHeight > 0
      ) {
        const canvas = document.createElement("canvas");
        const context = canvas.getContext("2d");

        canvas.width = videoRef.current.videoWidth;
        canvas.height = videoRef.current.videoHeight;
        context.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);

        const imageData = context.getImageData(
          0,
          0,
          canvas.width,
          canvas.height
        );
        const code = jsQR(imageData.data, imageData.width, imageData.height);

        if (code) {
          setScannedData(code.data); // Set the scanned data state
          onScan(code.data); // Trigger the onScan callback with the scanned data
        }
      }

      requestAnimationFrame(handleAnimationFrame);
    };


    // Start the animation frame loop
    requestAnimationFrame(handleAnimationFrame);

    return () => {
      // Clean up: stop the camera when the component unmounts
      const tracks = videoRef.current?.srcObject?.getTracks();
      if (tracks) {
        tracks.forEach((track) => track.stop());
      }
    };
  }, [onScan]); // Include onScan in the dependency array

  return (
    <div>
      <video
        ref={videoRef}
        autoPlay
        playsInline
        style={{ width: "100%", maxWidth: "500px", margin: "auto" }}
      />
      {scannedData && (
        <div>
          <p>Scanned Data: {scannedData}</p>
        </div>
      )}
    </div>
  );
};

export default QRScanner;
