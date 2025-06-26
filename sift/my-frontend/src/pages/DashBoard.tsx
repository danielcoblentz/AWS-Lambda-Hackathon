import {
    Box,
    Typography,
    Paper,
    Grid,
    Divider,
    LinearProgress,
    List,
    ListItem,
    ListItemText,
    ListItemAvatar,
    Avatar,
  } from "@mui/material";
  import { useEffect, useState } from "react";
  import ReceiptIcon from "@mui/icons-material/Receipt";
  import StoreIcon from "@mui/icons-material/Store";
  import BarChartIcon from "@mui/icons-material/BarChart";
  import TrendingUpIcon from "@mui/icons-material/TrendingUp";
  
  export default function MainDashboard() {
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState({
      receipts: 128,
      topVendor: "Amazon",
      average: 34.28,
      byMonth: [
        { month: "Jan", amount: 110 },
        { month: "Feb", amount: 220 },
        { month: "Mar", amount: 175 },
        { month: "Apr", amount: 290 },
        { month: "May", amount: 245 },
        { month: "Jun", amount: 310 },
      ],
      byVendor: [
        { name: "Amazon", amount: 312 },
        { name: "Target", amount: 210 },
        { name: "Chipotle", amount: 145 },
        { name: "Starbucks", amount: 130 },
      ],
      transactions: [
        { vendor: "Amazon", date: "2024-06-24", amount: 43.19 },
        { vendor: "Target", date: "2024-06-21", amount: 98.45 },
        { vendor: "Chipotle", date: "2024-06-20", amount: 14.78 },
        { vendor: "Starbucks", date: "2024-06-18", amount: 5.95 },
      ],
    });
  
    useEffect(() => {
      setTimeout(() => {
        setLoading(false);
      }, 1000);
    }, []);
  
    return (
      <Box bgcolor="#fff" px={2} py={4} display="flex" flexDirection="column" alignItems="center" minHeight="100vh">
        <Typography variant="h5" fontWeight="bold" mb={4}>
          Dashboard Overview
        </Typography>
  
        <Grid container spacing={3} maxWidth="1200px">
          {/* Summary Cards */}
          <Grid item xs={12} md={4}>
            <Paper sx={{ p: 3, borderRadius: 3, backgroundColor: "#f9f9f9" }}>
              <Box display="flex" alignItems="center" gap={2}>
                <ReceiptIcon sx={{ fontSize: 28, color: "#555" }} />
                <Box>
                  <Typography variant="body2" color="text.secondary">
                    Total Receipts
                  </Typography>
                  <Typography variant="h6" fontWeight="bold">
                    {data.receipts}
                  </Typography>
                </Box>
              </Box>
            </Paper>
          </Grid>
          <Grid item xs={12} md={4}>
            <Paper sx={{ p: 3, borderRadius: 3, backgroundColor: "#f9f9f9" }}>
              <Box display="flex" alignItems="center" gap={2}>
                <StoreIcon sx={{ fontSize: 28, color: "#555" }} />
                <Box>
                  <Typography variant="body2" color="text.secondary">
                    Top Vendor
                  </Typography>
                  <Typography variant="h6" fontWeight="bold">
                    {data.topVendor}
                  </Typography>
                </Box>
              </Box>
            </Paper>
          </Grid>
          <Grid item xs={12} md={4}>
            <Paper sx={{ p: 3, borderRadius: 3, backgroundColor: "#f9f9f9" }}>
              <Box display="flex" alignItems="center" gap={2}>
                <TrendingUpIcon sx={{ fontSize: 28, color: "#555" }} />
                <Box>
                  <Typography variant="body2" color="text.secondary">
                    Avg / Receipt
                  </Typography>
                  <Typography variant="h6" fontWeight="bold">
                    ${data.average.toFixed(2)}
                  </Typography>
                </Box>
              </Box>
            </Paper>
          </Grid>
  
          {/* Spending by Month */}
          <Grid item xs={12} md={6}>
            <Paper sx={{ p: 3, borderRadius: 3, backgroundColor: "#f9f9f9" }}>
              <Typography fontWeight="bold" mb={2}>
                Spending by Month
              </Typography>
              {data.byMonth.map((month) => (
                <Box key={month.month} mb={1}>
                  <Box display="flex" justifyContent="space-between">
                    <Typography variant="body2">{month.month}</Typography>
                    <Typography variant="body2">${month.amount.toFixed(2)}</Typography>
                  </Box>
                  <LinearProgress
                    variant="determinate"
                    value={(month.amount / 400) * 100}
                    sx={{ height: 6, borderRadius: 2, backgroundColor: "#eaeaea", mt: 0.5 }}
                  />
                </Box>
              ))}
            </Paper>
          </Grid>
  
          {/* Vendor Breakdown */}
          <Grid item xs={12} md={6}>
            <Paper sx={{ p: 3, borderRadius: 3, backgroundColor: "#f9f9f9" }}>
              <Typography fontWeight="bold" mb={2}>
                Top Vendor Breakdown
              </Typography>
              {data.byVendor.map((vendor) => (
                <Box key={vendor.name} mb={1}>
                  <Box display="flex" justifyContent="space-between">
                    <Typography variant="body2">{vendor.name}</Typography>
                    <Typography variant="body2">${vendor.amount.toFixed(2)}</Typography>
                  </Box>
                  <LinearProgress
                    variant="determinate"
                    value={(vendor.amount / 400) * 100}
                    sx={{ height: 6, borderRadius: 2, backgroundColor: "#eaeaea", mt: 0.5 }}
                  />
                </Box>
              ))}
            </Paper>
          </Grid>
  
          {/* Transactions */}
          <Grid item xs={12}>
            <Paper sx={{ p: 3, borderRadius: 3, backgroundColor: "#f9f9f9" }}>
              <Typography fontWeight="bold" mb={2}>
                Recent Transactions
              </Typography>
              <List>
                {data.transactions.map((tx) => (
                  <ListItem key={tx.vendor + tx.date} sx={{ px: 1.5 }}>
                    <ListItemAvatar>
                      <Avatar sx={{ width: 32, height: 32, fontSize: 14, bgcolor: "#ccc" }}>
                        {tx.vendor[0]}
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText
                      primary={tx.vendor}
                      secondary={tx.date}
                      primaryTypographyProps={{ fontSize: 14, fontWeight: 500 }}
                      secondaryTypographyProps={{ fontSize: 12, color: "text.secondary" }}
                    />
                    <Typography fontSize={14} fontWeight="bold">
                      ${tx.amount.toFixed(2)}
                    </Typography>
                  </ListItem>
                ))}
              </List>
            </Paper>
          </Grid>
        </Grid>
      </Box>
    );
  }
  