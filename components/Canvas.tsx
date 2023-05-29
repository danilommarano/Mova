import { CurrentSVGContext } from "@/contexts/CurrentSVGContext";
import { useContext, useRef } from "react";

export default function Canvas() {
  const svgRef = useRef<HTMLInputElement>(null);
  const svg = useContext(CurrentSVGContext)
 
  return (
    <div ref={svgRef} className='h-full w-full bg-white'>
      <svg version="1.1" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
        <g>
          <rect x='100' y='100' width="100" height="100" fill="blue" />
          <rect x='100' y='250' width="100" height="100" fill="green" />
          <rect x='250' y='100' width="100" height="100" fill="red" />
          <rect x='250' y='250' width="100" height="100" fill="yellow" />
        </g>
      </svg>
    </div>
  )
}
