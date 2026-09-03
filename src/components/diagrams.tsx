export function SupplyFlow({ className = "" }: { className?: string }) {
  const nodes = [
    { x: 60, label: "Buyer" },
    { x: 200, label: "Chakraborty" },
    { x: 340, label: "Mill" },
    { x: 480, label: "Port" },
  ];
  return (
    <svg
      viewBox="0 0 540 260"
      className={className}
      role="img"
      aria-label="How an order moves from the buyer through Chakraborty Overseas to the mill and out through the port"
    >
      <defs>
        <linearGradient id="sfLine" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#C8A24A" stopOpacity=".15" />
          <stop offset=".5" stopColor="#C8A24A" stopOpacity=".9" />
          <stop offset="1" stopColor="#C8A24A" stopOpacity=".15" />
        </linearGradient>
      </defs>

      <path
        d="M60 120h420"
        stroke="url(#sfLine)"
        strokeWidth="1.4"
        fill="none"
      />
      <path
        d="M60 120h420"
        stroke="#0B1015"
        strokeOpacity=".08"
        strokeWidth="8"
        fill="none"
        strokeLinecap="round"
      />

      {nodes.map((n, i) => (
        <g key={n.label}>
          <circle
            cx={n.x}
            cy={120}
            r={i === 1 ? 26 : 18}
            fill="#fff"
            stroke="#0B1015"
            strokeOpacity=".12"
          />
          <circle
            cx={n.x}
            cy={120}
            r={i === 1 ? 26 : 18}
            fill="none"
            stroke={i === 1 ? "#C8A24A" : "#6E7C88"}
            strokeWidth={i === 1 ? 2 : 1.2}
          />
          {i === 1 && (
            <circle
              cx={n.x}
              cy={120}
              r={9}
              fill="#C8A24A"
              fillOpacity=".18"
              stroke="#C8A24A"
              strokeWidth="1.2"
            />
          )}
          <text
            x={n.x}
            y={168}
            textAnchor="middle"
            fontFamily="var(--font-mono-tech), monospace"
            fontSize="10"
            letterSpacing="1.6"
            fill="#4A555F"
          >
            {n.label.toUpperCase()}
          </text>
        </g>
      ))}

      <g
        fontFamily="var(--font-mono-tech), monospace"
        fontSize="9"
        letterSpacing="1.4"
        fill="#7E5B12"
      >
        <text x={130} y={104} textAnchor="middle">
          SPECIFICATION
        </text>
        <text x={270} y={104} textAnchor="middle">
          PURCHASE ORDER
        </text>
        <text x={410} y={104} textAnchor="middle">
          INSPECTED GOODS
        </text>
      </g>

      <g
        stroke="#6E7C88"
        strokeOpacity=".45"
        strokeWidth="1"
        fill="none"
        strokeDasharray="4 4"
      >
        <path d="M60 96V60h420v36" />
      </g>
      <text
        x={270}
        y={48}
        textAnchor="middle"
        fontFamily="var(--font-mono-tech), monospace"
        fontSize="9"
        letterSpacing="1.6"
        fill="#4A555F"
      >
        ONE INVOICE · ONE PACKING LIST · ONE POINT OF CONTACT
      </text>

      <g stroke="#C8A24A" strokeWidth="1" fill="none">
        <path d="M60 200h420" />
        <path d="M60 194v12M480 194v12" />
      </g>
      <text
        x={270}
        y={224}
        textAnchor="middle"
        fontFamily="var(--font-mono-tech), monospace"
        fontSize="9"
        letterSpacing="1.6"
        fill="#7E5B12"
      >
        DRAWING TO BILL OF LADING
      </text>
    </svg>
  );
}

export function PackingDrawing({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 460 380"
      className={className}
      role="img"
      aria-label="Line drawing of a palletised export carton stack, strapped and marked"
    >
      <g fill="none" stroke="#28323A" strokeWidth="1.6" strokeLinejoin="round">
        <path d="M60 300h300v14H60zM60 314h300v18H60z" />
        <path d="M96 314v18M172 314v18M248 314v18M324 314v18" />
        <path d="M74 236h132v64H74zM214 236h132v64H214z" />
        <path d="M74 172h132v64H74zM214 172h132v64H214z" />
        <path
          d="M140 172v64M280 172v64M140 236v64M280 236v64"
          strokeDasharray="6 5"
        />
        <path d="M112 172v142M308 172v142" stroke="#C8A24A" strokeWidth="2" />
        <path
          d="M74 200h272M74 268h272"
          stroke="#C8A24A"
          strokeWidth="2"
          opacity=".55"
        />
      </g>
      <g fill="none" stroke="#9AA7B0" strokeWidth="1">
        <path d="M380 172h34M380 314h34M398 172v142" />
        <path d="M60 348h300M60 340v16M360 340v16" />
      </g>
      <g
        fontFamily="var(--font-mono-tech), monospace"
        fontSize="10.5"
        letterSpacing="1.4"
        fill="#5F7183"
      >
        <text
          x="404"
          y="248"
          transform="rotate(-90 404 248)"
          textAnchor="middle"
        >
          STACK HEIGHT
        </text>
        <text x="210" y="340" textAnchor="middle">
          PALLET FOOTPRINT
        </text>
        <text x="86" y="164" fill="#7E5B12">
          MARKED · SEALED · STRAPPED
        </text>
      </g>
    </svg>
  );
}

