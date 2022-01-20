import type { ReactElement } from "react";
import Layout from "../components/layout";
import Sidebar from "../components/sidebar";
import Card from "../components/card";
import PageTitle from "../components/pageTitle";


const Main = () => {
  return (
    <>
      <div className="w-full flex flex-col">
        <PageTitle>
          <div>
            <h1 className="text-2xl pb-2">Overview</h1>
            <h3 className="text-sm">Address...</h3>
          </div>
        </PageTitle>

        <div className="grid grid-cols-6 grid-rows-5 w-full h-full p-8 gap-8">

          {/*Style these cards based on the epc band*/}
          <Card position={"col-start-1 col-end-1 bg-green-400"}>
            <div>
              <h3>Current Energy Rating</h3>
            </div>
          </Card>
          {/*Style these cards based on the epc band*/}
          <Card position={"col-start-2 col-end-2 bg-yellow-300"}>
            <div>
              <h3>Potential Energy Rating</h3>
            </div>
          </Card>
          <Card position={"col-start-3 col-end-5"}>
            <div>
              <h3>Potential Annual Savings</h3>
            </div>
          </Card>

          <Card position={"col-start-1 col-end-4 row-start-2 row-end-5"}>
            <div>
              <h3>Your House</h3>
            </div>
          </Card>

          <Card position={"col-start-4 col-end-7 row-start-2 row-end-5"}>
            <div>
              <h3>Map</h3>
            </div>
          </Card>

        </div>
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
