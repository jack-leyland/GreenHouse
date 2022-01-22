import type { ReactElement } from "react";
import Layout from "../components/layout";
import Sidebar from "../components/sidebar";
import Card from "../components/card";
import PageTitle from "../components/pageTitle";

import { gql, useQuery } from '@apollo/client';
const GET_CERTIFICATES = gql`
  {
    certificate(name: "b30ef8fbb974a1d8164964c489bfed5b663166a9b4ecee46bf0d80f441e23207")
  }
`;

const Main = () => {

const {loading, error, data} = useQuery(GET_CERTIFICATES);

let epcData
if(data){
  epcData = JSON.parse(data.certificate)
}

return (
  <>
      {
        data ?
        <div className="w-full flex flex-col bg-slate-50 text-gray-500">
          <PageTitle
            title={"Overview"}
            subtitle={epcData["address"]}
          />
          <div className="grid grid-cols-10 grid-rows-5 w-full h-full p-6 gap-6 pr-12">
                {/*Style these cards based on the epc band*/}
              <Card style={"col-start-1 col-end-3"}>
                <div>
                  <h3>Current Energy Rating</h3>
                  <div>{epcData["current-energy-rating"]}</div>
                </div>
              </Card>
              {/*Style these cards based on the epc band*/}
              <Card style={`col-start-3 col-end-5`}>
                <div>
                  <h3>Potential Energy Rating</h3>
                  <div>{epcData["potential-energy-rating"]}</div>
                </div>
              </Card>
              <Card style={"col-start-5 col-end-7"}>
                <div>
                  <h3>Potential Annual Savings</h3>
                </div>
              </Card>
              <Card style={"col-start-7 col-end-9"}>
                <div>
                  <h3>C02 Reduction Potential</h3>
                </div>
              </Card>

              <Card style={"col-start-1 col-end-6 row-start-2 row-end-4"}>
                <div>
                  <h3>Your House</h3>
                  <div>

                  </div>
                </div>
              </Card>

              <Card style={"col-start-6 col-end-11 row-start-2 row-end-4"}>
                <div>
                  <h3>Map</h3>
                </div>
              </Card>

              <Card style={"col-start-1 col-end-4 row-start-4 row-end-6"}>
                <div>
                  <h3>Spending</h3>
                  <div>
                  </div>
                </div>
              </Card>

              <Card style={"col-start-4 col-end-7 row-start-4 row-end-6"}>
                <div>
                  <h3>C02 Production</h3>
                </div>
              </Card>

              <Card style={"col-start-7 col-end-10 row-start-4 row-end-6"}>
                <div>
                  <h3>Potential Savings</h3>
                </div>
              </Card>
            </div>
        </div>
        : null
      }
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