const icons: Record<string, string> = {
  construction: "M6 34h28M10 34V16l10-6 10 6v18M16 34v-9h8v9",
  automotive: "M6 26h28M9 26l3-9h16l3 9M9 26v5M31 26v5M13 31h4M23 31h4",
  infrastructure: "M4 34h32M8 34V12M32 34V12M8 16h24M8 22h24M14 34V22M26 34V22",
  rail: "M6 34h28M12 30V8h16v22M12 16h16M16 34l-3 4M24 34l3 4M16 22h2M22 22h2",
  mining: "M4 34h32M6 30l10-14 8 6 6-10M28 12h6v6",
  agriculture:
    "M6 34h28M10 30a5 5 0 1 0 0-.1M28 30a5 5 0 1 0 0-.1M12 26V14h10l4 8h6v8",
  plant: "M4 34h32M8 34V14h10v20M22 34V20h10v14M11 20h4M11 26h4M25 26h4",
  aerospace: "M4 30h32M20 6l6 16h8l-4 6H10l-4-6h8z M20 22v8",
  marine:
    "M6 28c4 4 8 4 14 4s10 0 14-4M8 28l3-9h18l3 9M20 19V8M14 8h12M12 24h16",
};

export function IndustryIcon({
  name,
  className = "",
}: {
  name: keyof typeof icons | string;
  className?: string;
}) {
  return (
    <svg viewBox="0 0 40 40" className={className} fill="none" aria-hidden>
      <path
        d={icons[name] ?? icons.plant}
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function InspectionChart({ className = "" }: { className?: string }) {
  const rows = [
    ["Dimensions", 100],
    ["Grade marking", 100],
    ["Plating / finish", 100],
    ["Carton count", 100],
    ["Documents", 100],
  ] as const;
  return (
    <svg
      viewBox="0 0 420 260"
      className={className}
      role="img"
      aria-label="Pre-shipment check sheet: dimensions, grade marking, plating, carton count and documents"
    >
      <g
        fontFamily="var(--font-mono-tech), monospace"
        fontSize="10"
        letterSpacing="1.4"
        fill="#5F7183"
      >
        <text x="0" y="18">
          PRE-SHIPMENT CHECK SHEET
        </text>
      </g>
      <path d="M0 30h420" stroke="#C8A24A" strokeWidth="1" />
      {rows.map(([label], i) => {
        const y = 62 + i * 38;
        return (
          <g key={label}>
            <text
              x="0"
              y={y + 4}
              fontFamily="var(--font-sans), sans-serif"
              fontSize="13"
              fill="#1A222A"
            >
              {label}
            </text>
            <path
              d={`M170 ${y} h200`}
              stroke="#E0DACE"
              strokeWidth="6"
              strokeLinecap="round"
            />
            <path
              d={`M170 ${y} h200`}
              stroke="#C8A24A"
              strokeWidth="6"
              strokeLinecap="round"
            />
            <g transform={`translate(392 ${y - 8})`}>
              <circle
                cx="8"
                cy="8"
                r="8"
                fill="none"
                stroke="#C8A24A"
                strokeWidth="1.2"
              />
              <path
                d="M4.5 8.5l2.5 2.5L12 5.5"
                stroke="#7E5B12"
                strokeWidth="1.4"
                fill="none"
              />
            </g>
          </g>
        );
      })}
      <path d="M0 246h420" stroke="#E0DACE" strokeWidth="1" />
      <text
        x="0"
        y="240"
        fontFamily="var(--font-mono-tech), monospace"
        fontSize="9"
        letterSpacing="1.4"
        fill="#7E5B12"
      >
        THIRD-PARTY INSPECTION ARRANGED ON REQUEST
      </text>
    </svg>
  );
}
