import React from "react";
import { Box, ThemeProvider, createTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
const theme = createTheme({
  components: {
    MuiDataGrid: {
      styleOverrides: {
        root: {
          // background: `linear-gradient(to right,#181D1B,#1B221A)`,
          borderRadius: "10px",
          border: "none !important",
          ".MuiDataGrid-columnHeaders": {
            textAlign: "center",
            // color: "#fff",
            fontSize: "15px",
            fontFamily: "Josefin Sans Variable,sans-serif",
            border: "none !important",
            borderRadius: "10px",
            fontWeight: "bold",
            background: ` (to right,#474747,#474747)`,
          },
          ".left-aligned-cell": {
            textAlign: "center",
          },

          ".MuiDataGrid-cell": {
            // color: "#fff",
            fontSize: "14px",
            fontFamily: "Josefin Sans Variable, sans-serif !important",
            borderBottom: "1px solid #424242",
            fontWeight: "400",
            textAlign: "center",
            height: "auto !important",
            maxHeight: "100% !important",
            minHeight: "100% !important",
            // whiteSpace: "pre-wrap !important",
          },
          ".MuiDataGrid-iconSeparator": {
            color: "#00E909",
          },
          ".MuiDataGrid-footerCell": {
            border: "none !important",
            borderBottom: "none !important",
          },
          ".MuiDataGrid-filterFormDeleteIcon,.MuiDataGrid-menuIcon,.MuiDataGrid-filterIcon,.MuiDataGrid-menuIconButton,.MuiDataGrid-sortIcon":
            {
              // color: "#00E909",
            },
        },
      },
    },
  },
});

const themeSecond = createTheme({
  components: {
    MuiDataGrid: {
      styleOverrides: {
        root: {
          // background: `linear-gradient(to right,#181D1B,#1B221A)`,
          borderRadius: "10px",
          border: "none !important",
          ".MuiDataGrid-columnHeaders": {
            textAlign: "center",
            color: "#fff",
            fontSize: "15px",
            fontFamily: "Josefin Sans Variable,sans-serif",
            border: "none !important",
            borderRadius: "10px",
            fontWeight: "bold",
            background: ` (to right,#474747,#474747)`,
          },
          ".left-aligned-cell": {
            textAlign: "center",
          },

          ".MuiDataGrid-cell": {
            color: "#fff",
            fontSize: "14px",
            fontFamily: "Josefin Sans Variable, sans-serif !important",
            borderBottom: "1px solid #424242",
            fontWeight: "400",
            textAlign: "center",
            height: "auto !important",
            maxHeight: "100% !important",
            minHeight: "100% !important",
            // whiteSpace: "pre-wrap !important",
          },
          ".MuiDataGrid-iconSeparator": {
            color: "#00E909",
          },
          ".MuiDataGrid-footerCell": {
            border: "none !important",
            borderBottom: "none !important",
          },
          ".MuiDataGrid-filterFormDeleteIcon,.MuiDataGrid-menuIcon,.MuiDataGrid-filterIcon,.MuiDataGrid-menuIconButton,.MuiDataGrid-sortIcon":
            {
              color: "#00E909",
            },
        },
      },
    },
  },
});

// eslint-disable-next-line react/prop-types
const CommonTable = ({ mode, rows, columns }) => {
  return (
    <>
      <Box>
        <ThemeProvider theme={mode?theme:themeSecond}>
          <DataGrid
            rows={rows}
            columns={columns}
            autoHeight={true}
            disableRowSelectionOnClick
            theme={theme}
            hideFooterPagination={true}
            sx={{ marginTop: "50px" }}
           
          />
        </ThemeProvider>
      </Box>
    </>
  );
};

export default CommonTable;
