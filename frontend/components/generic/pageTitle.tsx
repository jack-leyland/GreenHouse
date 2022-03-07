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
        <div className="w-full flex items-center flex-row justify-end">
          <h3 className="text-xs md:text-base pl-6 text-gray-900">{subtitle}</h3>
          <button
            className="text-xs   md:text-base flex ml-auto text-white bg-green-500 border-0 py-1 px-4 focus:outline-none hover:bg-green-600 rounded"
            onClick={onClick}
          >
            More Details
          </button>
         
        </div>
      </div>
    </>
  );
}
