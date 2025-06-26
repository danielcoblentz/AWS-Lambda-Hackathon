import {Box,IconButton,Menu,MenuItem,Stack,Typography,Button,} from "@mui/material";
  import MoreVertIcon from "@mui/icons-material/MoreVert";
  import { useState } from "react";
  import { Link, useLocation } from "react-router-dom";
  
  //nav to other pages
  const navLinks = [
    { label: "Home", path: "/" },
    { label: "Scan", path: "/scan" },
    { label: "Integrations", path: "/integrations" },
    { label: "Account", path: "/account" },
  ];
  
  export default function TopNavBar() {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const location = useLocation();
  
    const handleMenuOpen = (e: React.MouseEvent<HTMLElement>) => {
      setAnchorEl(e.currentTarget);
    };
    const handleMenuClose = () => {
      setAnchorEl(null);
    };
  
    return (
      <Box
        component="header"
        sx={{
          width: "100%",
          px: 4,
          py: 2,
          bgcolor: "#f9f9f9",
          borderBottom: "1px solid #e0e0e0",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        {/* app name */}
        <Typography
          variant="h6"
          fontWeight="bold"
          color="text.secondary"
          sx={{ userSelect: "none" }}
        >
          Sift
        </Typography>
  
        {/* Nav links */}
        <Stack direction="row" spacing={2}>
          {navLinks.map((link) => (
            <Button
              key={link.path}
              component={Link}
              to={link.path}
              size="small"
              sx={{
                textTransform: "none",
                color: location.pathname === link.path ? "#000" : "text.secondary",
                fontWeight: location.pathname === link.path ? "bold" : 500,
                px: 1.5,
                py: 0.5,
                fontSize: "0.875rem",
                borderRadius: "8px",
                bgcolor: location.pathname === link.path ? "#eaeaea" : "transparent",
                "&:hover": {
                  backgroundColor: "#f0f0f0",
                },
              }}
            >
              {link.label}
            </Button>
          ))}
  
          {/* more / menu */}
          <IconButton onClick={handleMenuOpen}>
            <MoreVertIcon />
          </IconButton>
          <Menu
            anchorEl={anchorEl}
            open={open}
            onClose={handleMenuClose}
            anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
            transformOrigin={{ vertical: "top", horizontal: "right" }}
          >
            <MenuItem onClick={handleMenuClose}>Settings</MenuItem>
            <MenuItem onClick={handleMenuClose}>Log out</MenuItem>
          </Menu>
        </Stack>
      </Box>
    );
  }
  