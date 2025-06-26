import { TextField, InputAdornment, IconButton, Box, Typography } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';

export default function MainHero() {
  return (
    <Box
      display="flex"
      flexDirection="column" // Stack header and search bar vertically
      justifyContent="center" // Center horizontally
      alignItems="center" // Center vertically
      minHeight="100vh" // Full viewport height
      bgcolor="#fff"
      px={2} // Padding to prevent touching edges
      width="100%" // Full width container
    >
      <Typography
        variant="h5" // Slightly smaller header text
        sx={{
          fontWeight: 'bold',
          color: '#3a3a3a',
          mb: 2, // Margin below the header
        }}
      >
        Search for Documents
      </Typography>
      <Box width="100%" maxWidth="1200px"> {/* Wrapper for max width */}
        <TextField
          placeholder="search by doc name, date or vendor"
          variant="outlined"
          fullWidth
          sx={{
            width: '100%', // Full width
            height: 48, // Adjust height to make it shorter
            borderRadius: 5,
            backgroundColor: '#f5f5f5',
            '& .MuiOutlinedInput-root': {
              borderRadius: '999px',
              height: '100%', // Ensure the input matches the height
            },
          }}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton edge="end">
                  <SendIcon />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </Box>
    </Box>
  );
}