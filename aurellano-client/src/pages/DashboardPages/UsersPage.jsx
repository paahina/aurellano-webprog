import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

import users from "../../assets/users.json";
import GenericDataGrid from "../../components/Dashboard/GenericDataGrid";
import StatCard from "../../components/Dashboard/StatCard";

const userColumns = [
  { field: "id", headerName: "ID", width: 90 },
  {
    field: "firstName",
    headerName: "First name",
    width: 150,
    editable: true,
  },
  {
    field: "lastName",
    headerName: "Last name",
    width: 150,
    editable: true,
  },
  {
    field: "age",
    headerName: "Age",
    type: "number",
    width: 110,
    editable: true,
    align: "left",
    headerAlign: "left",
  },
  {
    field: "fullName",
    headerName: "Full name",
    description: "This column has a value getter and is not sortable.",
    sortable: false,
    flex: 1,
    minWidth: 180,
    valueGetter: (value, row) => `${row.firstName || ""} ${row.lastName || ""}`,
  },
];

function UsersPage() {
  const avgAge =
    users.reduce((sum, u) => sum + (Number(u.age) || 0), 0) /
    (users.length || 1);

  const minors = users.filter((u) => (Number(u.age) || 0) < 18).length;
  const adults = users.filter((u) => (Number(u.age) || 0) >= 18).length;

  return (
    <>
      <Typography variant="h4" gutterBottom>
        Users
      </Typography>

      <Stack
        direction={{ xs: "column", md: "row" }}
        className="border border-gray-300 rounded-xl p-4 mb-4 items-center justify-center gap-4"
      >
        <StatCard title="Total Users" value={users.length} />
        <StatCard title="Average Age" value={avgAge.toFixed(2)} />
        <Divider orientation="vertical" sx={{ borderWidth: 1 }} flexItem />
        <StatCard title="Adults (18+)" value={adults} />
        <StatCard title="Minors (<18)" value={minors} />
      </Stack>

      <Box>
        <GenericDataGrid
          title="Users Overview"
          rows={users}
          columns={userColumns}
          initialState={{
            pagination: {
              paginationModel: {
                pageSize: 10,
              },
            },
          }}
          sx={{ minHeight: 520 }}
        />
      </Box>
    </>
  );
}

export default UsersPage;
