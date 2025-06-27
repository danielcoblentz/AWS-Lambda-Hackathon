import {
  Box,
  Typography,
  Paper,
  Divider,
  LinearProgress,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
  ToggleButton,
  ToggleButtonGroup,
  Fade,
  MenuItem,
  FormControl,
  Select,
  InputLabel,
} from "@mui/material";
import { useEffect, useState } from "react";
import ReceiptIcon from "@mui/icons-material/Receipt";
import StoreIcon from "@mui/icons-material/Store";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import TopNavBar from "../components/TopNavBar";


//sample data in here rn changing later
export default function MainDashboard() {
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState<'month' | 'year'>('month');
  const [filterVendor, setFilterVendor] = useState('All');
  const [filterMonth, setFilterMonth] = useState('All');

  const [data, setData] = useState({
    receipts: 128,
    topVendor: "Amazon",
    average: 34.28,
    vendorTotals: {
      month: [
        { name: "Amazon", amount: 122 },
        { name: "Target", amount: 95 },
        { name: "Chipotle", amount: 74 },
        { name: "Starbucks", amount: 61 },
        { name: "Walmart", amount: 53 },
      ],
      year: [
        { name: "Amazon", amount: 612 },
        { name: "Target", amount: 480 },
        { name: "Chipotle", amount: 342 },
        { name: "Starbucks", amount: 310 },
        { name: "Walmart", amount: 280 },
      ],
    },
    monthlyTotals: [
      { month: "January", amount: 200 },
      { month: "February", amount: 180 },
      { month: "March", amount: 220 },
      { month: "April", amount: 150 },
      { month: "May", amount: 270 },
      { month: "June", amount: 190 },
      { month: "July", amount: 210 },
      { month: "August", amount: 195 },
      { month: "September", amount: 240 },
      { month: "October", amount: 260 },
      { month: "November", amount: 230 },
      { month: "December", amount: 280 },
    ],
    transactions: [
      { vendor: "Amazon", date: "2024-06-24", amount: 43.19 },
      { vendor: "Target", date: "2024-06-21", amount: 98.45 },
      { vendor: "Chipotle", date: "2024-06-20", amount: 14.78 },
      { vendor: "Starbucks", date: "2024-06-18", amount: 5.95 },
    ],
  });

  useEffect(() => {
    setTimeout(() => setLoading(false), 1000);
  }, []);

  const handleToggle = (_: any, next: 'month' | 'year') => {
    if (next !== null) setViewMode(next);
  };

  const filteredTransactions = data.transactions.filter(tx => {
    const matchesVendor = filterVendor === 'All' || tx.vendor === filterVendor;
    const matchesMonth = filterMonth === 'All' || tx.date.startsWith(`2024-${filterMonth}`);
    return matchesVendor && matchesMonth;
  });

  const uniqueVendors = Array.from(new Set(data.transactions.map(tx => tx.vendor)));
  const uniqueMonths = Array.from(new Set(data.transactions.map(tx => tx.date.slice(5, 7))));

  return (
    <Box bgcolor="#fff" minHeight="100vh">
      <TopNavBar />

      <Box px={3} py={4} display="flex" flexDirection="column" alignItems="center">
        <Box width="100%" maxWidth="1200px" mb={4}>
          <Typography variant="h5" fontWeight="bold" mb={3}>
            Dashboard Overview
          </Typography>

          {/* Summary Cards */}
          <Box display="flex" justifyContent="center" gap={3} flexWrap="wrap" mb={4}>
            {[{
              icon: <ReceiptIcon sx={{ fontSize: 28, color: "#555" }} />, label: "Total Receipts", value: data.receipts
            }, {
              icon: <StoreIcon sx={{ fontSize: 28, color: "#555" }} />, label: "Top Vendor", value: data.topVendor
            }, {
              icon: <TrendingUpIcon sx={{ fontSize: 28, color: "#555" }} />, label: "Avg / Receipt", value: `$${data.average.toFixed(2)}`
            }].map((card, index) => (
              <Paper key={index} sx={{ p: 3, borderRadius: 3, backgroundColor: "#f9f9f9", width: 260 }}>
                <Box display="flex" alignItems="center" gap={2}>
                  {card.icon}
                  <Box>
                    <Typography variant="body2" color="text.secondary">{card.label}</Typography>
                    <Typography variant="h6" fontWeight="bold">{card.value}</Typography>
                  </Box>
                </Box>
              </Paper>
            ))}
          </Box>

          {/* Side-by-side: Spending by Vendor + Month-over-Month */}
          <Box display="flex" gap={3} mb={4} flexDirection={{ xs: 'column', md: 'row' }}>
            <Box flex={3}>
              <Paper sx={{ p: 3, borderRadius: 3, backgroundColor: "#f9f9f9" }}>
                <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                  <Typography fontWeight="bold">Spending by Vendor</Typography>
                  <ToggleButtonGroup size="small" value={viewMode} exclusive onChange={handleToggle}>
                    <ToggleButton value="month">Month</ToggleButton>
                    <ToggleButton value="year">Year</ToggleButton>
                  </ToggleButtonGroup>
                </Box>
                <Fade in timeout={500}>
                  <Box>
                    {data.vendorTotals[viewMode].map((v) => (
                      <Box key={v.name} mb={1}>
                        <Box display="flex" justifyContent="space-between">
                          <Typography variant="body2">{v.name}</Typography>
                          <Typography variant="body2">${v.amount.toFixed(2)}</Typography>
                        </Box>
                        <LinearProgress
                          variant="determinate"
                          value={(v.amount / 500) * 100}
                          sx={{ height: 6, borderRadius: 2, backgroundColor: "#eaeaea", mt: 0.5 }}
                        />
                      </Box>
                    ))}
                  </Box>
                </Fade>
              </Paper>
            </Box>

            <Box flex={2}>
              <Paper sx={{ p: 3, borderRadius: 3, backgroundColor: "#f9f9f9", maxHeight: 300, overflowY: 'auto' }}>
                <Typography fontWeight="bold" mb={2}>Month-over-Month Spending</Typography>
                {data.monthlyTotals.map((entry) => (
                  <Box key={entry.month} mb={1}>
                    <Box display="flex" justifyContent="space-between">
                      <Typography variant="body2">{entry.month}</Typography>
                      <Typography variant="body2">${entry.amount.toFixed(2)}</Typography>
                    </Box>
                    <LinearProgress
                      variant="determinate"
                      value={(entry.amount / 300) * 100}
                      sx={{ height: 6, borderRadius: 2, backgroundColor: "#eaeaea", mt: 0.5 }}
                    />
                  </Box>
                ))}
              </Paper>
            </Box>
          </Box>

          {/* Transactions full width */}
          <Box width="100%">
            <Paper sx={{ p: 3, borderRadius: 3, backgroundColor: "#f9f9f9" }}>
              <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                <Typography fontWeight="bold">Recently Uploaded Receipts</Typography>
                <Box display="flex" gap={2}>
                  <FormControl size="small">
                    <InputLabel>Vendor</InputLabel>
                    <Select value={filterVendor} label="Vendor" onChange={(e) => setFilterVendor(e.target.value)}>
                      <MenuItem value="All">All</MenuItem>
                      {uniqueVendors.map(v => <MenuItem key={v} value={v}>{v}</MenuItem>)}
                    </Select>
                  </FormControl>
                  <FormControl size="small">
                    <InputLabel>Month</InputLabel>
                    <Select value={filterMonth} label="Month" onChange={(e) => setFilterMonth(e.target.value)}>
                      <MenuItem value="All">All</MenuItem>
                      {uniqueMonths.map(m => <MenuItem key={m} value={m}>{m}</MenuItem>)}
                    </Select>
                  </FormControl>
                </Box>
              </Box>
              <List>
                {filteredTransactions.map((tx) => (
                  <ListItem
                    key={tx.vendor + tx.date}
                    sx={{ px: 2, borderBottom: "1px solid #eee", alignItems: "center" }}
                    secondaryAction={<Typography fontWeight="bold" fontSize={14}>${tx.amount.toFixed(2)}</Typography>}
                  >
                    <ListItemAvatar>
                      <Avatar sx={{ bgcolor: "#ccc", fontSize: 14 }}>{tx.vendor[0]}</Avatar>
                    </ListItemAvatar>
                    <ListItemText
                      primary={tx.vendor}
                      secondary={tx.date}
                      primaryTypographyProps={{ fontWeight: 500, fontSize: 14 }}
                      secondaryTypographyProps={{ fontSize: 12, color: "text.secondary" }}
                    />
                  </ListItem>
                ))}
              </List>
            </Paper>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
