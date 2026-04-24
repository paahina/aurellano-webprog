import Box from "@mui/material/Box";
import { PieChart } from "@mui/x-charts/PieChart";

function PieChartReport({
  data,
  title = "Weekly orders",
  height = 240,
  minHeight = 260,
  containerClassName = "bg-gray-100 rounded-xl p-4 border border-gray-300 flex items-center justify-center",
}) {
  return (
    <Box className={containerClassName} sx={{ minHeight }}>
      <PieChart
        series={[
          {
            data,
          },
        ]}
        height={height}
        title={title}
      />
    </Box>
  );
}

export default PieChartReport;

