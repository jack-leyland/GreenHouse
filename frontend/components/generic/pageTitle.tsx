import React from "react";

interface props {
  title: string;
  subtitle?: string;
  onClick?: React.MouseEventHandler;
}

export default function PageTitle({ title, subtitle, onClick }: props) {
  return (
    <>
      <div className="mt-4 ml-9 pb-2 mr-9 border-b-2 border-neutral-300 min-w-[740px]">
        <h1 className="text-2xl pb-2 font-semibold text-zinc-800">{title}</h1>
        <div className="w-full flex items-center">
          <h3 className="text-md mr-[10px]">{subtitle}</h3>
          <button
            className="mr-8 p-1 px-3 text-center border hover:bg-gray-100 hover:scale-105 overflow-x-hidden whitespace-nowrap"
            onClick={onClick}
          >
            More Info
          </button>
          <div className="absolute top-2 hidden logoRender:block text-[40px] right-[30px] text-emerald font-logoFont font-black text-right justify-right">
            GreenHouse
          </div>
        </div>
      </div>
    </>
  );
}
