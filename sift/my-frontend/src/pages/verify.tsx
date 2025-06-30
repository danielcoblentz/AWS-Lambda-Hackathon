import {
    Box,
    Typography,
    Button,
    TextField,
    Snackbar,
  } from "@mui/material";
  import { useState, useRef, useEffect } from "react";
  import { useNavigate } from "react-router-dom";
  
  const COGNITO_CLIENT_ID = import.meta.env.VITE_COGNITO_CLIENT_ID;
  const COGNITO_REGION = import.meta.env.VITE_COGNITO_REGION;
  const COGNITO_ENDPOINT = `https://cognito-idp.${COGNITO_REGION}.amazonaws.com/`;
  
  export default function Verify() {
    const navigate = useNavigate();
    const [username, setUsername] = useState("");
    const [codeDigits, setCodeDigits] = useState(["", "", "", "", "", ""]);
    const [error, setError] = useState("");
    const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  
    useEffect(() => {
      const savedUsername = sessionStorage.getItem("verificationEmail");
      if (savedUsername) setUsername(savedUsername);
    }, []);
  
    const handleDigitChange = (value: string, index: number) => {
      if (!/^[0-9a-zA-Z]?$/.test(value)) return;
  
      const updated = [...codeDigits];
      updated[index] = value;
      setCodeDigits(updated);
  
      if (value && index < 5) {
        inputRefs.current[index + 1]?.focus();
      }
    };
  
    const handleVerify = async () => {
      const code = codeDigits.join("");
  
      try {
        const response = await fetch(COGNITO_ENDPOINT, {
          method: "POST",
          headers: {
            "Content-Type": "application/x-amz-json-1.1",
            "X-Amz-Target": "AWSCognitoIdentityProviderService.ConfirmSignUp",
          },
          body: JSON.stringify({
            ClientId: COGNITO_CLIENT_ID,
            Username: username,
            ConfirmationCode: code,
          }),
        });
  
        const result = await response.json();
  
        if (!result.__type) {
          const tempPassword = sessionStorage.getItem("tempPassword") || "";
  
          if (tempPassword) {
            const loginResponse = await fetch(COGNITO_ENDPOINT, {
              method: "POST",
              headers: {
                "Content-Type": "application/x-amz-json-1.1",
                "X-Amz-Target": "AWSCognitoIdentityProviderService.InitiateAuth",
              },
              body: JSON.stringify({
                AuthFlow: "USER_PASSWORD_AUTH",
                ClientId: COGNITO_CLIENT_ID,
                AuthParameters: {
                  USERNAME: username,
                  PASSWORD: tempPassword,
                },
              }),
            });
  
            const loginResult = await loginResponse.json();
  
            if (loginResult.AuthenticationResult?.IdToken) {
              localStorage.setItem(
                "idToken",
                loginResult.AuthenticationResult.IdToken
              );
              sessionStorage.removeItem("verificationEmail");
              sessionStorage.removeItem("tempPassword");
              navigate("/dashboard");
              return;
            }
          }
  
          sessionStorage.removeItem("verificationEmail");
          sessionStorage.removeItem("tempPassword");
          navigate("/login");
        } else {
          setError(result.message || "Verification failed.");
        }
      } catch {
        setError("Network error during verification.");
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
            Enter Verification Code
          </Typography>
          <Typography variant="body2" color="text.secondary" mb={4}>
            Sent to your email. Enter the 6-digit code below.
          </Typography>
  
          <TextField
            fullWidth
            placeholder="Username"
            variant="standard"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            InputProps={{ disableUnderline: false, sx: { pb: 2 } }}
            sx={{ mb: 4 }}
          />
  
          <Box display="flex" justifyContent="space-between" mb={4}>
            {codeDigits.map((digit, index) => (
              <TextField
                key={index}
                inputRef={(el) => (inputRefs.current[index] = el)}
                value={digit}
                onChange={(e) => handleDigitChange(e.target.value, index)}
                inputProps={{
                  maxLength: 1,
                  style: {
                    textAlign: "center",
                    fontSize: "1.5rem",
                    width: "40px",
                  },
                }}
                variant="standard"
                InputProps={{ disableUnderline: false }}
              />
            ))}
          </Box>
  
          <Button
            fullWidth
            variant="contained"
            onClick={handleVerify}
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
            Confirm
          </Button>
  
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
  