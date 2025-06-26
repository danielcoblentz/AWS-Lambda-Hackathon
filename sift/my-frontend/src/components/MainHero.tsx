import {
  Box,
  Typography,
  LinearProgress,
  Paper,
  TextField,
  InputAdornment,
  IconButton,
} from "@mui/material";
import Grid from '@mui/material/Grid';
import SendIcon from "@mui/icons-material/Send";
import { useState, useEffect } from "react";

export default function MainHero() {
  // simulate loading and fake documents
  const [loading, setLoading] = useState(true);
  const [documents, setDocuments] = useState<Array<{ title: string; vendor: string; date: string }>>([]);

  //sample documetns for testing will change later once we have scanning page/feature
  useEffect(() => {
    setTimeout(() => {
      setDocuments([
        { title: "Grocery Receipt", vendor: "Target", date: "2024-08-01" },
        { title: "Gas Station", vendor: "Shell", date: "2024-07-28" },
        { title: "Utilities Bill", vendor: "BGE", date: "2024-07-25" },
        { title: "Lunch Receipt", vendor: "Chipotle", date: "2024-07-22" },
        { title: "Hardware Store", vendor: "Home Depot", date: "2024-07-20" },
        { title: "Coffee", vendor: "Starbucks", date: "2024-07-19" },
        { title: "Online Purchase", vendor: "Amazon", date: "2024-07-18" },
        { title: "Ride Share", vendor: "Uber", date: "2024-07-15" },
        { title: "Pharmacy", vendor: "CVS", date: "2024-07-12" },
        { title: "Clothing", vendor: "Uniqlo", date: "2024-07-10" },
        { title: "Dining", vendor: "Nando’s", date: "2024-07-08" },
        { title: "Pet Store", vendor: "PetSmart", date: "2024-07-06" },
      ]);
      setLoading(false);
    }, 2000); 
  }, []);

  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      minHeight="100vh"
      bgcolor="#fff"
      px={2}
      width="100%"
      pt={1}
    >
      {/* recent socuments section this will be populated with actual scanned items by the user */}
      <Box width="100%" maxWidth="1200px" mb={6}>
        <Typography variant="subtitle1" fontWeight="bold" mb={1}>
          Recent Documents
        </Typography>

        {loading ? (
          <LinearProgress />
        ) : (
          <Grid container spacing={2}>
            {documents.slice(0, 12).map((doc, index) => (
              <Grid key={index} size={{ xs: 12, sm: 6, md: 3 }}>
                <Paper elevation={1} sx={{ p: 2, borderRadius: 2 }}>
                  <Typography variant="body1" fontWeight="bold">
                    {doc.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {doc.vendor}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    {doc.date}
                  </Typography>
                </Paper>
              </Grid>
            ))}
          </Grid>
        )}
      </Box>

      {/* search header */}
      <Typography
        variant="h5"
        sx={{
          fontWeight: 'bold',
          color: '#3a3a3a',
          mb: 2,
        }}
      >
        Search for Documents
      </Typography>

      {/* main search bar */}
      <Box width="100%" maxWidth="1200px">
        <TextField
          placeholder="search by doc name, date or vendor"
          variant="outlined"
          fullWidth
          sx={{
            width: '100%',
            height: 48,
            borderRadius: 5,
            backgroundColor: '#f5f5f5',
            '& .MuiOutlinedInput-root': {
              borderRadius: '999px',
              height: '100%',
            },
          }}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton edge="end">
                  <SendIcon sx={{ color: '#000' }} />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </Box>
    </Box>
  );
}
