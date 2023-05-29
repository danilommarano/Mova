import { ReactNode } from "react";

export default function Tabs(props: {children:ReactNode}) {
  return (
    <div className='flex justify-around pt-1'>
      {props.children}
    </div>
  )
}
