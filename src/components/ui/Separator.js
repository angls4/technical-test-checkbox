export const Separator = ({ className }) => (
  <div className={"separator px-3.75 py-[9.5px] " + (className ? className : "")}>
    <svg 
      width="340" 
      height="1" 
      viewBox="0 0 340 1" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
    >
      <line 
        x1="0.35" 
        y1="0.349997" 
        x2="339.65" 
        y2="0.349997" 
        stroke="currentColor" 
        strokeWidth="0.7" 
        strokeLinecap="round"
      />
    </svg>
  </div>
);
