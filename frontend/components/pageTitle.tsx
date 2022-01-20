import React from "react";

interface props {
    children: React.ReactChild | React.ReactChildren;
  }

export default function PageTitle({children} : props) {
    return(
        <div className="mt-9 ml-9 pb-2 mr-9 border-b-2 border-neutral-300">
            {children}
        </div>
    )
}