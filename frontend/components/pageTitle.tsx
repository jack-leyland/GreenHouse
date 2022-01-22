import React from "react";

interface props {
    title: string,
    subtitle: string
  }

export default function PageTitle({title, subtitle} : props) {
    return(
        <div className="mt-9 ml-9 pb-2 mr-9 border-b-2 border-neutral-300">
            <div>
              <h1 className="text-2xl pb-2 font-semibold text-black">{title}</h1>
              <h3 className="text-sm">{subtitle}</h3>
            </div>
        </div>
    )
}