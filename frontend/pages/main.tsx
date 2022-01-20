import type { ReactElement } from "react";
import Layout from "../components/layout";
import Sidebar from "../components/sidebar";
import Card from "../components/card";
import PageTitle from "../components/pageTitle";
import OverviewGrid from "../components/overviewGrid";

const Main = () => {

  
  return (
    <>
      <div className="w-full flex flex-col bg-slate-50 text-gray-500">
        <PageTitle>
            <div>
              <h1 className="text-2xl pb-2 font-semibold text-black">Overview</h1>
              <h3 className="text-sm">Address...</h3>
            </div>
        </PageTitle>
        <OverviewGrid/>
      </div>
    </>
  );
};

Main.getLayout = function getLayout(page: ReactElement) {
  return (
    <Layout>
      <div className = "flex">
        <Sidebar />
        {page}
      </div>
    </Layout>
  );
};

export default Main;
