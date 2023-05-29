import { ReactNode } from "react";

export default function Sidebar(props: {children: ReactNode}) {
  return (
    <nav className='h-screen w-96 bg-[#2D2D2E]'>
      {props.children}
    </nav>
  )
}
