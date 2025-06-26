import {
  Box,
  Typography,
  LinearProgress,
  Paper,
  TextField,
  InputAdornment,
  IconButton,
  Modal,
  Button,
} from "@mui/material";
import Grid from '@mui/material/Grid';
import SendIcon from "@mui/icons-material/Send";
import FolderIcon from '@mui/icons-material/Folder';
import { useState, useEffect } from "react";
import { SimpleTreeView } from '@mui/x-tree-view/SimpleTreeView';
import CustomTreeItem from '../components/CustomTreeItem';

export default function MainHero() {
  const [loading, setLoading] = useState(true);
  const [documents, setDocuments] = useState<Array<{ title: string; vendor: string; date: string }>>([]);
  const [graphOpen, setGraphOpen] = useState(false);

  const handleOpenGraph = () => setGraphOpen(true);
  const handleCloseGraph = () => setGraphOpen(false);

  useEffect(() => {
    setTimeout(() => {
      setDocuments([
        { title: "Grocery Receipt", vendor: "Target", date: "2024-08-01" },
        { title: "Gas Station", vendor: "Shell", date: "2024-07-28" },
        { title: "Utilities Bill", vendor: "BGE", date: "2024-07-25" },
        { title: "Lunch Receipt", vendor: "Chipotle", date: "2024-07-22" },
        { title: "Hardware Store", vendor: "Home Depot", date: "2024-07-20" },
        { title: "Coffee", vendor: "Starbucks", date: "2024-07-19" },
      ]);
      setLoading(false);
    }, 2000);
  }, []);

  const mockFileStructure = {
    "2024": {
      January: ["Amazon - Order #123.pdf", "Chipotle - Lunch.png"],
      February: ["CVS - Pharmacy.pdf"],
    },
    "2023": {
      December: ["Uber - Ride.pdf", "BGE - Utilities.pdf"],
    },
  };

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
      {/* Recent Documents Section */}
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

      {/* Search Header */}
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

      {/* Search Bar with Graph View Button */}
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
                <Button onClick={handleOpenGraph} sx={{ ml: 1 }} size="small">
                  Graph View
                </Button>
              </InputAdornment>
            ),
          }}
        />
      </Box>

      {/* Graph View Overlay */}
      <Modal open={graphOpen} onClose={handleCloseGraph}>
        <Box
          sx={{
            position: 'absolute',
            top: '5%',
            left: '12.5%',
            width: '75vw',
            maxHeight: '90vh',
            bgcolor: '#fdfdfd',
            boxShadow: 24,
            p: 3,
            borderRadius: 3,
            overflowY: 'auto',
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          {/* Search bar */}
          <TextField
            variant="outlined"
            placeholder="Search for document..."
            size="small"
            sx={{
              mb: 2,
              bgcolor: '#fff',
              borderRadius: 2,
              '& .MuiOutlinedInput-root': {
                borderRadius: 2,
              },
            }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <FolderIcon sx={{ color: '#aaa' }} />
                </InputAdornment>
              ),
            }}
          />

          {/* tree view */}
          <SimpleTreeView>
            {Object.entries(mockFileStructure).map(([year, months]) => (
              <CustomTreeItem key={year} itemId={year} label={year}>
                {Object.entries(months).map(([month, files]) => (
                  <CustomTreeItem key={month} itemId={`${year}-${month}`} label={month}>
                    {files.map((file, i) => (
                      <CustomTreeItem
                        key={file}
                        itemId={`${year}-${month}-${i}`}
                        label={file}
                      />
                    ))}
                  </CustomTreeItem>
                ))}
              </CustomTreeItem>
            ))}
          </SimpleTreeView>
        </Box>
      </Modal>
    </Box>
  );
}
