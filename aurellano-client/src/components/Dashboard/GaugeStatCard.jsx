import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { Gauge } from "@mui/x-charts/Gauge";

function GaugeStatCard({
  label,
  value,
  valueMin = 0,
  valueMax = 100,
  width = 100,
  height = 100,
  cornerRadius = 10,
  colors = { valueArc: "#62AAF7", referenceArc: "#C9D8E8", valueText: "#1E1B18" },
  className = "flex flex-col items-center border rounded-xl p-2 border-gray-300 text-gray-500 bg-gray-100",
}) {
  return (
    <Box className={className}>
      <Gauge
        width={width}
        height={height}
        value={value}
        valueMin={valueMin}
        valueMax={valueMax}
        cornerRadius={cornerRadius}
        sx={{
          "& .MuiGauge-valueArc": { fill: colors.valueArc },
          "& .MuiGauge-referenceArc": { fill: colors.referenceArc },
          "& .MuiGauge-valueText": {
            fill: colors.valueText,
            fontSize: 20,
            fontWeight: 700,
          },
        }}
      />
      <Typography variant="body2" sx={{ mt: 1, fontWeight: 600 }}>
        {label}
      </Typography>
    </Box>
  );
}

export default GaugeStatCard;
