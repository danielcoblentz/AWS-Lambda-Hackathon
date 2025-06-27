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
    ToggleButton,
    ToggleButtonGroup,
    Fade,
  } from "@mui/material";
  import { useEffect, useState } from "react";
  import ReceiptIcon from "@mui/icons-material/Receipt";
  import StoreIcon from "@mui/icons-material/Store";
  import TrendingUpIcon from "@mui/icons-material/TrendingUp";
  import TopNavBar from "../components/TopNavBar";

  
  export default function MainDashboard() {
    const [loading, setLoading] = useState(true);
    const [viewMode, setViewMode] = useState<'month' | 'year'>('month');
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
        ],
        year: [
          { name: "Amazon", amount: 612 },
          { name: "Target", amount: 480 },
          { name: "Chipotle", amount: 342 },
          { name: "Starbucks", amount: 310 },
        ],
      },
      monthlyTotals: [
        { month: "January", amount: 200 },
        { month: "February", amount: 180 },
        { month: "March", amount: 220 },
        { month: "April", amount: 150 },
        { month: "May", amount: 270 },
        { month: "June", amount: 190 },
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
  
    return (
      <Box bgcolor="#fff" minHeight="100vh">
        <TopNavBar />
  
        <Box px={3} py={4} display="flex" flexDirection="column" alignItems="center">
          <Typography variant="h5" fontWeight="bold" mb={4}>
            Dashboard Overview
          </Typography>
  
          <Grid container spacing={3} maxWidth="1200px">
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
  
            <Grid item xs={12} md={6}>
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
            </Grid>
  
            <Grid item xs={12} md={6}>
              <Paper sx={{ p: 3, borderRadius: 3, backgroundColor: "#f9f9f9", height: '100%' }}>
                <Typography fontWeight="bold" mb={2}>
                  Month-over-Month Spending
                </Typography>
                <Box>
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
                </Box>
              </Paper>
            </Grid>
  
            {/* Recent Transactions */}
            <Grid item xs={12}>
              <Box width="90%" mx="auto">
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
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Box>
    );
  }
  