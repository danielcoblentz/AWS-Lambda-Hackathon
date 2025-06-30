import {
  Box,
  Typography,
  TextField,
  Button,
  Divider,
  InputAdornment,
  IconButton,
  Snackbar,
} from "@mui/material";
import GoogleIcon from "@mui/icons-material/Google";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const COGNITO_CLIENT_ID = import.meta.env.VITE_COGNITO_CLIENT_ID;
const COGNITO_REGION = import.meta.env.VITE_COGNITO_REGION;
const COGNITO_ENDPOINT = `https://cognito-idp.${COGNITO_REGION}.amazonaws.com/`;

export default function Signup() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleSignup = async () => {
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      const response = await fetch(COGNITO_ENDPOINT, {
        method: "POST",
        headers: {
          "Content-Type": "application/x-amz-json-1.1",
          "X-Amz-Target": "AWSCognitoIdentityProviderService.SignUp",
        },
        body: JSON.stringify({
          ClientId: COGNITO_CLIENT_ID,
          Username: name,
          Password: password,
          UserAttributes: [
            { Name: "email", Value: email },
            { Name: "name", Value: name },
          ],
        }),
      });

      const result = await response.json();

      if (!result.__type) {
        sessionStorage.setItem("verificationEmail", name);
        sessionStorage.setItem("tempPassword", password);
        navigate("/verify");
      } else {
        setError(result.message || "Signup failed.");
      }
    } catch {
      setError("Network or Cognito error occurred.");
    }
  };

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
        <Typography variant="h6" fontWeight="bold" mb={2}>
          Sift
        </Typography>

        <Typography variant="h5" fontWeight="bold" mb={1}>
          Create Your Account
        </Typography>
        <Typography variant="body2" color="text.secondary" mb={4}>
          Please fill in the details below
        </Typography>

        <TextField
          fullWidth
          placeholder="Jane Doe"
          variant="standard"
          value={name}
          onChange={(e) => setName(e.target.value)}
          InputProps={{ disableUnderline: false, sx: { pb: 2 } }}
          sx={{ mb: 3, "& .MuiInputBase-input": { fontSize: "1rem" } }}
        />

        <TextField
          fullWidth
          placeholder="example@email.com"
          variant="standard"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          InputProps={{ disableUnderline: false, sx: { pb: 2 } }}
          sx={{ mb: 3 }}
        />

        <TextField
          fullWidth
          type={showPassword ? "text" : "password"}
          placeholder="Create a password"
          variant="standard"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
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

        <TextField
          fullWidth
          type={showConfirmPassword ? "text" : "password"}
          placeholder="Confirm password"
          variant="standard"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
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

        <Button
          fullWidth
          variant="contained"
          onClick={handleSignup}
          sx={{
            bgcolor: "#000",
            color: "#fff",
            textTransform: "none",
            borderRadius: "12px",
            py: 1.5,
            fontWeight: 600,
            mb: 2,
            "&:hover": { bgcolor: "#222" },
          }}
        >
          Create Account
        </Button>

        <Box display="flex" alignItems="center" mb={2}>
          <Divider sx={{ flexGrow: 1 }} />
          <Typography mx={2} variant="caption" color="text.secondary">
            or continue
          </Typography>
          <Divider sx={{ flexGrow: 1 }} />
        </Box>

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

        <Typography mt={3} variant="caption" textAlign="center" display="block">
          Already have an account?{" "}
          <a href="/login" style={{ fontWeight: 500, textDecoration: "none" }}>
            Log In
          </a>
        </Typography>

        <Snackbar
          open={!!error}
          autoHideDuration={3000}
          onClose={() => setError("")}
          message={error}
          anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        />
      </Box>
    </Box>
  );
}
