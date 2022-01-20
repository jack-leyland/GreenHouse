import React from "react";

interface props {
    children: React.ReactChild | React.ReactChildren;
  }

export default function PageTitle({children} : props) {
    return(
        <div className="mt-9 ml-9 pb-6 mr-9 border-b-2 border-neutral-100">
            {children}
        </div>
    )
}