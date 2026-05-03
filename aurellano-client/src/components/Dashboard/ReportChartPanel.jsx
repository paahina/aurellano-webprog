import Box from "@mui/material/Box";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";

const defaultShellClass = "bg-gray-100 rounded-xl p-4 border border-gray-300";

function ReportChartPanel({
  title,
  description,
  children,
  sx,
  className = defaultShellClass,
}) {
  return (
    <Box className={className} sx={sx}>
      <CardContent>
        <Typography variant="h6" gutterBottom className="text-[#0c3aa7]">
          {title}
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
          {description}
        </Typography>
        <Box className="flex items-center justify-center">{children}</Box>
      </CardContent>
    </Box>
  );
}

export default ReportChartPanel;
