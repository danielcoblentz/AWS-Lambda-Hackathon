import {Box,Typography,IconButton,Button,TextField,Stack,} from "@mui/material";
  import CloseIcon from "@mui/icons-material/Close";
  import React, { useState } from 'react';
  
  interface PhotoSummaryOverlayProps {
    image: string;
    vendor: string;
    date: string;
    amount: string;
    onConfirm: (fields: { vendor: string; date: string; amount: string }) => void;
    onRetake: () => void;
    onDelete: () => void;
  }
  
  export default function PhotoSummaryOverlay({
    image,
    vendor,
    date,
    amount,
    onConfirm,
    onRetake,
    onDelete,
  }: PhotoSummaryOverlayProps) {
    const [fields, setFields] = useState({ vendor, date, amount });

    const handleConfirm = () => {
        onConfirm(fields);
    };
  
    return (
      <Box
        width="100%"
        height="100vh"
        display="flex"
        flexDirection="column"
        bgcolor="#fdfdfd"
      >
        {/* img preview */}
        <Box
          component="img"
          src={image}
          alt="Scanned Preview"
          width="100%"
          maxHeight="50vh"
          borderRadius={2}
        />
  
        {/* metadata form should be populated after lambda call */}
        <Box
          mt={2}
          width="100%"
          maxWidth="500px"
          mx="auto"
          p={2}
          bgcolor="#fff"
          borderRadius={3}
          boxShadow={1}
        >
          <Typography variant="subtitle1" fontWeight="bold" mb={1}>
            Edit Document Details
          </Typography>
  
          <TextField
            label="Vendor"
            fullWidth
            margin="normal"
            value={fields.vendor}
            onChange={(e) => setFields({ ...fields, vendor: e.target.value })}
          />
          <TextField
            label="Date"
            fullWidth
            margin="normal"
            value={fields.date}
            onChange={(e) => setFields({ ...fields, date: e.target.value })}
          />
          <TextField
            label="Amount"
            fullWidth
            margin="normal"
            value={fields.amount}
            onChange={(e) => setFields({ ...fields, amount: e.target.value })}
          />
  
          <Stack direction="row" spacing={2} mt={3}>
            <Button
              fullWidth
              onClick={onRetake}
              sx={{
                bgcolor: "#eaeaea",
                color: "#000",
                fontWeight: 500,
                textTransform: "none",
                borderRadius: "8px",
                "&:hover": { backgroundColor: "#f0f0f0" },
              }}
            >
              Retake
            </Button>
  
            <Button
              fullWidth
              onClick={onDelete}
              sx={{
                bgcolor: "#f9f9f9",
                color: "#333",
                fontWeight: 500,
                textTransform: "none",
                borderRadius: "8px",
                "&:hover": { backgroundColor: "#f0f0f0" },
              }}
            >
              Delete
            </Button>
          </Stack>
  
          <Button
            variant="contained"
            fullWidth
            onClick={handleConfirm}
            sx={{
              mt: 2,
              py: 1.5,
              borderRadius: "8px",
              backgroundColor: "#eaeaea",
              color: "#000",
              textTransform: "none",
              fontWeight: 500,
              "&:hover": {
                backgroundColor: "#f0f0f0",
              },
            }}
          >
            Confirm
          </Button>
        </Box>
      </Box>
    );
  }
  