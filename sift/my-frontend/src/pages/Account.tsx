import {
    Avatar,
    Box,
    Grid,
    Typography,
    Paper,
  } from "@mui/material";
  import TopNavBar from "../components/TopNavBar";
  
  //defualt information we can collect and update for the user (including account passowrd update)
  export default function Account() {
    const infoCards = [
      { label: "Name", value: "Daniel Coblentz" },
      { label: "Update email", value: "myemail" },
      { label: "Update password", value: "my pass" },
      { label: "Language", value: "English (US)" },
    ];
  
    return (
      <Box bgcolor="#fff" minHeight="100vh">
        <TopNavBar />
  
        <Box px={4} py={6}>
          <Typography variant="h6" fontWeight="bold" mb={3}>
            Account
          </Typography>
  
          <Grid container spacing={6}>
            {/* left profile area*/}
            <Grid size={{ xs: 12, md: 4 }}>
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
  
            {/* right side inofrmtion box */}
            <Grid size={{ xs: 12, md: 8 }}>
              <Typography variant="h6" fontWeight="bold" mb={1}>
                Personal information
              </Typography>
              <Typography variant="body2" color="text.secondary" mb={3}>
                Manage your personal information, including contact details and preferences.
              </Typography>
  
              <Grid container spacing={3}>
                {infoCards.map((info) => (
                  <Grid key={info.label} size={{ xs: 12, md: 6 }}>
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
                      <Typography variant="body2" color="text.secondary">
                        {info.value}
                      </Typography>
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
  