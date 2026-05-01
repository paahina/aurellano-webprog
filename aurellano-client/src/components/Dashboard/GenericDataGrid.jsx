import { DataGrid } from "@mui/x-data-grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

const defaultSx = {
  borderColor: "divider",
  "&& .MuiDataGrid-columnHeaders, && .MuiDataGrid-columnHeader, && .MuiDataGrid-columnHeaders .MuiDataGrid-filler":
    {
      backgroundColor: "#0c3aa7",
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
  className,
  ...dataGridProps
}) {
  const showTitle = title != null && String(title).trim() !== "";

  return (
    <Box className={className}>
      {showTitle ? (
        <Typography variant="h5" sx={{ mb: 1 }}>
          {title}
        </Typography>
      ) : null}
      <DataGrid
        autoHeight
        initialState={initialState}
        pageSizeOptions={[5]}
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
