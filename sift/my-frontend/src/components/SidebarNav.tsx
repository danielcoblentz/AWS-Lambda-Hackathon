import {
  Box,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import SearchIcon from "@mui/icons-material/ManageSearch";
import IntegrationIcon from "@mui/icons-material/Extension";
import AccountIcon from "@mui/icons-material/Person";
import { useLocation } from "react-router-dom";
import { Link as RouterLink } from "react-router-dom";

const items = [
  { label: "Home", icon: <HomeIcon />, path: "/" },
  { label: "Scan", icon: <SearchIcon />, path: "/scan" },
  { label: "Integrations", icon: <IntegrationIcon />, path: "/integrations" },
  { label: "Account", icon: <AccountIcon />, path: "/account" },
];

export default function SidebarNav() {
  const location = useLocation();

  return (
    <Box
      sx={{
        width: 260,
        height: "100vh",
        bgcolor: "#f9f9f9", // sidebar background
        paddingTop: 4,
        paddingX: 2,
        borderRight: "1px solid #e0e0e0",
        display: "flex",
        flexDirection: "column",
        gap: 2,
      }}
    >
      <Typography variant="h6" fontWeight="bold" color="text.secondary" mb={2}>
        Sift
      </Typography>

      <List disablePadding>
        {items.map(({ label, icon, path }) => {
          const selected = location.pathname === path;

          return (
            <ListItemButton
              key={label}
              component={RouterLink}
              to={path}
              selected={selected}
              sx={{
                borderRadius: "999px",
                marginBottom: 1,
                backgroundColor: selected ? "#eaeaea" : "transparent",
                "&:hover": {
                  backgroundColor: selected ? "#eaeaea" : "#f0f0f0",
                },
              }}
            >
              <ListItemIcon sx={{ minWidth: 36, color: "#5f5f5f" }}>
                {icon}
              </ListItemIcon>
              <ListItemText
                primary={
                  <Typography
                    sx={{ fontWeight: selected ? "bold" : 500, color: "#3a3a3a", fontSize: "12px", }}
                  >
                    {label}
                  </Typography>
                }
              />
            </ListItemButton>
          );
        })}
      </List>
    </Box>
  );
}
