import Box from "@mui/material/Box";
import { Gauge } from "@mui/x-charts/Gauge";
import ReportChartPanel from "./ReportChartPanel";

function GaugeReportPanel({
  title,
  description,
  value,
  valueMin = 0,
  valueMax = 100,
  gaugeWidth = 180,
  gaugeHeight = 180,
  cornerRadius = 10,
  sx,
  ...gaugeProps
}) {
  return (
    <ReportChartPanel title={title} description={description} sx={sx}>
      <Box
        sx={{
          minHeight: 220,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Gauge
          width={gaugeWidth}
          height={gaugeHeight}
          value={value}
          valueMin={valueMin}
          valueMax={valueMax}
          cornerRadius={cornerRadius}
          {...gaugeProps}
        />
      </Box>
    </ReportChartPanel>
  );
}

export default GaugeReportPanel;
