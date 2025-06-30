import {Box,Typography,LinearProgress,Paper,TextField,InputAdornment,IconButton,Modal,} from "@mui/material";
import Grid from "@mui/material/Grid";
import SendIcon from "@mui/icons-material/Send";
import FolderIcon from "@mui/icons-material/Folder";
import { useState, useEffect } from "react";
import { SimpleTreeView } from "@mui/x-tree-view/SimpleTreeView";
import CustomTreeItem from "../components/CustomTreeItem";
import SearchFilters from "../components/SearchFilters";
import TopNavBar from "../components/TopNavBar";


export default function MainHero() {
  const [loading, setLoading] = useState(true);
  const [documents, setDocuments] = useState<Array<{ title: string; vendor: string; date: string }>>([]);
  const [graphOpen, setGraphOpen] = useState(false);
  const [treeData, setTreeData] = useState<any>({
    "2024": {
      January: ["Amazon - Order #123.pdf"],
    },
  });
  const [selectedFolderPath, setSelectedFolderPath] = useState<string | null>(null);
  const [renamingPath, setRenamingPath] = useState<string | null>(null);

  const handleOpenGraph = () => setGraphOpen(true);
  const handleCloseGraph = () => setGraphOpen(false);

  const handleClickTreeItem = (path: string) => {
    setSelectedFolderPath(path);
  };

  const addFolderAtPath = (path: string[]) => {
    const name = `New Folder ${Date.now()}`;
    setTreeData((prev: any) => {
      const updated = { ...prev };
      let node: any = updated;
      for (const part of path) {
        node[part] = node[part] || {};
        node = node[part];
      }
      node[name] = {};
      return updated;
    });
    setRenamingPath(path.concat(name).join("/"));
  };

  const addFolder = () => {
    const basePath = selectedFolderPath ? selectedFolderPath.split("/") : ["2024"];
    addFolderAtPath(basePath);
  };

  const handleRename = (path: string, newName: string) => {
    const parts = path.split("/");
    const name = parts.pop();
    const parentPath = parts;
    setTreeData((prev: any) => {
      const updated = { ...prev };
      let node: any = updated;
      for (const part of parentPath) {
        node = node[part];
      }
      const contents = node[name!];
      delete node[name!];
      node[newName] = contents;
      return updated;
    });
    setRenamingPath(null);
  };

  useEffect(() => {
    setTimeout(() => {
      setDocuments([
        { title: "Grocery Receipt", vendor: "Target", date: "2024-08-01" },
        { title: "Gas Station", vendor: "Shell", date: "2024-07-28" },
        { title: "Utilities Bill", vendor: "BGE", date: "2024-07-25" },
        { title: "Lunch Receipt", vendor: "Chipotle", date: "2024-07-22" },
        { title: "Hardware Store", vendor: "Home Depot", date: "2024-07-20" },
        { title: "Coffee", vendor: "Starbucks", date: "2024-07-19" },
      ]);
      setLoading(false);
    }, 2000);
  }, []);

  const renderTree = (node: any, path: string[] = []) => {
    return Object.entries(node).map(([key, value]) => {
      const fullPath = path.concat(key);
      const fullPathStr = fullPath.join("/");
      const isFolder = typeof value === "object" && !Array.isArray(value);

      return (
        <CustomTreeItem
          key={fullPathStr}
          itemId={fullPathStr}
          label={
            renamingPath === fullPathStr ? (
              <TextField
                defaultValue={key}
                size="small"
                variant="standard"
                onBlur={(e) => handleRename(fullPathStr, e.target.value)}
                autoFocus
              />
            ) : (
              key
            )
          }
          onClick={() => handleClickTreeItem(fullPathStr)}
        >
          {isFolder && renderTree(value, fullPath)}
        </CustomTreeItem>
      );
    });
  };

  return (
    <Box width="100%" minHeight="100vh" bgcolor="#fff">
      <TopNavBar />
      <Box height="64px" />

      <Box
        px={2}
        py={3}
        width="100%"
        maxWidth="1200px"
        mx="auto"
        display="flex"
        flexDirection="column"
        alignItems="center"
      >
        {/* recent docs */}
        <Box width="100%" mb={6}>
          <Typography variant="subtitle1" fontWeight="bold" mb={1} textAlign="center">
            Recent Documents
          </Typography>

          {loading ? (
            <LinearProgress />
          ) : (
            <Grid container spacing={2} justifyContent="center">
              {documents.slice(0, 12).map((doc, index) => (
                <Grid key={index} item xs={12} sm={6} md={3}>
                  <Paper elevation={1} sx={{ p: 2, borderRadius: 2 }}>
                    <Typography variant="body1" fontWeight="bold">
                      {doc.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {doc.vendor}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      {doc.date}
                    </Typography>
                  </Paper>
                </Grid>
              ))}
            </Grid>
          )}
        </Box>

        {/* search header */}
        <Typography variant="h5" fontWeight="bold" color="#3a3a3a" mb={2}>
          Search for Documents
        </Typography>

        {/* search bar */}
        <Box width="100%" mb={4}>
          <Box
            sx={{
              borderRadius: "30px",
              backgroundColor: "#f5f5f5",
              px: 2,
              py: 1.5,
              display: "flex",
              flexDirection: "column",
              gap: 1,
              boxShadow: "0px 1px 3px rgba(0,0,0,0.08)",
            }}
          >
            <TextField
              placeholder="What are we looking for?..."
              variant="standard"
              InputProps={{
                disableUnderline: true,
                sx: { px: 1 },
              }}
              fullWidth
            />

            <Box display="flex" alignItems="center" justifyContent="space-between" mt={1}>
              <Box display="flex" alignItems="center" gap={1}>
                <SearchFilters />
              </Box>
              <Box display="flex" alignItems="center" gap={1}>
                <IconButton onClick={handleOpenGraph}>
                  <FolderIcon />
                </IconButton>
                <IconButton>
                  <SendIcon sx={{ color: "#000" }} />
                </IconButton>
              </Box>
            </Box>
          </Box>
        </Box>

        {/* graph view modal */}
        <Modal open={graphOpen} onClose={handleCloseGraph}>
          <Box
            onClick={(e) => {
              if (e.target === e.currentTarget) {
                setSelectedFolderPath(null);
                addFolder();
              }
            }}
            sx={{
              position: "absolute",
              top: "5%",
              left: "12.5%",
              width: "75vw",
              maxHeight: "90vh",
              bgcolor: "#fdfdfd",
              boxShadow: 24,
              p: 3,
              borderRadius: 3,
              overflowY: "auto",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <TextField
              variant="outlined"
              placeholder="Search for document..."
              size="small"
              sx={{
                mb: 2,
                bgcolor: "#fff",
                borderRadius: 2,
                "& .MuiOutlinedInput-root": {
                  borderRadius: 2,
                },
              }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <FolderIcon sx={{ color: "#aaa" }} />
                  </InputAdornment>
                ),
              }}
            />

            <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
              <Typography variant="subtitle1">File Explorer</Typography>
              <IconButton onClick={addFolder}>
                <FolderIcon />
              </IconButton>
            </Box>

            <SimpleTreeView>{renderTree(treeData)}</SimpleTreeView>
          </Box>
        </Modal>
      </Box>
    </Box>
  );
}
