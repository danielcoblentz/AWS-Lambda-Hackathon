//simple integrations page (need to add functionality to this)
import {
    Box,
    FormControlLabel,
    Switch,
    Typography,
    Paper,
    Stack,
  } from "@mui/material";
  import SidebarNav from "../components/SidebarNav";
  
  export default function Integrations() {
    return (
      <Box display="flex">
        <SidebarNav />
        <Box
          flex={1}
          bgcolor="#fff"
          minHeight="100vh"
          px={4}
          py={6}
          fontFamily="sans-serif"
        >
          <Typography variant="h5" fontWeight="bold" mb={4} color="#3a3a3a">
            Integrations
          </Typography>
  
          <Paper
            elevation={1}
            sx={{
              p: 4,
              borderRadius: 3,
              maxWidth: 600,
            }}
          >
            <Typography variant="subtitle1" fontWeight="medium" mb={3}>
              Connect your accounts
            </Typography>
  
            {[
              "Google Drive",
              "QuickBooks",
              "Box",
              "Dropbox",
              "OneDrive",
            ].map((name, index) => (
              <Stack
                key={name}
                direction="row"
                alignItems="center"
                justifyContent="space-between"
                sx={{
                  mb: 2,
                  px: 1,
                }}
              >
                <Typography
                  variant="body1"
                  sx={{ fontWeight: 500, color: "#3a3a3a" }}
                >
                  {name}
                </Typography>
                <Switch defaultChecked={index === 0} />
              </Stack>
            ))}
          </Paper>
        </Box>
      </Box>
    );
  }
  