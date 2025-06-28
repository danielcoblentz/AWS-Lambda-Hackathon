import {
    Box,
    Typography,
    IconButton,
    Button,
    Snackbar,
  } from "@mui/material";
  import CloseIcon from "@mui/icons-material/Close";
  import FlashOnIcon from "@mui/icons-material/FlashOn";
  import FlashOffIcon from "@mui/icons-material/FlashOff";
  import { useState, useRef, useEffect } from "react";
  import DocumentSummary from "../components/DocumentSummaryScreen";
  
  interface Photo {
    image: string;
    vendor: string;
    date: string;
    amount: string;
  }
  
  export default function ScanPage() {
    const videoRef = useRef<HTMLVideoElement | null>(null);
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const [flashOn, setFlashOn] = useState(false);
    const [photoCount, setPhotoCount] = useState(1);
    const [photos, setPhotos] = useState<Photo[]>([]);
    const [showSummary, setShowSummary] = useState(false);
    const [toastOpen, setToastOpen] = useState(false);
  
    useEffect(() => {
      const startCamera = async () => {
        try {
          const stream = await navigator.mediaDevices.getUserMedia({
            video: { facingMode: "environment" },
          });
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
        setPhotos((prev) => [
          ...prev,
          { image: dataUrl, vendor: "", date: "", amount: "" },
        ]);
        setPhotoCount((count) => count + 1);
        setToastOpen(true);
      }
    };
  
    const handleSaveAll = async () => {
      try {
        const response = await fetch(
          "https://your-lambda-url.amazonaws.com/dev/upload",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ photos }),
          }
        );
  
        const result = await response.json();
  
        if (result.success) {
          alert("Upload successful!");
          localStorage.setItem("updatedTree", JSON.stringify(result.updatedTree));
        } else {
          alert("Upload failed: " + result.message);
        }
      } catch (error) {
        console.error("Upload error:", error);
        alert("An error occurred during upload.");
      }
    };
  
    if (showSummary) {
      return (
        <DocumentSummary
          photos={photos}
          setPhotos={setPhotos}
          onSaveAll={handleSaveAll}
        />
      );
    }
  
    return (
      <Box width="100%" height="100vh" position="relative" bgcolor="#000">
        <video
          ref={videoRef}
          autoPlay
          playsInline
          muted
          style={{
            position: "absolute",
            width: "100%",
            height: "100%",
            objectFit: "cover",
          }}
        />
        <canvas ref={canvasRef} style={{ display: "none" }} />
  
        <IconButton
          sx={{ position: "absolute", top: 16, right: 16, color: "white" }}
          onClick={() => window.history.back()}
        >
          <CloseIcon />
        </IconButton>
  
        <IconButton
          sx={{ position: "absolute", top: 16, left: 16, color: "white" }}
          onClick={() => setFlashOn(!flashOn)}
        >
          {flashOn ? <FlashOnIcon /> : <FlashOffIcon />}
        </IconButton>
  
        {photos.length > 0 && !showSummary && (
  <Button
    onClick={() => setShowSummary(true)}
    sx={{
      position: "fixed",
      bottom: 16,
      right: 16,
      backgroundColor: "#eaeaea",
      color: "#000",
      fontWeight: 500,
      borderRadius: "8px",
      px: 3,
      py: 1,
      textTransform: "none",
      zIndex: 10,
      boxShadow: "0px 2px 6px rgba(0,0,0,0.2)",
      "&:hover": { backgroundColor: "#f0f0f0" },
    }}
  >
    Review & Save
  </Button>
        )}
  
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
  
        <Snackbar
          open={toastOpen}
          autoHideDuration={2000}
          onClose={() => setToastOpen(false)}
          message="Photo captured!"
          anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        />
      </Box>
    );
  }
  