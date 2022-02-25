import React from "react";

interface props {
  icon: React.ReactChild | React.ReactChildren;
  label: string;
}

export default function SidebarItem({ icon, label }: props) {
  let style =
    "hover:cursor-pointer flex flex-col justify-center items-center gap-3 px-8 py-2 mt-2 text-xs " +
    "bg-transparent hover:bg-green-100 focus:bg-gray-200 focus:outline-none focus:shadow-outline ";
  return (
    <a className={style}>
      {icon}
      {label}
    </a>
  );
}
