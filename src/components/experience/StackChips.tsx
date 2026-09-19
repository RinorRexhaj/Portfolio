interface StackChipsProps {
  stack: string[];
  /** Used to label the list for screen readers, e.g. "Seculyze". */
  companyName: string;
}

/**
 * The keyword-match surface. A recruiter scanning for "Databricks" or "React"
 * should hit it here without reading a single bullet.
 */
const StackChips: React.FC<StackChipsProps> = ({ stack, companyName }) => {
  if (stack.length === 0) return null;

  return (
    <ul
      className="flex list-none flex-wrap gap-2"
      aria-label={`Technologies used at ${companyName}`}
    >
      {stack.map((tech) => (
        <li
          key={tech}
          className="rounded-full border border-electric-blue/40 bg-electric-blue/10 px-3 py-1 font-spaceGrotesk text-xs text-electric-blue"
        >
          {tech}
        </li>
      ))}
    </ul>
  );
};

export default StackChips;
