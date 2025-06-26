// pages/Signup.tsx

import {
  Box,
  Typography,
  TextField,
  Button,
  Divider,
  InputAdornment,
  IconButton,
} from "@mui/material";
import GoogleIcon from "@mui/icons-material/Google";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { useState } from "react";

export default function Signup() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  return (
    <Box
      minHeight="100vh"
      display="flex"
      justifyContent="center"
      alignItems="center"
      bgcolor="#f5f7f9"
      px={2}
    >
      <Box
        width="100%"
        maxWidth="400px"
        bgcolor="#fff"
        borderRadius={4}
        px={4}
        py={6}
        boxShadow="0px 6px 18px rgba(0, 0, 0, 0.05)"
      >
        {/* Logo */}
        <Typography variant="h6" fontWeight="bold" mb={2}>
          .Finance
        </Typography>

        {/* Welcome Text */}
        <Typography variant="h5" fontWeight="bold" mb={1}>
          Create Your Account
        </Typography>
        <Typography variant="body2" color="text.secondary" mb={4}>
          Please fill in the details below
        </Typography>

        {/* Name Input */}
        <TextField
          fullWidth
          placeholder="Jane Doe"
          variant="standard"
          InputProps={{
            disableUnderline: false,
            sx: { pb: 2 },
          }}
          sx={{
            mb: 3,
            '& .MuiInputBase-input': { fontSize: '1rem' },
          }}
        />

        {/* Email Input */}
        <TextField
          fullWidth
          placeholder="example@email.com"
          variant="standard"
          InputProps={{
            disableUnderline: false,
            sx: { pb: 2 },
          }}
          sx={{ mb: 3 }}
        />

        {/* Password Input */}
        <TextField
          fullWidth
          type={showPassword ? "text" : "password"}
          placeholder="Create a password"
          variant="standard"
          InputProps={{
            disableUnderline: false,
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={() => setShowPassword(!showPassword)}>
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
            sx: { pb: 2 },
          }}
          sx={{ mb: 3 }}
        />

        {/* Confirm Password Input */}
        <TextField
          fullWidth
          type={showConfirmPassword ? "text" : "password"}
          placeholder="Confirm password"
          variant="standard"
          InputProps={{
            disableUnderline: false,
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
                  {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
            sx: { pb: 2 },
          }}
          sx={{ mb: 3 }}
        />

        {/* Sign Up Button */}
        <Button
          fullWidth
          variant="contained"
          sx={{
            bgcolor: "#000",
            color: "#fff",
            textTransform: "none",
            borderRadius: "12px",
            py: 1.5,
            fontWeight: 600,
            mb: 2,
            '&:hover': { bgcolor: "#222" },
          }}
        >
          Create Account
        </Button>

        {/* Divider */}
        <Box display="flex" alignItems="center" mb={2}>
          <Divider sx={{ flexGrow: 1 }} />
          <Typography mx={2} variant="caption" color="text.secondary">
            or continue
          </Typography>
          <Divider sx={{ flexGrow: 1 }} />
        </Box>

        {/* Google Sign Up */}
        <Button
          variant="outlined"
          fullWidth
          startIcon={<GoogleIcon />}
          sx={{
            textTransform: "none",
            borderRadius: "12px",
            py: 1.2,
            fontWeight: 500,
          }}
        >
          Sign up with Google
        </Button>

        {/* Login Link */}
        <Typography mt={3} variant="caption" textAlign="center" display="block">
          Already have an account?{" "}
          <a href="#" style={{ fontWeight: 500, textDecoration: "none" }}>
            Log In
          </a>
        </Typography>
      </Box>
    </Box>
  );
}
