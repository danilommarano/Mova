import { ReactNode } from "react";

export default function Timeline(props : {children:ReactNode}) {
  return (
    <div className='w-full h-1 bg-white '>
        {props.children}
    </div>
  )
}