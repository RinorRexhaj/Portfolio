const MONTHS = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

const parse = (iso: string): [number, number] | null => {
  const match = /^(\d{4})-(\d{2})$/.exec(iso);
  if (!match) return null;
  const year = Number(match[1]);
  const month = Number(match[2]);
  if (month < 1 || month > 12) return null;
  return [year, month];
};

const currentMonth = () => new Date().toISOString().slice(0, 7);

/** "2025-08" -> "Aug 2025". Falls back to the raw input if it is malformed. */
export const formatMonth = (iso: string): string => {
  const parsed = parse(iso);
  if (!parsed) return iso;
  const [year, month] = parsed;
  return `${MONTHS[month - 1]} ${year}`;
};

/**
 * Inclusive month count rendered the way a CV does it: "1 yr 2 mos".
 * A null `end` means the role is current and is measured against today.
 */
export const formatDuration = (start: string, end: string | null): string => {
  const from = parse(start);
  const to = parse(end ?? currentMonth());
  if (!from || !to) return "";

  const months = (to[0] - from[0]) * 12 + (to[1] - from[1]) + 1;
  if (months < 1) return "";

  const years = Math.floor(months / 12);
  const remainder = months % 12;

  return [
    years > 0 ? `${years} yr${years > 1 ? "s" : ""}` : "",
    remainder > 0 ? `${remainder} mo${remainder > 1 ? "s" : ""}` : "",
  ]
    .filter(Boolean)
    .join(" ");
};
