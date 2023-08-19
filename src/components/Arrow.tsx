type ArrowProps = {
  className?: string;
};

const Arrow = ({ className }: ArrowProps) => (
  <svg
    className={className}
    xmlns="http://www.w3.org/2000/svg"
    xmlSpace="preserve"
    width="20px"
    height="20px"
    viewBox="0 0 256 256"
  >
    <g
      style={{
        stroke: "none",
        strokeWidth: 0,
        strokeDasharray: "none",
        strokeLinecap: "butt",
        strokeLinejoin: "miter",
        strokeMiterlimit: 10,
        fill: "none",
        fillRule: "nonzero",
        opacity: 1,
      }}
    >
      <path
        d="M2.15 41.551 84.455 1.167c3.131-1.536 6.524 1.558 5.282 4.817L75.395 43.632a3.836 3.836 0 0 0 0 2.735l14.342 37.648c1.241 3.259-2.152 6.353-5.282 4.817L2.15 48.449c-2.867-1.406-2.867-5.492 0-6.898z"
        style={{
          stroke: "none",
          strokeWidth: 1,
          strokeDasharray: "none",
          strokeLinecap: "butt",
          strokeLinejoin: "miter",
          strokeMiterlimit: 10,
          fill: "red",
          fillRule: "nonzero",
          opacity: 1,
        }}
        transform="matrix(2.81 0 0 2.81 1.407 1.407)"
      />
    </g>
  </svg>
);
export default Arrow;
