import React from "react";
import Card from "./card"

export default function OverviewGrid() {
    return(
        <div className="grid grid-cols-10 grid-rows-5 w-full h-full p-6 gap-6 pr-12">
            {/*Style these cards based on the epc band*/}
          <Card style={"col-start-1 col-end-3 bg-green-400"}>
            <div>
              <h3>Current Energy Rating</h3>
            </div>
          </Card>
          {/*Style these cards based on the epc band*/}
          <Card style={"col-start-3 col-end-5 bg-yellow-300"}>
            <div>
              <h3>Potential Energy Rating</h3>
            </div>
          </Card>
          <Card style={"col-start-5 col-end-7"}>
            <div>
              <h3>Potential Annual Savings</h3>
            </div>
          </Card>
          <Card style={"col-start-7 col-end-9"}>
            <div>
              <h3>Potential Carbon Reduction</h3>
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
    )
}