import React from "react";

interface props {
  title: string;
  subtitle?: string;
  onClick?: React.MouseEventHandler;
}

export default function PageTitle({ title, subtitle, onClick }: props) {
  return (
    <>
      <div className="mt-9 ml-9 pb-2 mr-9 border-b-2 border-neutral-300">
        <h1 className="text-2xl pb-2 font-semibold text-zinc-800">{title}</h1>
        <div className="w-full flex items-center justify-between">
          <h3 className="text-md w-1/2">{subtitle}</h3>
          <button
            className="mr-8 p-1 px-3 text-center border hover:bg-gray-100 hover:scale-105"
            onClick={onClick}
          >
            More Info
          </button>
        </div>
      </div>
    </>
  );
}
