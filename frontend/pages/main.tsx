import type { ReactElement } from "react";
import Router from "next/router";
import Layout from "../components/layout";
import Navbar from "../components/navbar";

const Main = () => {
  return (
    <div className="grid place-items-center">
      <div className="w-5/6 h-[600px] text-[90px] font-extrabold text-black grid place-items-center rounded-lg mt-[40px] bg-green-300">
        MUCH DATA, MUCH CONTENT
      </div>
    </div>
  );
};

Main.getLayout = function getLayout(page: ReactElement) {
  return (
    <Layout>
      <Navbar />
      {page}
    </Layout>
  );
};

export default Main;
