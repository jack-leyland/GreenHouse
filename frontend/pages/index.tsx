import type { ReactElement } from "react";
import Router from "next/router";
import Layout from "../components/layout";
import SearchIcon from "../public/assets/search-icon.svg";

const Landing = () => {
  const text: string = "Type anything and press enter";

  return (
    <div className="w-screen h-screen flex justify-center">
      <div className="h-[250px] relative top-1/3 grid place-items-center">
        <span className="w-full text-green-500 font-sans font-extrabold text-8xl ">
          Great App Name Inc.
        </span>
        <div className="relative rounded-full w-4/6 h-[40px] border-2 border-gray-400 pl-[5px] focus-within:border-gray-600">
          <SearchIcon className="fill-[none] stroke-gray-400 w-[25px] pt-[5px]" />
          <input
            className="absolute text-gray-500 rounded-sm top-0 w-[470px] h-full ml-[30px] outline-0"
            placeholder="Type anything and press enter"
            onKeyUp={(e) => e.key === "Enter" && Router.push("/main")}
          ></input>
        </div>
      </div>
    </div>
  );
};

Landing.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export default Landing;
