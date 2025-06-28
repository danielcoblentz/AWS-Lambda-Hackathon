
import {Box,Typography,Button,TextField,IconButton,} from "@mui/material";
  import DeleteIcon from "@mui/icons-material/Delete";
  import RotateLeftIcon from "@mui/icons-material/RotateLeft";
  import CameraAltIcon from "@mui/icons-material/CameraAlt";
  import { useState } from "react";
  
  type Photo = {
    image: string;
    vendor: string;
    date: string;
    amount: string;
  };
  
  interface DocumentSummaryProps {
    photos: Photo[];
    setPhotos: React.Dispatch<React.SetStateAction<Photo[]>>;
    onSaveAll: () => void;
  }
  
  export default function DocumentSummary({
    photos,
    setPhotos,
    onSaveAll,
  }: DocumentSummaryProps) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const currentPhoto = photos[currentIndex];
  
    const updateMetadata = (field: keyof Photo, value: string) => {
      const updated = [...photos];
      updated[currentIndex] = { ...updated[currentIndex], [field]: value };
      setPhotos(updated);
    };
  
    const rotateImage = () => {
      alert("Rotation not implemented yet.");
    };
  
    const deletePhoto = () => {
      const updated = [...photos];
      updated.splice(currentIndex, 1);
      setPhotos(updated);
      setCurrentIndex((prev) => (prev > 0 ? prev - 1 : 0));
    };
  
    const retakePhoto = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: "environment" },
        });
  
        const video = document.createElement("video");
        video.srcObject = stream;
        await video.play();
  
        const canvas = document.createElement("canvas");
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        const ctx = canvas.getContext("2d");
        if (ctx) {
          ctx.drawImage(video, 0, 0);
          const newDataUrl = canvas.toDataURL("image/png");
  
          const updated = [...photos];
          updated[currentIndex].image = newDataUrl;
          setPhotos(updated);
        }
  
        video.pause();
        stream.getTracks().forEach((track) => track.stop());
      } catch (error) {
        alert("Could not access camera.");
        console.error(error);
      }
    };
  
    if (!currentPhoto) {
      return (
        <Box p={2} textAlign="center">
          <Typography>No photos to display.</Typography>
        </Box>
      );
    }
  
    return (
      <Box width="100%" height="100vh" bgcolor="#fdfdfd" p={2}>
        <Typography variant="h6" textAlign="center" mb={2}>
          Document {currentIndex + 1} of {photos.length}
        </Typography>
  
        <Box
          component="img"
          src={currentPhoto.image}
          alt="Scanned Document"
          width="100%"
          maxHeight="50vh"
          borderRadius={2}
          mb={2}
        />
  
        <Box display="flex" justifyContent="center" gap={2} mb={2}>
          <IconButton onClick={rotateImage} color="primary">
            <RotateLeftIcon />
          </IconButton>
          <IconButton onClick={retakePhoto} color="primary">
            <CameraAltIcon />
          </IconButton>
          <IconButton onClick={deletePhoto} color="error">
            <DeleteIcon />
          </IconButton>
        </Box>
  
        <TextField
  variant="standard"
  placeholder="Enter vendor name"
  fullWidth
  value={currentPhoto.vendor}
  onChange={(e) => updateMetadata("vendor", e.target.value)}
  sx={{ mb: 2 }}
/>
<TextField
  variant="standard"
  placeholder="Enter date (YYYY-MM-DD)"
  fullWidth
  value={currentPhoto.date}
  onChange={(e) => updateMetadata("date", e.target.value)}
  sx={{ mb: 2 }}
/>
<TextField
  variant="standard"
  placeholder="Enter amount (e.g., 32.50)"
  fullWidth
  value={currentPhoto.amount}
  onChange={(e) => updateMetadata("amount", e.target.value)}
  sx={{ mb: 2 }}
/>

  
        <Box display="flex" justifyContent="space-between" mt={3}>
          <Button
            disabled={currentIndex === 0}
            onClick={() => setCurrentIndex((i) => i - 1)}
            sx={{
              backgroundColor: "#eaeaea",
              color: "#000",
              borderRadius: "8px",
              px: 3,
              py: 1,
              textTransform: "none",
              "&:hover": {
                backgroundColor: "#f0f0f0",
              },
            }}
          >
            Previous
          </Button>
  
          <Button
            disabled={currentIndex === photos.length - 1}
            onClick={() => setCurrentIndex((i) => i + 1)}
            sx={{
              backgroundColor: "#eaeaea",
              color: "#000",
              borderRadius: "8px",
              px: 3,
              py: 1,
              textTransform: "none",
              "&:hover": {
                backgroundColor: "#f0f0f0",
              },
            }}
          >
            Next
          </Button>
        </Box>
  
        <Button
          onClick={onSaveAll}
          fullWidth
          sx={{
            mt: 4,
            backgroundColor: "#eaeaea",
            color: "#000",
            fontWeight: 500,
            borderRadius: "8px",
            px: 3,
            py: 1.5,
            textTransform: "none",
            "&:hover": {
              backgroundColor: "#f0f0f0",
            },
          }}
        >
          Save All to Folder
        </Button>
      </Box>
    );
  }
  