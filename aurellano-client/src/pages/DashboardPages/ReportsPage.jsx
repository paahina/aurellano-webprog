import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

import reports from "../../assets/report.json";
import GaugeStatCard from "../../components/Dashboard/GaugeStatCard";
import GenericDataGrid from "../../components/Dashboard/GenericDataGrid";
import BarChartReport from "../../components/Dashboard/BarChartReport";
import PieChartReport from "../../components/Dashboard/PieChartReport";
import {
  countRevenueDays,
  weeklyOrders,
  weeklyRevenue,
} from "../../utils/reportUtils";

const reportColumns = [
  { field: "id", headerName: "ID", width: 70 },
  { field: "date", headerName: "Date", width: 130 },
  {
    field: "orders",
    headerName: "Orders",
    type: "number",
    width: 110,
  },
  {
    field: "revenue",
    headerName: "Revenue",
    type: "number",
    width: 140,
    valueFormatter: (value) =>
      typeof value === "number"
        ? value.toLocaleString(undefined, {
            style: "currency",
            currency: "PHP",
          })
        : value,
  },
];

function ReportsPage() {
  const weeklyRev = weeklyRevenue(reports);
  const weeklyOrd = weeklyOrders(reports);
  const reportRows = reports.map((r, i) => ({ id: i + 1, ...r }));

  return (
    <>
      <Typography variant="h4" gutterBottom>
        Reports
      </Typography>
      <Stack
        direction={{ xs: "column", md: "row" }}
        spacing={2}
        sx={{ mb: 4, alignItems: "stretch" }}
      >
        <Box sx={{ flex: 1, minWidth: 0 }}>
          <GenericDataGrid
            title="Daily Reports"
            rows={reportRows}
            columns={reportColumns}
            initialState={{
              pagination: {
                paginationModel: {
                  pageSize: 12,
                },
              },
            }}
          />
        </Box>

        <Stack direction="column" spacing={2} sx={{ flex: 1, minWidth: 0 }}>
          <Stack
            direction={{ xs: "column", md: "row" }}
            spacing={2}
            sx={{ justifyContent: "center" }}
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
            data={weeklyRev.map((w) => Math.round(w.revenue))}
            xLabels={weeklyRev.map((w) => w.label)}
            title="Weekly revenue"
          />

          <PieChartReport
            data={weeklyOrd.map((w, i) => ({
              id: i,
              value: w.orders,
              label: w.label,
            }))}
            title="Weekly orders"
          />
        </Stack>
      </Stack>
    </>
  );
}

export default ReportsPage;
