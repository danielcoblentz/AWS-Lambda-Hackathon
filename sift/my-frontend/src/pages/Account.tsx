import {
  Avatar,
  Box,
  Grid,
  Typography,
  Paper,
  TextField,
} from "@mui/material";
import TopNavBar from "../components/TopNavBar";

export default function Account() {
  const infoCards = [
    { label: "Name", value: "Daniel Rosier" },
    { label: "Date of Birth", value: "02 Jan 2000" },
    { label: "Country Region", value: "United States, MD" },
    { label: "Language", value: "English (US)" },
    { label: "Contactable at", value: "daniel@email.com" },
  ];

  return (
    <Box bgcolor="#fff" minHeight="100vh">
      <TopNavBar />

      <Box px={4} py={6}>
        <Typography variant="h6" fontWeight="bold" mb={3}>
          Account
        </Typography>

        <Grid container spacing={6}>
          {/* LEFT PROFILE */}
          <Grid item xs={12} md={4}>
            <Avatar sx={{ width: 80, height: 80, bgcolor: "#ccc" }}>D</Avatar>
            <Box mt={2}>
              <Typography variant="subtitle1" fontWeight="bold">
                Daniel Rosier
              </Typography>
              <Typography variant="body2" color="text.secondary">
                daniel@email.com
              </Typography>
            </Box>
          </Grid>

          {/* RIGHT INFO CARDS */}
          <Grid item xs={12} md={8}>
            <Typography variant="h6" fontWeight="bold" mb={1}>
              Personal information
            </Typography>
            <Typography variant="body2" color="text.secondary" mb={3}>
              Manage your personal information, including contact details and preferences.
            </Typography>

            <Grid container spacing={3}>
              {infoCards.map((info) => (
                <Grid item xs={12} md={6} key={info.label}>
                  <Paper
                    elevation={1}
                    sx={{
                      p: 3,
                      borderRadius: 2,
                      minHeight: 100,
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "center",
                    }}
                  >
                    <Typography variant="body2" fontWeight="bold" mb={0.5}>
                      {info.label}
                    </Typography>
                    <TextField
                      defaultValue={info.value}
                      variant="standard"
                      fullWidth
                      InputProps={{
                        disableUnderline: true,
                        sx: { fontSize: 14 },
                      }}
                    />
                  </Paper>
                </Grid>
              ))}
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}
