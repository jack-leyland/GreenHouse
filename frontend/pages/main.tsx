import type { ReactElement } from "react";
import Layout from "../components/layout";
import Sidebar from "../components/sidebar";
import Card from "../components/card";
import PageTitle from "../components/pageTitle";

const Main = () => {
  return (
    <>
      <div className="w-full">
        <PageTitle>
          <div>
            <h1 className="text-2xl pb-2">Overview</h1>
            <h3 className="text-sm">Address...</h3>
          </div>
        </PageTitle>

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
