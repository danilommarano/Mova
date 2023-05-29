import { ReactNode } from "react";

export default function ElementConfig(props: {children: ReactNode}) {
  return (
    <div className='h-80 w-full bg-[#353535]'>
      {props.children}
    </div>
  )
}
