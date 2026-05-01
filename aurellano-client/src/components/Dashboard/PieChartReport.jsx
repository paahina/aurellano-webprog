import Box from "@mui/material/Box";
import { PieChart } from "@mui/x-charts/PieChart";
import ReportChartPanel from "./ReportChartPanel";

function PieChartReport({
  title,
  description,
  series: seriesProp,
  data,
  width = 280,
  height = 220,
  sx,
  ...pieChartProps
}) {
  const series = seriesProp ?? (data != null ? [{ data }] : undefined);

  if (!series?.length) {
    return null;
  }

  return (
    <ReportChartPanel title={title} description={description} sx={sx}>
      <Box sx={{ display: "flex", justifyContent: "center" }}>
        <PieChart
          series={series}
          width={width}
          height={height}
          {...pieChartProps}
        />
      </Box>
    </ReportChartPanel>
  );
}

export default PieChartReport;
