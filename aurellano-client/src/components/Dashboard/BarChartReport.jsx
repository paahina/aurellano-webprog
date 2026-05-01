import { BarChart } from "@mui/x-charts/BarChart";
import ReportChartPanel from "./ReportChartPanel";

function BarChartReport({
  title,
  description,
  series,
  xAxis,
  height = 300,
  sx,
  ...barChartProps
}) {
  return (
    <ReportChartPanel title={title} description={description} sx={sx}>
      <BarChart
        series={series}
        xAxis={xAxis}
        height={height}
        {...barChartProps}
      />
    </ReportChartPanel>
  );
}

export default BarChartReport;
