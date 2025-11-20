import dayjs from "dayjs";

export function formatDate(dateStr: string) {
  return dayjs(dateStr).format("YYYY/MM/DD");
}
