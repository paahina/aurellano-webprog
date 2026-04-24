import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import { Gauge } from "@mui/x-charts/Gauge";
import Typography from "@mui/material/Typography";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import users from "../../assets/users.json";
import reports from "../../assets/report.json";
import StatCard from "../../components/Dashboard/StatCard";
import GaugeStatCard from "../../components/Dashboard/GaugeStatCard";
import GenericDataGrid from "../../components/Dashboard/GenericDataGrid";
import BarChartReport from "../../components/Dashboard/BarChartReport";
import PieChartReport from "../../components/Dashboard/PieChartReport";
import {
  countRevenueDays,
  weeklyOrders,
  weeklyRevenue,
} from "../../utils/reportUtils";

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
    width: 160,
    valueGetter: (value, row) => `${row.firstName || ""} ${row.lastName || ""}`,
  },
];

function DashboardPage() {
  const weeks = weeklyRevenue(reports);
  const orderWeeks = weeklyOrders(reports);

  return (
    <>
      <Typography variant="h4" gutterBottom>
        Dashboard
      </Typography>

      <Stack
        direction={{ xs: "column", md: "row" }}
        className="border border-gray-300 rounded-xl p-4 mb-4 items-center justify-center gap-4"
      >
        <StatCard title="Total Revenue" value={reports.length} />
        <StatCard
          title="Average Revenue"
          value={(
            reports.reduce((sum, item) => sum + item.revenue, 0) /
            reports.length
          ).toFixed(2)}
        />
        <Divider orientation="vertical" sx={{ borderWidth: 1 }} flexItem />
        <StatCard
          title="Total Orders"
          value={reports.reduce((sum, item) => sum + item.orders, 0)}
        />
        <StatCard
          title="Average Orders"
          value={(
            reports.reduce((sum, item) => sum + item.orders, 0) / reports.length
          ).toFixed(2)}
        />
        <Divider orientation="vertical" sx={{ borderWidth: 1 }} flexItem />
        <StatCard title="Total Users" value={users.length} />
        <StatCard
          title="Average Age"
          value={(
            users.reduce((sum, item) => sum + item.age, 0) / users.length
          ).toFixed(2)}
        />
      </Stack>

      <Stack direction={{ xs: "column", md: "row" }} spacing={2} sx={{ mb: 4 }}>
        <Stack
          direction={{ xs: "column", md: "column" }}
          spacing={2}
          sx={{ mb: 4, justifyContent: "center" }}
          display="flex"
        >
          <GaugeStatCard
            label="Revenue (high days)"
          value={countRevenueDays(reports, { status: "high" })}
            valueMin={0}
            valueMax={reports.length}
          />
          <GaugeStatCard
            label="Revenue (low days)"
          value={countRevenueDays(reports, { status: "low" })}
            valueMin={0}
            valueMax={reports.length}
          />
        </Stack>
        <BarChartReport
          data={weeks.map((w) => Math.round(w.revenue))}
          xLabels={weeks.map((w) => w.label)}
          title="Weekly revenue"
          color="#62AAF7"
          containerClassName="bg-gray-100 rounded-xl p-4 flex-1 border border-gray-300"
        />
        <PieChartReport
          data={orderWeeks.map((w, i) => ({
            id: i,
            value: w.orders,
            label: w.label,
          }))}
          title="Weekly orders"
          height={200}
          containerClassName="bg-gray-100 rounded-xl p-4 flex-1 border border-gray-300 flex items-center justify-center"
        />
      </Stack>
      <Stack
        direction={{ xs: "column", md: "row" }}
        spacing={2}
        sx={{ mb: 4, alignItems: "stretch" }}
      >
        <GenericDataGrid
          title="Users Overview"
          rows={users}
          columns={userColumns}
        />
        <Box
          sx={{
            flex: 1,
            minWidth: 0,
            display: "flex",
            flexDirection: "column",
            minHeight: { xs: 360, md: 0 },
          }}
        >
          <Typography variant="h5" gutterBottom>
            Location Map
          </Typography>
          <Box
            sx={{
              flex: 1,
              minHeight: 400,
              border: "1px solid",
              borderColor: "grey.300",
              borderRadius: 2,
              overflow: "hidden",
              "& .leaflet-container": {
                height: "100%",
                width: "100%",
              },
            }}
          >
            <MapContainer
              center={[14.604215, 120.994314]}
              zoom={13}
              style={{ height: "100%", width: "100%", minHeight: 400 }}
            >
              <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              />
              <Marker position={[14.604215, 120.994314]}>
                <Popup>
                  National University-Manila <br />
                  <p>551 F Jhocson St, Sampaloc, Manila, 1008 Metro Manila</p>
                </Popup>
              </Marker>
            </MapContainer>
          </Box>
        </Box>
      </Stack>
    </>
  );
}

export default DashboardPage;
