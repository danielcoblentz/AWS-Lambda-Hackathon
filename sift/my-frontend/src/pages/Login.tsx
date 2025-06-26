// pages/Login.tsx

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

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);

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
          Sift
        </Typography>

        {/* Welcome Text */}
        <Typography variant="h5" fontWeight="bold" mb={1}>
          Welcome Back!
        </Typography>
        <Typography variant="body2" color="text.secondary" mb={4}>
          Please enter log in details below
        </Typography>

        {/* Email Input (Underline only) */}
        <TextField
          fullWidth
          placeholder="example@email.com"
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

        {/* Password Input (Underline only, with toggle) */}
        <TextField
          fullWidth
          type={showPassword ? "text" : "password"}
          placeholder="••••••••"
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
          sx={{ mb: 1 }}
        />

        {/* Forget Password */}
        <Typography variant="caption" align="right" display="block" mb={3}>
          <a href="#" style={{ color: "#666", textDecoration: "none" }}>
            Forget password?
          </a>
        </Typography>

        {/* Sign In Button */}
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
          Sign in
        </Button>

        {/* Divider */}
        <Box display="flex" alignItems="center" mb={2}>
          <Divider sx={{ flexGrow: 1 }} />
          <Typography mx={2} variant="caption" color="text.secondary">
            or continue
          </Typography>
          <Divider sx={{ flexGrow: 1 }} />
        </Box>

        {/* Google Sign In */}
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
          Log in with Google
        </Button>

        {/* Sign Up Link */}
        <Typography mt={3} variant="caption" textAlign="center" display="block">
          Don’t have an account?{" "}
          <a href="#" style={{ fontWeight: 500, textDecoration: "none" }}>
            Sign Up
          </a>
        </Typography>
      </Box>
    </Box>
  );
}
