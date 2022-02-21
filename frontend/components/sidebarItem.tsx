import React from "react";

interface props {
  icon: React.ReactChild | React.ReactChildren;
  label: string;
}

export default function SidebarItem({ icon, label }: props) {
  return (
    <a className="hover:cursor-pointer flex justify-start gap-3 px-8 py-2 mt-2 text-sm font-semibold bg-transparent hover:bg-green-100 focus:bg-gray-200 focus:outline-none focus:shadow-outline">
      {icon}
      {label}
    </a>
  );
}
