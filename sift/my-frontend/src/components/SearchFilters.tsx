import {
    Box,
    IconButton,
    Menu,
    MenuItem,
    Tooltip,
  } from "@mui/material";
  import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
  import EventIcon from "@mui/icons-material/Event";
  import StorefrontIcon from "@mui/icons-material/Storefront";
  import { useState } from "react";
  
  const years = ["2024", "2023", "2022"];
  const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];
  const vendors = ["Amazon", "Chipotle", "CVS", "Target", "Uber", "Starbucks"];
  
  export default function SearchFilters() {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const [menuType, setMenuType] = useState<"year" | "month" | "vendor" | null>(null);
  
    const openMenu = (type: typeof menuType) => (e: React.MouseEvent<HTMLElement>) => {
      setAnchorEl(e.currentTarget);
      setMenuType(type);
    };
  
    const closeMenu = () => {
      setAnchorEl(null);
      setMenuType(null);
    };
  
    const handleSelect = (value: string) => {
      console.log("Selected", menuType, value);
      closeMenu();
    };
  
    const renderMenuItems = () => {
      const data = menuType === "year" ? years : menuType === "month" ? months : vendors;
      return data.map((item) => (
        <MenuItem key={item} onClick={() => handleSelect(item)}>
          {item}
        </MenuItem>
      ));
    };
  
    return (
      <Box display="flex" justifyContent="center" gap={2} mt={2}>
        <Tooltip title="Filter by Year">
          <IconButton onClick={openMenu("year")}>
            <CalendarMonthIcon />
          </IconButton>
        </Tooltip>
  
        <Tooltip title="Filter by Month">
          <IconButton onClick={openMenu("month")}>
            <EventIcon />
          </IconButton>
        </Tooltip>
  
        <Tooltip title="Filter by Vendor">
          <IconButton onClick={openMenu("vendor")}>
            <StorefrontIcon />
          </IconButton>
        </Tooltip>
  
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={closeMenu}
          anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
          transformOrigin={{ vertical: "top", horizontal: "center" }}
        >
          {renderMenuItems()}
        </Menu>
      </Box>
    );
  }
  