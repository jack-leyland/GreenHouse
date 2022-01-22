import type { ReactElement } from "react";
import Layout from "../components/layout";
import Sidebar from "../components/sidebar";
import Card from "../components/card";
import PageTitle from "../components/pageTitle";
import Lottie from 'react-lottie-player'

import loadingJson from '../public/assets/animation/loading.json'
import errorJson from '../public/assets/animation/error.json'

import { gql, useQuery } from '@apollo/client';
const GET_CERTIFICATES = gql`
  {
    certificate(name: "b30ef8fbb974a1d8164964c489bfed5b663166a9b4ecee46bf0d80f441e2320")
  }
`;

const Main = () => {

const {loading, error, data} = useQuery(GET_CERTIFICATES);

let epcData
if(data){
  epcData = JSON.parse(data.certificate)
}

interface ColorDictionary<Value> {
  [id: string]: Value;
}
const epcColorDictionary: ColorDictionary<string>  = {
  "A": "green-700",
  "B": "green-300",
  "C": "lime-700",
  "D": "yellow-300",
  "E": "amber-500",
  "F": "orange-600",
  "G": "red-700"
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
              <Card style={"col-start-1 col-end-3"} backgroundColor={epcColorDictionary[epcData["current-energy-rating"]]}>
                <div>
                  <h3>Current Energy Rating</h3>
                  <div className="p-2 font-bold text-3xl">{epcData["current-energy-rating"]}</div>
                </div>
              </Card>
              {/*Style these cards based on the epc band*/}
              <Card style={`col-start-3 col-end-5`} backgroundColor={epcColorDictionary[epcData["current-energy-rating"]]}>
                <div>
                  <h3>Potential Energy Rating</h3>
                  <div className="p-2 font-bold text-3xl">{epcData["potential-energy-rating"]}</div>
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
        : 
        <>
        {
          loading ?
          <div className="w-full flex flex-col justify-center items-center bg-slate-50">
            <h1 className="animate-fade text-3xl font-bold pb-2">Loading...</h1>
              <Lottie
                loop
                animationData={loadingJson}
                play
                style={{ width: 150, height: 150 }}
              />
          </div>
        :
        <>
        {
          error && !data ?
          <div className="w-full flex flex-col justify-center items-center bg-slate-50">
            <h1 className="animate-fade text-3xl font-bold pb-2">Opps, there was an error, try again later...</h1>
              <Lottie
                loop
                animationData={errorJson}
                play
                style={{ width: 150, height: 150 }}
              />
          </div>
        :
          null     
        }
        </>    
        }
        </>
      }
  </>
);
};



Main.getLayout = function getLayout(page: ReactElement) {
  return (
    <Layout>
      <div className = "flex m-4 shadow-2xl rounded-2xl overflow-hidden">
        <Sidebar />
        {page}
      </div>
    </Layout>
  );
};

export default Main;
