import React from "react";
import Link from "next/link";
interface props {
  type: string;
}

export default function HelpModal({ type }: props) {
  const titleStyling =
    "font-bold text-lg pt-2 mb-2 w-full border border-x-0 border-t-0";
  const positionStyling = "w-full flex flex-col p-2";

  switch (type) {
    case "epcChart":
      return (
        <div className={positionStyling}>
          <div className={titleStyling}>EPC Ratings</div>
          <div className="py-1">
            Properties are given a Standard Assessment Procedure (SAP) score
            from 0-100 based on their energy efficiency. These scores broken
            down into bands from A-G (for more info and to see the boundaries{" "}
            <a
              className="text-blue-500"
              href="https://www.edfenergy.com/energy-efficiency/how-improve-your-epc-rating"
            >
              click here
            </a>
            ).
          </div>
          <div className="py-1">
            SAP scores take into account a number of different factors
            including, but not limited to: construction materials, heating
            systems, insulation, lighting, ventilation and air leakage. To see
            more information about the SAP calculation see{" "}
            <a
              className="text-blue-500"
              href="https://www.gov.uk/guidance/standard-assessment-procedure"
            >
              here
            </a>
            .
          </div>
        </div>
      );
    case "currentRating":
      return (
        <div className={positionStyling}>
          <div className={titleStyling}>Current Rating</div>
          <div className="py-1">
            Your current rating is based on the SAP score your house was given
            in it&apos;s last inspection (See the <i>More Info</i> button at the
            top of this page!)
          </div>
        </div>
      );
    case "potentialRating":
      return (
        <div className={positionStyling}>
          <div className={titleStyling}>Potential Rating</div>
          <div className="py-1">
            Your potential rating is a projection of the SAP score you could
            achieve if you make all the suggested improvements to your house. To
            see more about your potential improvements, see our{" "}
            <Link href="/recommendations">
              <a className="text-blue-500">recommendations</a>{" "}
            </Link>
            page!
          </div>
        </div>
      );
    case "costs":
      return (
        <div className={positionStyling}>
          <div className={titleStyling}>Current Costs</div>
          <div className="py-1">
            Current costs are estimations based on the current efficiency of
            your house features and current energy prices (for more accurate
            cost estimations we advise using a smart meter!).
          </div>
          <div className="py-1">
            Potential costs are projections of what your costs could be if you
            make all of the recommended improvements. To check out these
            improvements see our{" "}
            <Link href="/recommendations">
              <a className="text-blue-500">recommendations</a>{" "}
            </Link>
            page!
          </div>
        </div>
      );
    case "featureEfficiency":
      return (
        <div className={positionStyling}>
          <div className={titleStyling}>Feature Efficiency</div>
          <div className="py-1">
            All features in your house are given an environmental efficiency
            rating from 0-5 (5 being best, 0 being worst). Features which are
            less environmentally friendly are given a lower rating. Click on the
            house to see more about each feature!
          </div>
        </div>
      );

    case "carbonProduction":
      return (
        <div className={positionStyling}>
          <div className={titleStyling}>Carbon Production</div>
          <div className="py-1">
            This is the estimated CO<sub>2</sub> production for your house in
            tonnes per year. This estimate is drawn from the estimated amount of
            energy your house uses for heating, lighting and hot water.
          </div>
        </div>
      );

    case "genericFeature":
      return (
        <div className={positionStyling}>
          <div className={titleStyling}>House Feature</div>
          <div className="py-1">
            <b>Description:</b> Description of your house feature.
          </div>
          <div className="py-1">
            <b>Energy Efficiency:</b> Rating from 1-5 (5 being best, 0 being
            worst).
          </div>
          <div className="py-1">
            <b>Environmental Efficiency:</b> Rating from 1-5 (5 being best, 0
            being worst).
          </div>
        </div>
      );

    case "windows":
      return (
        <div className={positionStyling}>
          <div className={titleStyling}>Windows</div>
          <div className="py-1">
            <b>Description:</b> Description of your windows.
          </div>
          <div className="py-1">
            <b>Glazed Area:</b> Ranged estimate of the total glazed area of the
            Habitable Area.
          </div>
          <div className="py-1">
            <b>Glazed Type:</b> Type of glazing, either single, double or
            triple.
          </div>
          <div className="py-1">
            <b>Multi Glaze Proportion:</b> Percentage of the windows in the
            house with more than single glazing.
          </div>
          <div className="py-1">
            <b>Energy Efficiency:</b> Rating from 1-5 (5 being best, 0 being
            worst).
          </div>
          <div className="py-1">
            <b>Environmental Efficiency:</b> Rating from 1-5 (5 being best, 0
            being worst).
          </div>
        </div>
      );

    case "windows":
      return (
        <div className={positionStyling}>
          <div className={titleStyling}>Lighting</div>
          <div className="py-1">
            <b>Description:</b> Description of your lighting.
          </div>
          <div className="py-1">
            <b>Lighting Cost Current:</b> Current estimated lighting costs.
          </div>
          <div className="py-1">
            <b>Lighting Cost Potential:</b> Potential lighting cost after
            improvements are made.
          </div>
          <div className="py-1">
            <b>Low Energy Lighting:</b> The percentage of low energy lighting
            present in the property as a percentage of the total fixed lights.
          </div>
          <div className="py-1">
            <b>Energy Efficiency:</b> Rating from 1-5 (5 being best, 0 being
            worst).
          </div>
          <div className="py-1">
            <b>Environmental Efficiency:</b> Rating from 1-5 (5 being best, 0
            being worst).
          </div>
        </div>
      );

    default:
      return null;
  }
}
