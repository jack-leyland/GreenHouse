import React from "react";
import { v4 as uuidv4 } from "uuid";

type Props = {
  fixed?: boolean;
};

export default function Footer({ fixed }: Props) {
  //Do we really need all these footer links? Privacy policy and GDPR in particular
  const linkLabels = ["Speak to us", "GDPR", "About", "Help", "Privacy Policy"];

  const links = linkLabels.map((label) => {
    return (
      <span
        className="text-white pr-[1vw] font-logoFont font-normal"
        key={uuidv4()}
      >
        {label}
      </span>
    );
  });
  return (
    <div
      className={
        "w-full h-[7.5vh] flex justify-center items-center bg-black " +
        (fixed ? "fixed bottom-0" : "top-[100vh]")
      }
    >
      <div className="flex justify-center">{links}</div>
    </div>
  );
}
