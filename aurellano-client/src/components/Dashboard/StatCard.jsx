import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";

function StatCard({
  title,
  value,
  cardProps,
  contentClassName = "bg-gray-100",
}) {
  return (
    <Card
      {...cardProps}
      sx={{
        borderRadius: "10px",
        border: "1px solid #E5E7EB",
        overflow: "hidden",
      }}
    >
      <CardContent className={contentClassName}>
        <Typography variant="h6" className="text-gray-500">
          {title}
        </Typography>
        <Typography variant="h4">{value}</Typography>
      </CardContent>
    </Card>
  );
}

export default StatCard;
