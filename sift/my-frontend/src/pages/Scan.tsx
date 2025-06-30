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
import { useNavigate } from 'react-router-dom';

interface Photo {
  image: string;
  vendor: string;
  date: string;
  amount: string;
  s3Key?: string;
}

export default function ScanPage() {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [flashOn, setFlashOn] = useState(false);
  const [photoCount, setPhotoCount] = useState(1);
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [showSummary, setShowSummary] = useState(false);
  const [toastOpen, setToastOpen] = useState(false);
  const navigate = useNavigate(); // To redirect if not logged in

  // Simulate a check for login (replace with actual authentication logic)
  const isLoggedIn = localStorage.getItem("auth_token"); // Example check for login token

  useEffect(() => {
    if (!isLoggedIn) {
      navigate('/login'); // Redirect if not logged in
    } else {
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
    }
  }, [isLoggedIn, navigate]);

  const takePhoto = async () => {
    if (videoRef.current && canvasRef.current) {
      const ctx = canvasRef.current.getContext("2d");
      if (!ctx) return;

      canvasRef.current.width = videoRef.current.videoWidth;
      canvasRef.current.height = videoRef.current.videoHeight;
      ctx.drawImage(videoRef.current, 0, 0);
      const dataUrl = canvasRef.current.toDataURL("image/png");

      // Convert to File
      const file = dataURLtoFile(dataUrl, `receipt-${Date.now()}.png`);

      // Get presigned URL for S3 upload
      const res = await fetch("/api/presign-upload", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          filename: file.name,
          filetype: file.type,
        }),
      });

      if (!res.ok) {
        console.error("Failed to get presigned URL:", res.status, await res.text());
        return;
      }

      const { url, key } = await res.json();

      // Upload to S3
      await fetch(url, {
        method: "PUT",
        body: file,
        headers: { "Content-Type": file.type },
      });

      // Now trigger Lambda to process the image and get metadata
      const lambdaRes = await fetch(`https://your-lambda-url.amazonaws.com/dev/extract-metadata`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ s3Key: key }),
      });

      const data = await lambdaRes.json();

      if (data.success) {
        const { vendor, amount, year } = data.metadata;
        // Store the metadata in state
        setPhotos((prev) => [
          ...prev,
          {
            image: dataUrl,
            vendor: vendor || "",
            date: year ? `${year}-01-01` : "",
            amount: amount || "0.00",
            s3Key: key,
          },
        ]);

        setPhotoCount((count) => count + 1);
        setToastOpen(true);
      } else {
        console.error("Failed to process image metadata");
      }
    }
  };

  const dataURLtoFile = (dataUrl: string, filename: string) => {
    const arr = dataUrl.split(",");
    const mime = arr[0].match(/:(.*?);/)?.[1] || "image/png";
    const bstr = atob(arr[1]);
    const u8arr = new Uint8Array(bstr.length);
    for (let i = 0; i < bstr.length; i++) {
      u8arr[i] = bstr.charCodeAt(i);
    }
    return new File([u8arr], filename, { type: mime });
  };

  const handleSaveAll = async () => {
    try {
      for (const photo of photos) {
        await fetch("/api/receipts", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            vendor: photo.vendor,
            date: photo.date,
            amount: photo.amount,
            s3Key: photo.s3Key,
          }),
        });
      }

      alert("All receipts submitted successfully!");
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
