import Box from "@mui/material/Box";
import { BarChart } from "@mui/x-charts/BarChart";

function BarChartReport({
  data,
  xLabels,
  title = "Weekly revenue",
  seriesLabel = "Revenue",
  color = "#2563eb",
  height = 290,
  minHeight = 320,
  containerClassName = "bg-gray-100 rounded-xl p-4 border border-gray-300",
}) {
  return (
    <Box className={containerClassName} sx={{ minHeight }}>
      <BarChart
        series={[
          {
            data,
            label: seriesLabel,
            color,
          },
        ]}
        height={height}
        xAxis={[
          {
            data: xLabels,
            scaleType: "band",
            label: "Weeks",
          },
        ]}
        title={title}
      />
    </Box>
  );
}

export default BarChartReport;

