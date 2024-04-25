import React, { useEffect, useState } from "react";
import {
  Box,
  FormControl,
  InputBase,
  InputLabel,
  MenuItem,
  Pagination,
  Select,
  Stack,
  ThemeProvider,
  createTheme,
  styled,
  useMediaQuery,
} from "@mui/material";

import { DataGrid } from "@mui/x-data-grid";
import { axiosInstance } from "../../constants/environment";
import { formatUnits } from "viem";
const BootstrapInput = styled(InputBase)(({ theme }) => ({
  "label + &": {
    marginTop: theme.spacing(1),
    color: "white",
  },
  "& .MuiInputBase-input": {
    borderRadius: 4,
    position: "relative",
    background:
      "linear-gradient(90deg, rgba(37, 45, 48, 0.7) 2.94%, #ABE900 100%)",
    border: "1px solid white",
    fontSize: 16,
    width: "70px",
    padding: "10px 26px 10px 12px",
    transition: theme.transitions.create(["border-color", "box-shadow"]),
    // Use the system font instead of the default Roboto font.
    "&:focus": {
      borderRadius: 4,
      borderColor: "#80bdff",
      boxShadow: "0 0 0 0.2rem rgba(0,123,255,.25)",
    },
  },
}));
const theme = createTheme({
  components: {
    // Use `MuiDataGrid` on DataGrid, DataGridPro and DataGridPremium
    MuiDataGrid: {
      styleOverrides: {
        root: {
          ".MuiDataGrid-columnHeaders": {
            textAlign: "left",
            color: "#9899AC",
            fontSize: "14px",
            fontFamily: "Josefin Sans Variable,sans-serif",
            backgroundColor: "rgba(37, 45, 48, 0.7)",
            fontWeight: "300",
            // border: "2px solid #EA600E",
          },
          ".left-aligned-cell": {
            textAlign: "left",
          },

          ".MuiDataGrid-cell": {
            color: "#fff",
            fontSize: "16px",
            fontFamily: "Josefin Sans Variable,sans-serif !important",
            backgroundColor: "rgba(37, 45, 48, 0.7)",
            fontWeight: "400",
            // border: "1px solid  #EA600E",
            textAlign: "left",
            height: "auto !important",
            maxHeight: "100% !important",
            minHeight: "100% !important",
            whiteSpace: "pre-wrap !important",
          },
          ".MuiDataGrid-iconSeparator": {
            color: "#9899AC",
          },
          ".MuiDataGrid-footerCell": {
            border: "none",
          },
          ".MuiDataGrid-filterFormDeleteIcon,.MuiDataGrid-menuIcon,.MuiDataGrid-filterIcon,.MuiDataGrid-menuIconButton,.MuiDataGrid-sortIcon":
            {
              color: "#9899AC",
            },
          ".columnSeparator": {},
        },
      },
    },
  },
});

export default function EventsDataTable() {
  const [eventsData, setEventsData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const columns = [
    { field: "eventName", headerName: "Event Name", flex: 1 },
    { field: "user", headerName: "User", flex: 1 },
    {
      field: "ethAmount",
      headerName: "ETH Amount",
      flex: 1,
      renderCell: (params) => (
        <Box>{(+formatUnits(params.value, 18)).toFixed(4)}</Box>
      ),
    },
    {
      field: "usdcAmount",
      headerName: "USDC Amount",
      flex: 1,
      renderCell: (params) => (
        <Box>{(+formatUnits(params.value, 18)).toFixed(4)}</Box>
      ),
    },
    { field: "address", headerName: "Address", flex: 1 },
    { field: "blockNumber", headerName: "Block Number", flex: 1 },
    { field: "transactionHash", headerName: "Transaction Hash", flex: 1 },
  ];

  useEffect(() => {
    fetchData();
  }, [currentPage, pageSize]);

  const fetchData = async () => {
    setLoading(true);
    try {
      const {
        data: { events },
      } = await axiosInstance.get("events", {
        params: {
          page: currentPage,
          limit: pageSize,
        },
      });
      console.log(events, "data");
      setEventsData(events);
    } catch (error) {
      console.error("Error fetching events:", error);
    } finally {
      setLoading(false);
    }
  };
  const handleChangePage = (event, newPage) => {
    setCurrentPage(newPage);
  };

  const handleChangePageSize = (event) => {
    setPageSize(event.target.value);
    setCurrentPage(1); // Reset page to 1 when page size changes
  };
  const PaginationCom = ({ className, ...restProps }) => (
    <Stack
      direction="row"
      width="100%"
      justifyContent="center"
      my={2}
      alignItems="center"
    >
      <FormControl>
        <InputLabel
          id="demo-simple-select-label"
          sx={{ color: "#494949", fontFamily: "Poppins" }}
        >
          Rows Per Page
        </InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={pageSize}
          label="Rows Per Page"
          onChange={handleChangePageSize}
          input={<BootstrapInput />}
          sx={{
            "& .MuiSvgIcon-root": {
              color: "white",
            },
          }}
        >
          <MenuItem value={10}>10</MenuItem>
          <MenuItem value={20}>20</MenuItem>
          <MenuItem value={30}>30</MenuItem>
          <MenuItem value={40}>40</MenuItem>
          <MenuItem value={50}>50</MenuItem>
          <MenuItem value={60}>60</MenuItem>
          <MenuItem value={70}>70</MenuItem>
          <MenuItem value={80}>80</MenuItem>
          <MenuItem value={90}>90</MenuItem>
          <MenuItem value={100}>100</MenuItem>
        </Select>
      </FormControl>
      <Pagination
        className={`${className}`}
        count={Math.ceil(eventsData.length / pageSize)}
        page={currentPage}
        rowsPerPageOptions={[20, 100, 200]}
        rowsPerPage={pageSize}
        onChange={handleChangePage}
        showFirstButton
        showLastButton
        sx={{
          ".MuiPaginationItem-text": {
            color: "#ffff",
            fontSize: "12px",
            fontFamily: "Josefin Sans Variable,sans-serif",
          },
          ".MuiPaginationItem-previousNext": {
            backgroundColor: "#ABE900",
          },
          ".Mui-selected": {
            backgroundColor: "#ABE900 !important",
          },
        }}
        {...restProps}
      />
    </Stack>
  );
  return (
    <ThemeProvider theme={theme}>
      <Box>
        <DataGrid
          getRowId={(row) => row.transactionHash}
          rows={eventsData}
          columns={columns}
          pageSize={pageSize}
          rowCount={eventsData.length}
          autoHeight={true}
          slots={{
            pagination: PaginationCom,
          }}
          paginationMode="server"
          paginationModel={{
            page: currentPage - 1,
            pageSize: pageSize,
          }}
          disableRowSelectionOnClick
          loading={status === "loading" || status === "pending"}
          theme={theme}
        />
      </Box>
    </ThemeProvider>
  );
}
