import { DataGrid } from "@mui/x-data-grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

const defaultSx = {
  borderColor: "divider",
  "&& .MuiDataGrid-columnHeaders, && .MuiDataGrid-columnHeader, && .MuiDataGrid-filler":
    {
      backgroundColor: "#2563eb",
      color: "#FFFFFF",
      borderBottom: "none",
    },
  "&& .MuiDataGrid-columnHeaderTitle": {
    fontWeight: 600,
    color: "inherit",
  },
  "&& .MuiDataGrid-sortIcon": {
    color: "inherit",
  },
  "&& .MuiDataGrid-columnHeaderCheckbox .MuiCheckbox-root": {
    color: "inherit",
  },
  "& .MuiDataGrid-row": {
    backgroundColor: "#F3F4F6",
  },
  "& .MuiDataGrid-row:nth-of-type(even)": {
    backgroundColor: "#DCEEFF",
  },
  "& .MuiDataGrid-row:hover": {
    backgroundColor: "#C9D8E8",
  },
  "& .MuiDataGrid-cell": {
    borderColor: "divider",
  },
};

function GenericDataGrid({
  title,
  rows,
  columns,
  sx,
  initialState = {
    pagination: {
      paginationModel: {
        pageSize: 5,
      },
    },
  },
  ...dataGridProps
}) {
  return (
    <Box>
      <Typography variant="h5" sx={{ mb: 1 }}>
        {title}
      </Typography>
      <DataGrid
        initialState={initialState}
        SizeOptions={[5]}
        checkboxSelection
        disableRowSelectionOnClick
        sx={sx ? [defaultSx, sx] : defaultSx}
        {...dataGridProps}
        rows={rows}
        columns={columns}
      />
    </Box>
  );
}

export default GenericDataGrid;
