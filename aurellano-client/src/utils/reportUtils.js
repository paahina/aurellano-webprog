/**
 * Returns YYYY-MM-DD for the Monday of the given date's week.
 * (Noon avoids timezone edge cases when parsing ISO date strings.)
 */
export function weekStartKey(isoDateStr) {
  const d = new Date(`${isoDateStr}T12:00:00`);
  const day = d.getDay();
  const mondayOffset = day === 0 ? -6 : 1 - day;
  d.setDate(d.getDate() + mondayOffset);
  return d.toISOString().slice(0, 10);
}

export function weeklyRevenue(reports) {
  const byWeek = Object.create(null);
  for (const { date, revenue } of reports) {
    const k = weekStartKey(date);
    byWeek[k] = (byWeek[k] ?? 0) + revenue;
  }
  return Object.keys(byWeek)
    .sort()
    .map((weekStart, i) => ({
      weekStart,
      label: `Week ${i + 1} (${weekStart})`,
      revenue: byWeek[weekStart],
    }));
}

export function weeklyOrders(reports) {
  const byWeek = Object.create(null);
  for (const { date, orders } of reports) {
    const k = weekStartKey(date);
    byWeek[k] = (byWeek[k] ?? 0) + orders;
  }
  return Object.keys(byWeek)
    .sort()
    .map((weekStart, i) => ({
      weekStart,
      label: `Week ${i + 1} (${weekStart})`,
      orders: byWeek[weekStart],
    }));
}

export function countRevenueDays(reports, { status = "low", threshold = 5000 } = {}) {
  if (status === "low") return reports.filter((r) => r.revenue < threshold).length;
  if (status === "high") return reports.filter((r) => r.revenue > threshold).length;
  return 0;
}

