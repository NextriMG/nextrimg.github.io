export default function Wallpaper() {
  return (
    <div id="wallpaper" aria-hidden="true">
      <svg
        id="wp-svg"
        viewBox="0 0 1440 900"
        preserveAspectRatio="xMidYMid slice"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <pattern id="dp" x="0" y="0" width="38" height="38" patternUnits="userSpaceOnUse">
            <circle cx="19" cy="19" r="1" fill="currentColor" opacity=".065" />
          </pattern>
        </defs>
        <rect width="1440" height="900" fill="url(#dp)" color="var(--tx)" />
        {/* Ambient glows */}
        <ellipse className="blob-1" cx="280"  cy="680" rx="300" ry="220" fill="var(--tl)" opacity=".038" />
        <ellipse className="blob-2" cx="1160" cy="240" rx="260" ry="200" fill="var(--or)" opacity=".035" />
        <ellipse className="blob-3" cx="720"  cy="440" rx="200" ry="150" fill="var(--lv)" opacity=".025" />
        {/* Decorative rings */}
        <circle cx="160" cy="140" r="148" fill="none" stroke="var(--tl)" strokeWidth="1" opacity=".07" />
        <circle cx="160" cy="140" r="92" fill="none" stroke="var(--tl)" strokeWidth="1" opacity=".045" />
        <circle cx="1280" cy="760" r="165" fill="none" stroke="var(--or)" strokeWidth="1" opacity=".07" />
        <circle cx="1280" cy="760" r="102" fill="none" stroke="var(--or)" strokeWidth="1" opacity=".045" />
      </svg>
    </div>
  )
}
