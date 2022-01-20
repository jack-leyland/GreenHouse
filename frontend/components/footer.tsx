import React from "react";
import { v4 as uuidv4 } from "uuid";

export default function Footer() {
  //Do we really need all these footer links? Privacy policy and GDPR in particular
  const linkLabels = ["Speak to us", "GDPR", "About", "Help", "Privacy Policy"];
  const links = linkLabels.map((label) => {
    return <span className="text-white pr-[1vw] font-logoFont font-normal" key={uuidv4()}>{label}</span>;
  });
  console.log(links)
  return (
      <div className="w-full h-[7.5vh] fixed bottom-0 flex justify-center items-center bg-black">
        <div className="w-[24vw] flex justify-center">
        {links}
        </div>
      </div>
  );
}
