import {Box,Typography,Button,Paper,Stack,Divider,} from "@mui/material";
  import TopNavBar from "../components/TopNavBar";
  //list of possible applications the uer can interact with 
  const integrations = [
    {
      name: "Google Drive",
      desc: "Sync cloud files directly from your Google account.",
      connected: true,
    },
    {
      name: "QuickBooks",
      desc: "Automatically sync your receipts with QuickBooks.",
      connected: false,
    },
    {
      name: "Box",
      desc: "Link your Box cloud storage for quick access.",
      connected: false,
    },
    {
      name: "Dropbox",
      desc: "Connect to store and fetch documents from Dropbox.",
      connected: true,
    },
    {
      name: "OneDrive",
      desc: "Access and upload to your OneDrive folders.",
      connected: false,
    },
  ];
  
  export default function Integrations() {
    return (
      <Box bgcolor="#fff" minHeight="100vh">
        <TopNavBar />
  
        <Box px={4} py={6} maxWidth="1000px" mx="auto">
          <Typography variant="h5" fontWeight="bold" mb={1}>
            Integrations and connected apps
          </Typography>
          <Typography variant="body2" color="text.secondary" mb={4}>
            Supercharge your workflow and connect the tools you use every day.
          </Typography>
  
          {/* Integration List */}
          <Paper variant="outlined" sx={{ borderRadius: 3 }}>
            {integrations.map((item, index) => (
              <Box key={item.name}>
                <Stack
                  direction="row"
                  alignItems="center"
                  justifyContent="space-between"
                  px={3}
                  py={2}
                >
                  <Box>
                    <Typography fontWeight="bold">{item.name}</Typography>
                    <Typography variant="body2" color="text.secondary">
                      {item.desc}
                    </Typography>
                  </Box>
  
                  <Button
                    variant={item.connected ? "contained" : "outlined"}
                    color="inherit"
                    sx={{
                      borderRadius: 8,
                      textTransform: "none",
                      minWidth: 100,
                      backgroundColor: item.connected ? "#000" : undefined,
                      color: item.connected ? "#fff" : "#000",
                      borderColor: "#ccc",
                      "&:hover": {
                        backgroundColor: item.connected ? "#222" : "#f0f0f0",
                      },
                    }}
                  >
                    {item.connected ? "Connected" : "Connect"}
                  </Button>
                </Stack>
  
                {index < integrations.length - 1 && <Divider />}
              </Box>
            ))}
          </Paper>
        </Box>
      </Box>
    );
  }
  