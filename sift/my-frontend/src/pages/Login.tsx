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

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const payload = {
        AuthFlow: "USER_PASSWORD_AUTH",
        ClientId: COGNITO_CLIENT_ID,
        AuthParameters: {
          USERNAME: email,
          PASSWORD: password,
        },
      };

      const response = await fetch(COGNITO_ENDPOINT, {
        method: "POST",
        headers: {
          "Content-Type": "application/x-amz-json-1.1",
          "X-Amz-Target": "AWSCognitoIdentityProviderService.InitiateAuth",
        },
        body: JSON.stringify(payload),
      });

      const result = await response.json();

      if (result.ChallengeName === "NEW_PASSWORD_REQUIRED") {
        setError("New password required. This flow is not supported.");
        return;
      }

      if (result.ChallengeName === "SMS_MFA") {
        setError("MFA required. This flow is not supported.");
        return;
      }

      if (result.Session && !result.AuthenticationResult) {
        sessionStorage.setItem("verificationSession", result.Session);
        sessionStorage.setItem("verificationEmail", email);
        navigate("/verify");
      } else if (result.AuthenticationResult?.IdToken) {
        localStorage.setItem("idToken", result.AuthenticationResult.IdToken);
        navigate("/dashboard");
      } else {
        setError(result.message || "Login failed.");
      }
    } catch {
      setError("Network or Cognito error occurred.");
    }
  };

  return (
    <Box minHeight="100vh" display="flex" justifyContent="center" alignItems="center" bgcolor="#f5f7f9" px={2}>
      <Box
        width="100%"
        maxWidth="400px"
        bgcolor="#fff"
        borderRadius={4}
        px={4}
        py={6}
        boxShadow="0px 6px 18px rgba(0, 0, 0, 0.05)"
      >
        <Typography variant="h6" fontWeight="bold" mb={2}>Sift</Typography>
        <Typography variant="h5" fontWeight="bold" mb={1}>Welcome Back!</Typography>
        <Typography variant="body2" color="text.secondary" mb={4}>Please enter log in details below</Typography>

        <TextField
          fullWidth
          placeholder="example@email.com"
          variant="standard"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          InputProps={{ disableUnderline: false, sx: { pb: 2 } }}
          sx={{ mb: 3, '& .MuiInputBase-input': { fontSize: '1rem' } }}
        />

        <TextField
          fullWidth
          type={showPassword ? "text" : "password"}
          placeholder="••••••••"
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
          sx={{ mb: 1 }}
        />

        <Typography variant="caption" align="right" display="block" mb={3}>
          <a href="#" style={{ color: "#666", textDecoration: "none" }}>Forget password?</a>
        </Typography>

        <Button
          fullWidth
          variant="contained"
          onClick={handleLogin}
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

        <Box display="flex" alignItems="center" mb={2}>
          <Divider sx={{ flexGrow: 1 }} />
          <Typography mx={2} variant="caption" color="text.secondary">or continue</Typography>
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
          Log in with Google
        </Button>

        <Typography mt={3} variant="caption" textAlign="center" display="block">
          Don’t have an account?{" "}
          <a href="/signup" style={{ fontWeight: 500, textDecoration: "none" }}>
            Sign Up
          </a>
        </Typography>
      </Box>

      <Snackbar
        open={!!error}
        autoHideDuration={4000}
        onClose={() => setError("")}
        message={error}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      />
    </Box>
  );
}
