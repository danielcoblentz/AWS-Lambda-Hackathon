import {Box,Typography,IconButton,Button,TextField,} from "@mui/material";
  import { useState, useRef, useEffect } from "react";
  import CloseIcon from "@mui/icons-material/Close";
  import FlashOnIcon from "@mui/icons-material/FlashOn";
  import FlashOffIcon from "@mui/icons-material/FlashOff";
  
  export default function ScanPage() {
    const videoRef = useRef<HTMLVideoElement | null>(null);
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const [flashOn, setFlashOn] = useState(false);
    const [photoCount, setPhotoCount] = useState(1);
    const [showSummary, setShowSummary] = useState(false);
    const [photoDataUrl, setPhotoDataUrl] = useState<string | null>(null);
    const [fields, setFields] = useState({ vendor: "", date: "", amount: "" });
  
    useEffect(() => {
      const startCamera = async () => {
        try {
          const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: "environment" } });
          if (videoRef.current) {
            videoRef.current.srcObject = stream;
          }
        } catch (error) {
          console.error("Camera error:", error);
        }
      };
  
      startCamera();
    }, []);
  
    const takePhoto = () => {
      if (videoRef.current && canvasRef.current) {
        const ctx = canvasRef.current.getContext("2d");
        if (!ctx) return;
        canvasRef.current.width = videoRef.current.videoWidth;
        canvasRef.current.height = videoRef.current.videoHeight;
        ctx.drawImage(videoRef.current, 0, 0);
        const dataUrl = canvasRef.current.toDataURL("image/png");
        setPhotoDataUrl(dataUrl);
        setShowSummary(true);
      }
    };
  
    const handleContinue = () => {
      setPhotoCount(photoCount + 1);
      setFields({ vendor: "", date: "", amount: "" });
      setShowSummary(false);
    };
  
    const handleSaveAll = async () => {
        if (!photoDataUrl) return;
      
        try {
          const response = await fetch("https://your-lambda-url.amazonaws.com/dev/upload", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              vendor: fields.vendor,
              date: fields.date,
              amount: fields.amount,
              photo: photoDataUrl, // base64 string
            }),
          });
      
          const result = await response.json();
      
          if (result.success) {
            alert("Upload successful!");
            // Send tree update to localStorage for MainHero to pick up
            localStorage.setItem("updatedTree", JSON.stringify(result.updatedTree));
          } else {
            alert("Upload failed: " + result.message);
          }
        } catch (error) {
          console.error("Upload error:", error);
          alert("An error occurred during upload.");
        }
      };
      
  
    return (
      <Box width="100%" height="100vh" position="relative" bgcolor="#000">
        <video ref={videoRef} autoPlay playsInline muted style={{ position: "absolute", width: "100%", height: "100%", objectFit: "cover" }} />
        <canvas ref={canvasRef} style={{ display: "none" }} />
  
        {/* Exit button */}
        <IconButton sx={{ position: "absolute", top: 16, right: 16, color: "white" }} onClick={() => window.history.back()}>
          <CloseIcon />
        </IconButton>
  
        {/* Flash toggle */}
        <IconButton
          sx={{ position: "absolute", top: 16, left: 16, color: "white" }}
          onClick={() => setFlashOn(!flashOn)}
        >
          {flashOn ? <FlashOnIcon /> : <FlashOffIcon />}
        </IconButton>
  
        {/* Capture Button */}
        <Box
          position="absolute"
          bottom={40}
          width="100%"
          display="flex"
          justifyContent="center"
          alignItems="center"
        >
          <Box
            onClick={takePhoto}
            sx={{
              width: 80,
              height: 80,
              borderRadius: "50%",
              border: "4px solid white",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 20,
              color: "white",
              cursor: "pointer",
            }}
          >
            {photoCount}
          </Box>
        </Box>
      </Box>
    );
  }
  