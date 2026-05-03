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
  <title>Reports summary — Print</title>
  ${headMarkup}
  <style>
    :root {
      --brand-primary: #0c3aa7;
      --brand-accent: #62aaf7;
      --text-primary: #111827;
      --text-secondary: #4b5563;
      --text-muted: #6b7280;
      --border: #e5e7eb;
      --surface: #ffffff;
      --surface-muted: #f3f4f6;
      --row-stripe: #dceeff;
    }

    @page {
      size: A4;
      margin: 14mm 16mm;
    }

    * {
      box-sizing: border-box;
    }

    body {
      margin: 0;
      font-family: system-ui, -apple-system, "Segoe UI", Roboto, Arial, sans-serif;
      font-size: 14px;
      line-height: 1.5;
      background: var(--surface-muted);
      color: var(--text-primary);
      -webkit-print-color-adjust: exact;
      print-color-adjust: exact;
    }

    .report-shell {
      max-width: 960px;
      margin: 0 auto;
      padding: 0 0 32px;
      background: var(--surface);
      min-height: 100vh;
    }

    .report-header {
      margin-bottom: 0;
      background: linear-gradient(135deg, var(--brand-primary) 0%, #0a2f8a 100%);
      color: #fff;
      -webkit-print-color-adjust: exact;
      print-color-adjust: exact;
    }

    .report-header__inner {
      padding: 28px 32px 24px;
    }

    .report-header__eyebrow {
      margin: 0 0 8px;
      font-size: 11px;
      font-weight: 600;
      letter-spacing: 0.12em;
      text-transform: uppercase;
      color: rgba(255, 255, 255, 0.85);
    }

    .report-header h1 {
      margin: 0 0 12px;
      font-size: 26px;
      font-weight: 700;
      letter-spacing: -0.02em;
      line-height: 1.2;
    }

    .report-header__lead {
      margin: 0;
      max-width: 52ch;
      font-size: 14px;
      line-height: 1.55;
      color: rgba(255, 255, 255, 0.92);
    }

    .report-header__meta {
      display: flex;
      flex-wrap: wrap;
      align-items: baseline;
      gap: 8px 16px;
      padding: 14px 32px;
      background: rgba(0, 0, 0, 0.12);
      border-top: 1px solid rgba(255, 255, 255, 0.15);
      font-size: 13px;
      color: rgba(255, 255, 255, 0.95);
    }

    .report-header__meta-label {
      font-weight: 600;
      color: var(--brand-accent);
    }

    .report-header__accent {
      height: 4px;
      background: linear-gradient(90deg, var(--brand-accent) 0%, #9ec9fb 100%);
      -webkit-print-color-adjust: exact;
      print-color-adjust: exact;
    }

    .report-content {
      padding: 28px 32px 0;
      border-left: 4px solid var(--brand-primary);
      margin-left: 0;
    }

    .report-content > * {
      margin-top: 0;
    }

    .report-content .MuiStack-root {
      gap: 20px !important;
    }

    .report-content .MuiCard-root {
      box-shadow: none !important;
      border: 1px solid var(--border) !important;
      border-radius: 12px !important;
      overflow: hidden;
      break-inside: avoid;
      page-break-inside: avoid;
      background: var(--surface) !important;
    }

    .report-content .MuiCardContent-root {
      padding: 20px 22px !important;
    }

    .report-content .MuiTypography-h6 {
      color: var(--brand-primary) !important;
    }

    .report-content .bg-gray-100,
    .report-content [class*="bg-gray-100"] {
      background: var(--surface-muted) !important;
      border-color: var(--border) !important;
    }

    .report-content svg {
      max-width: 100%;
      height: auto;
    }

    .report-content .MuiDataGrid-root {
      border: 1px solid var(--border) !important;
      border-radius: 8px !important;
      overflow: hidden;
    }

    .report-content .MuiDataGrid-columnHeaders,
    .report-content .MuiDataGrid-columnHeader,
    .report-content .MuiDataGrid-columnHeaders .MuiDataGrid-filler {
      background-color: var(--brand-primary) !important;
      color: #ffffff !important;
      border-bottom: none !important;
      -webkit-print-color-adjust: exact;
      print-color-adjust: exact;
    }

    .report-content .MuiDataGrid-columnHeaderTitle {
      font-weight: 600 !important;
    }

    .report-content .MuiDataGrid-row {
      background-color: var(--surface-muted) !important;
    }

    .report-content .MuiDataGrid-row:nth-of-type(even) {
      background-color: var(--row-stripe) !important;
    }

    .report-content .MuiDataGrid-cell {
      border-color: var(--border) !important;
    }

    @media print {
      body {
        background: #fff;
      }

      .report-shell {
        max-width: none;
        padding: 0;
      }

      .report-content {
        padding-top: 20px;
      }
    }
  </style>
</head>
<body>
  <main class="report-shell">
    <header class="report-header">
      <div class="report-header__inner">
        <p class="report-header__eyebrow">Dashboard · Reports</p>
        <h1>Reports summary</h1>
        <p class="report-header__lead">
          Analytics overview for generated reports, category breakdown, and completion performance.
        </p>
      </div>
      <div class="report-header__meta">
        <span class="report-header__meta-label">Generated</span>
        <span>${exportedAt}</span>
      </div>
      <div class="report-header__accent" aria-hidden="true"></div>
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
