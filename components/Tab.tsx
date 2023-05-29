import { ReactNode } from "react";

export default function Tab(props: { onClick?: () => void; label: string}) {
  return (
    <button
      className='grow text-gray-400 py-1 px-2 rounded-t hover:text-white focus:border-white focus:text-white hover:border-white border-b border-gray-400'
      onClick={props.onClick}
    >
      <p>
        {props.label}
      </p>
      <div className='h-1 w-full'></div>
    </button>
  )
}
