import { useRef } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import BarChartReport from "../../components/Dashboard/BarChartReport";
import PieChartReport from "../../components/Dashboard/PieChartReport";
import GaugeReportPanel from "../../components/Dashboard/GaugeReportPanel";
import GenericDataGrid from "../../components/Dashboard/GenericDataGrid";

const columns = [
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

const rows = [
  { id: 1, lastName: "Snow", firstName: "Jon", age: 14 },
  { id: 2, lastName: "Lannister", firstName: "Cersei", age: 31 },
  { id: 3, lastName: "Lannister", firstName: "Jaime", age: 31 },
  { id: 4, lastName: "Stark", firstName: "Arya", age: 11 },
  { id: 5, lastName: "Targaryen", firstName: "Daenerys", age: null },
  { id: 6, lastName: "Melisandre", firstName: null, age: 150 },
  { id: 7, lastName: "Clifford", firstName: "Ferrara", age: 44 },
  { id: 8, lastName: "Frances", firstName: "Rossini", age: 36 },
  { id: 9, lastName: "Roxie", firstName: "Harvey", age: 65 },
];

const ReportsPage = () => {
  const printRef = useRef(null);

  const handlePrint = () => {
    const printContent = printRef.current;

    if (!printContent) {
      return;
    }

    const printWindow = window.open("", "_blank", "width=1200,height=900");

    if (!printWindow) {
      return;
    }

    const headMarkup = Array.from(
      document.querySelectorAll('style, link[rel="stylesheet"]'),
    )
      .map((node) => node.outerHTML)
      .join("");

    const exportedAt = new Intl.DateTimeFormat("en-US", {
      dateStyle: "long",
      timeStyle: "short",
    }).format(new Date());

    printWindow.document.write(`
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Print Report</title>
  ${headMarkup}
  <style>
    @page {
      size: A4;
      margin: 16mm;
    }

    * {
      box-sizing: border-box;
    }

    body {
      margin: 0;
      font-family: Arial, Helvetica, sans-serif;
      background: #fff;
      color: #1f2937;
    }

    .report-shell {
      padding: 28px;
    }

    .report-header {
      margin-bottom: 24px;
      padding-bottom: 14px;
      border-bottom: 1px solid #d1d5db;
    }

    .report-header h1 {
      margin: 0 0 6px;
      font-size: 28px;
      font-weight: 700;
    }

    .report-header p {
      margin: 0;
      font-size: 14px;
      color: #6b7280;
      line-height: 1.5;
    }

    .report-content .MuiCard-root {
      box-shadow: none !important;
      border: 1px solid #e5e7eb;
      break-inside: avoid;
      page-break-inside: avoid;
    }

    .report-content .MuiCardContent-root {
      padding: 20px;
    }

    .report-content svg {
      max-width: 100%;
    }
  </style>
</head>
<body>
  <main class="report-shell">
    <header class="report-header">
      <h1>Reports Summary</h1>
      <p>Analytics overview for generated reports, category breakdown, and completion performance.</p>
      <p>Prepared on ${exportedAt}</p>
    </header>
    <section class="report-content">
      ${printContent.outerHTML}
    </section>
  </main>
</body>
</html>
`);
    printWindow.document.close();
    printWindow.focus();
    printWindow.print();
  };

  return (
    <Box>
      <Stack
        direction={{ xs: "column", md: "row" }}
        justifyContent="space-between"
        alignItems={{ xs: "flex-start", md: "center" }}
        spacing={2}
        sx={{ mb: 4 }}
      >
        <Box>
          <Typography variant="h4" gutterBottom>
            Reports
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Report analytics overview showing generated reports, category
            breakdown, and current completion performance.
          </Typography>
        </Box>
        <Stack direction="row" spacing={1.5} flexWrap="wrap" useFlexGap>
          <Button variant="contained">Generate</Button>
          <Button variant="outlined" onClick={handlePrint}>
            Export
          </Button>
          <Button variant="outlined">Filter</Button>
        </Stack>
      </Stack>

      <Stack ref={printRef} spacing={3}>
        <BarChartReport
          title="Monthly Report Output"
          description="This chart compares how many reports were generated and how many were completed across the last four months."
          series={[
            { data: [18, 24, 20, 27], label: "Generated", color: "#0c3aa7" },
            { data: [12, 19, 17, 23], label: "Completed", color: "#62aaf7" },
          ]}
          height={300}
          xAxis={[
            {
              data: ["January", "February", "March", "April"],
              scaleType: "band",
              label: "Months",
            },
          ]}
        />

        <Stack direction={{ xs: "column", lg: "row" }} spacing={3}>
          <PieChartReport
            title="Report Category Share"
            description="This chart shows the distribution of report requests by category for the current reporting period."
            series={[
              {
                data: [
                  { id: 0, value: 14, label: "Sales" },
                  { id: 1, value: 10, label: "Users" },
                  { id: 2, value: 8, label: "Inventory" },
                  { id: 3, value: 6, label: "Finance" },
                ],
              },
            ]}
            width={280}
            height={220}
            sx={{ flex: 1 }}
          />

          <GaugeReportPanel
            title="Completion Rate"
            description="The gauge highlights the current percentage of reports completed on time based on the latest reporting cycle."
            value={78}
            valueMin={0}
            valueMax={100}
            sx={{ flex: 1 }}
          />
        </Stack>

        <GenericDataGrid
          title="Users"
          rows={rows}
          columns={columns}
          experimentalFeatures={{ newEditingApi: true }}
          initialState={{
            pagination: {
              paginationModel: {
                pageSize: 5,
              },
            },
          }}
          sx={{
            minWidth: 0,
            "& .MuiDataGrid-cell, & .MuiDataGrid-columnHeader": {
              outline: "none",
            },
          }}
        />
      </Stack>
    </Box>
  );
};

export default ReportsPage;
