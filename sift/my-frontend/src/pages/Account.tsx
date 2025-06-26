import {
    Box,
    Button,
    Stack,
    TextField,
    Typography,
    Avatar,
    IconButton,
  } from "@mui/material";
  import SidebarNav from "../components/SidebarNav";
  import PhotoCamera from "@mui/icons-material/PhotoCamera";
  
  export default function Account() {
    return (
      <Box display="flex">
        <SidebarNav />
        <Box
          flex={1}
          bgcolor="#fff"
          minHeight="100vh"
          px={2}
          pt={8} // Top padding to move the form upward
          display="flex"
          justifyContent="center"
        >
          <Box
            component="form"
            sx={{
              width: "100%",
              maxWidth: 600,
              display: "flex",
              flexDirection: "column",
              gap: 3,
            }}
            noValidate
            autoComplete="off"
          >
            <Typography variant="h5" fontWeight="bold" color="#3a3a3a" textAlign="center">
              Account Settings
            </Typography>
  
            {/* Profile photo section */}
            <Stack direction="row" alignItems="center" spacing={2} justifyContent="center">
              <Avatar
                alt="User Avatar"
                sx={{ width: 64, height: 64, bgcolor: "#ccc" }}
              >
                U
              </Avatar>
              <IconButton
                color="primary"
                component="label"
              >
                <PhotoCamera />
                <input hidden accept="image/*" type="file" />
              </IconButton>
            </Stack>
  
            {/* Form fields */}
            <TextField label="Full Name" variant="outlined" fullWidth />
            <TextField label="Email Address" variant="outlined" fullWidth />
            <TextField label="New Password" variant="outlined" type="password" fullWidth />
            <TextField label="Confirm Password" variant="outlined" type="password" fullWidth />
  
            <Box display="flex" justifyContent="center">
              <Button variant="contained" color="primary">
                Save Changes
              </Button>
            </Box>
          </Box>
        </Box>
      </Box>
    );
  }
  