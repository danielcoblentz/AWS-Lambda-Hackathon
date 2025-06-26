import {
    Avatar,
    Box,
    IconButton,
    Menu,
    MenuItem,
    Stack,
  } from "@mui/material";
  import MoreVertIcon from "@mui/icons-material/MoreVert";
  import { useState } from "react";
  
  export default function TopNavBar() {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
  
    const handleOpenMenu = (event: React.MouseEvent<HTMLElement>) => {
      setAnchorEl(event.currentTarget);
    };
  
    const handleCloseMenu = () => {
      setAnchorEl(null);
    };
  
    return (
      <Box
        component="header"
        sx={{
          width: "100%",
          px: 3,
          py: 2,
          display: "flex",
          justifyContent: "flex-end",
          alignItems: "center",
          bgcolor: "#fff",
        }}
      >
        <Stack direction="row" spacing={2} alignItems="center">
          <Avatar sx={{ width: 40, height: 40, bgcolor: "#ccc" }}>D</Avatar>
  
          <IconButton
            aria-label="more options"
            onClick={handleOpenMenu}
            sx={{ color: "#555" }}
          >
            <MoreVertIcon />
          </IconButton>
  
          <Menu
            anchorEl={anchorEl}
            open={open}
            onClose={handleCloseMenu}
            anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
            transformOrigin={{ vertical: "top", horizontal: "right" }}
            elevation={2}
          >
            <MenuItem onClick={handleCloseMenu}>Placeholder 1</MenuItem>
            <MenuItem onClick={handleCloseMenu}>Placeholder 2</MenuItem>
          </Menu>
        </Stack>
      </Box>
    );
  }
  