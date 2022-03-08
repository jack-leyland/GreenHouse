import React from 'react';

interface props {
  title: string;
  subtitle?: string;
  onClick?: React.MouseEventHandler;
}

export default function PageTitle({ title, subtitle, onClick }: props) {
  return (
    <>
      <div className="px-2 py-8 flex h-full w-full">
        <div className="w-full flex items-center flex-row justify-between">
          <h3 className="text-xs md:text-base pl-6 text-gray-900 font-semibold">{subtitle}</h3>
          <div className="relative mr-6">
            <button
              className="bg-primary overflow-hidden text-xs md:text-base flex ml-auto text-white py-1 md:px-6 px-2 focus:outline-none rounded hover:bg-opacity-100 bg-opacity-90"
              onClick={onClick}
            >
              More Details
            </button>
          </div>
         
        </div>
      </div>
    </>
  );
}
