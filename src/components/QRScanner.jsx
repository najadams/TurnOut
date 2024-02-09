import "./QRScanner.css";
import React, { useEffect, useRef, useState } from "react";
import jsQR from "jsqr";
import { API_BASE_URL } from "../containers";

const QRScanner = ({ onScan }) => {
  const videoRef = useRef(null);
  const [scannedData, setScannedData] = useState(null);
  const [serverQRCodeData, setServerQrCodeData] = useState(null);
  const [mark, setMark] = useState(false)
  // Example client-side code using fetch
  const markUserAsPresent = async (userID) => {
    try {
      const response = await fetch(`${API_BASE_URL}/markUserAsPresent`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userID: userID,
        }),
      });

      if (response.ok) {
        const result = await response.json();
        console.log(result.message);
      } else {
        console.error("Server response not OK");
      }
    } catch (error) {
      console.error("Error marking user as present:", error);
    }
  };

  useEffect(() => {
    let videoElement = null; // Store the video element for cleanup

    const startCamera = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: "environment" },
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
          if (onScan) {
            onScan(code.data);
          }
        }
      }

      requestAnimationFrame(handleAnimationFrame);
    };

    requestAnimationFrame(handleAnimationFrame);

    const fetchQRCodeData = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/getQRCodeData`);
        if (response.ok) {
          const result = await response.json();
          setServerQrCodeData(result.data.qrCodeData);
        } else {
          console.error("Server response not OK");
        }
      } catch (error) {
        console.error("Error fetching QR code data:", error);
      }
    };
    // Call the function to fetch QR code data
    fetchQRCodeData();

    return () => {
      // Clean up using the captured video element
      const tracks = videoElement?.srcObject?.getTracks();
      if (tracks) {
        tracks.forEach((track) => track.stop());
      }
    };
  }, [onScan]);

  // Call the compareData function whenever scannedData or serverQRCodeData changes
  useEffect(() => {
    const compareData = () => {
      if (scannedData && serverQRCodeData) {
        if (scannedData.trim().toLowerCase() === serverQRCodeData.trim().toLowerCase()) {
          console.log("QR codes match!");
          setMark(true)
        } else {
          console.error(
            "QR codes do not match. Scanned data:",
            scannedData,
            "Server data:",
            serverQRCodeData
          );
        }
      }
    };
    compareData();
  }, [scannedData, serverQRCodeData]);

  // if (mark) {
  //   markUserAsPresent(user.studentId)
  // }
  return (
    <div className="scannerContent">
      {!scannedData && (
        <video
          ref={videoRef}
          autoPlay
          playsInline
          style={{ width: "100%", maxWidth: "500px", margin: "auto" }}
        />
      )}
      {scannedData && (
        <div>
          <p>Your code is: {scannedData} and you have been successfully registerd</p>
        </div>
      )}
    </div>
  );
};

export default QRScanner;
