import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarAlt } from "@fortawesome/free-solid-svg-icons";
import { formatDuration, formatMonth } from "../../utils/date";

interface RolePeriodProps {
  start: string;
  end: string | null;
}

/**
 * Renders the date range as real <time> elements so the timeline is parseable
 * by assistive tech and crawlers, and adds the duration the raw strings never
 * communicated.
 */
const RolePeriod: React.FC<RolePeriodProps> = ({ start, end }) => {
  const duration = formatDuration(start, end);

  return (
    <p className="flex flex-wrap items-center gap-x-2 gap-y-1 font-spaceGrotesk text-text-secondary">
      <FontAwesomeIcon
        icon={faCalendarAlt}
        className="text-neon-purple"
        aria-hidden="true"
      />
      <span>
        <time dateTime={start}>{formatMonth(start)}</time>
        <span aria-hidden="true"> – </span>
        {end ? (
          <time dateTime={end}>{formatMonth(end)}</time>
        ) : (
          <span>Present</span>
        )}
      </span>
      {duration && (
        <span className="text-sm text-text-secondary/60">· {duration}</span>
      )}
    </p>
  );
};

export default RolePeriod;
