import {Box,List,ListItemButton,ListItemIcon,ListItemText,Typography,IconButton,} from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import SearchIcon from "@mui/icons-material/ManageSearch";
import IntegrationIcon from "@mui/icons-material/Extension";
import AccountIcon from "@mui/icons-material/Person";
import MenuIcon from "@mui/icons-material/Menu";
import { useLocation } from "react-router-dom";
import { Link as RouterLink } from "react-router-dom";
import { useState } from "react";

//nav links to other pages
import DashboardIcon from "@mui/icons-material/Dashboard";

const items = [
  { label: "Home", icon: <HomeIcon />, path: "/" },
  { label: "Scan", icon: <SearchIcon />, path: "/scan" },
  { label: "Dashboard", icon: <DashboardIcon />, path: "/dashboard" },
  { label: "Integrations", icon: <IntegrationIcon />, path: "/integrations" },
  { label: "Account", icon: <AccountIcon />, path: "/account" },
];

export default function SidebarNav() {
  const location = useLocation();
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <Box
      sx={{
        width: isCollapsed ? 80 : 260, //width depending on state of 'iscollapsed'
        height: "100vh",
        bgcolor: "#f9f9f9", 
        paddingTop: 4,
        paddingX: isCollapsed ? 1 : 2, // Adjust padding when collapsed
        borderRight: "1px solid #e0e0e0",
        display: "flex",
        flexDirection: "column",
        gap: 2,
        transition: "width 0.3s ease", 
      }}
    >
      {/* collapse button */}
      <IconButton
        onClick={() => setIsCollapsed(!isCollapsed)}
        sx={{
          alignSelf: "flex-end",
          marginBottom: 2,
        }}
      >
        <MenuIcon />
      </IconButton>

      {/* sidebar title (app name) */}
      {!isCollapsed && (
        <Typography variant="h6" fontWeight="bold" color="text.secondary" mb={2}>
          Sift
        </Typography>
      )}

      {/* Sidebar content/items */}
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
                justifyContent: isCollapsed ? "center" : "flex-start", 
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 36,
                  color: "#5f5f5f",
                  justifyContent: "center",
                }}
              >
                {icon}
              </ListItemIcon>
              {!isCollapsed && (
                <ListItemText
                  primary={
                    <Typography
                      sx={{
                        fontWeight: selected ? "bold" : 500,
                        color: "#3a3a3a",
                        fontSize: "12px",
                      }}
                    >
                      {label}
                    </Typography>
                  }
                />
              )}
            </ListItemButton>
          );
        })}
      </List>
    </Box>
  );
}