import React, { useEffect, useRef, useState } from "react";
import jsQR from "jsqr";

const QRScanner = ({ onScan }) => {
  const videoRef = useRef(null);
  const [scannedData, setScannedData] = useState(null);

  useEffect(() => {
    let videoElement = null; // Store the video element for cleanup

    const startCamera = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: {facingMode:'environment'},
        });

        videoElement = videoRef.current; // Capture the current video element
        videoElement.srcObject = stream;
      } catch (error) {
        console.error("Error accessing camera:", error);
      }
    };

    startCamera();

    const handleAnimationFrame = () => {
      if (
        videoElement &&
        videoElement.videoWidth > 0 &&
        videoElement.videoHeight > 0
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
          setScannedData(code.data);
          console.log(code.data)
        }
      }

      requestAnimationFrame(handleAnimationFrame);
    };

    requestAnimationFrame(handleAnimationFrame);

    return () => {
      // Clean up using the captured video element
      const tracks = videoElement?.srcObject?.getTracks();
      if (tracks) {
        tracks.forEach((track) => track.stop());
      }
    };
  }, []);

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
