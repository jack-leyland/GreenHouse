import React from 'react';

interface props {
  title: string;
  subtitle: string;
  postcode: string;
}

export default function PageTitle({ title, subtitle, postcode }: props) {
  return (
    <div className="mt-9 ml-9 pb-2 mr-9 border-b-2 border-neutral-300">
      <h1 className="text-2xl pb-2 font-semibold text-black">{title}</h1>
      <div className="w-[100%] flex">
        <h3 className="text-sm w-[50%]">{subtitle + ' ' + postcode}</h3>
        <h3 className="text-sm w-[50%] text-right">
          Inspection Date: PLACEHOLDER
        </h3>
      </div>
    </div>
  );
}
