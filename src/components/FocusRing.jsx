export default function FocusRing({ focusScore }) {
  const radius = 45;
  const strokeWidth = 10;
  const normalizedRadius = radius - strokeWidth / 2;

  const circumference = normalizedRadius * 2 * Math.PI;
  const strokeDashoffset = circumference - (focusScore / 100) * circumference;

  return (
    <div>
      <svg width="120" height="120" className="-rotate-90">
        <circle
          cx="60"
          cy="60"
          r={normalizedRadius}
          stroke="rgba(255,255,255,0.1)"
          strokeWidth={strokeWidth}
          fill="transparent"
        />
        <circle
          cx="60"
          cy="60"
          r={normalizedRadius}
          stroke={
            focusScore > 70
              ? "#22C55E"
              : focusScore > 40
                ? "#EAB308"
                : "#EF4444"
          }
          strokeWidth={strokeWidth}
          fill="transparent"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          className="transition-all duration-500 drop-shadow-[0_0_12px_currentColor]"
        />
      </svg>
      <div className="absolute text-2xl font-bold">{focusScore}%</div>
    </div>
  );
}
