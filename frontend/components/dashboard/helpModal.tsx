import React from "react";
import Link from "next/link";
interface props {
  type: string;
}

export default function HelpModal({ type }: props) {
  const titleStyling =
    "font-bold text-lg pt-2 mb-2 w-full border border-x-0 border-t-0 text-gray-800";
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
            <a
              className="text-blue-500"
              href="https://epc-site-frontend.vercel.app/recommendations"
            >
              recommendations
            </a>{" "}
            page!
          </div>
        </div>
      );
    case "costs":
      return (
        <div className={positionStyling}>
          <div className={titleStyling}>Current Costs</div>
          <div className="py-1">
            <b>Current costs</b> are estimations based on the current efficiency of
            your house features and current energy prices (for more accurate
            cost estimations we advise using a smart meter!).
          </div>
          <div className="py-1">
          <b>Potential costs</b> are projections of what your costs could be if you
            make all of the recommended improvements. To check out these
            improvements see our{" "}
            <a
              className="text-blue-500"
              href="https://epc-site-frontend.vercel.app/recommendations"
            >
              recommendations
            </a>{" "}
            page!
          </div>
          <div className="py-1">
          <b>Area costs</b> are the current average costs paid by other households in your postcode.
          </div>
        </div>
      );
    case "featureEfficiency":
      return (
        <div className={positionStyling}>
          <div className={titleStyling}>Feature Efficiency</div>
          <div className="py-1">
            All features in your house are given an environmental efficiency
            rating from 0-5 , by your assessor(5 being best, 0 being worst). Features which are
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
            <b>Energy Efficiency:</b> Rating from 1-5, given by your assessor (5 being best, 0 being
            worst).
          </div>
          <div className="py-1">
            <b>Environmental Efficiency:</b> Rating from 1-5 given by your assessor (5 being best, 0
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

    case "lighting":
      return (
        <div className={positionStyling}>
          <div className={titleStyling}>Lighting</div>
          <div className="py-1">
            <b>Description:</b> Description of your lighting.
          </div>
          <div className="py-1">
            <b>Lighting Cost Current:</b> Current estimated lighting cost per year.
          </div>
          <div className="py-1">
            <b>Lighting Cost Potential:</b> Potential estimated lighting cost per year after
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

      case "water":
        return (
          <div className={positionStyling}>
            <div className={titleStyling}>Water</div>
            <div className="py-1">
              <b>Description:</b> Description of your hot water system.
            </div>
            <div className="py-1">
              <b>Hot Water Cost Current:</b> Current estimated hot water cost per year.
            </div>
            <div className="py-1">
              <b>Hot Water Cost Potential:</b> Potential estimated hot water cost per year after
            improvements are made.
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


      case "heating":
        return (
          <div className={positionStyling}>
            <div className={titleStyling}>Heating</div>
            <div className="py-2">
              <div className="text-gray-800 border border-x-0 border-t-0 w-full font-bold">Main Heat</div>
            </div>
            <div className="py-1">
              <b>Main Heat Description:</b> Description of {"property's"} main heating system.
            </div>

            <div className="py-1">
              <b>Heating Costs Current:</b> Current estimated heating costs.
            </div>

            <div className="py-1">
              <b>Heating Costs Potential:</b> Potential estimated heating costs once improvements are made.
            </div>

            <div className="py-1">
              <b>Main Heat Energy Efficiency:</b> Rating from 1-5 (5 being best, 0
              being worst), for overall heating energy efficiency.
            </div>

            <div className="py-1">
              <b>Main Heat Environmental Efficiency:</b> Rating from 1-5 (5 being best, 0
              being worst), for overall heating environmental efficiency.
            </div>

            <div className="py-2">
              <div className="text-gray-800 border border-x-0 border-t-0 w-full font-bold">Heating Control</div>
            </div>

            <div className="py-1">
              <b>Main Heating Control Description:</b> Property's type of main heating control.
            </div>

            <div className="py-1">
              <b>Heating Control Energy Efficiency:</b> Rating from 1-5 (5 being best, 0
              being worst), for heating control energy efficiency.
            </div>

            <div className="py-1">
              <b>Heating Control Environmental Efficiency:</b> Rating from 1-5 (5 being best, 0
              being worst), for heating control environmental efficiency.
            </div>

            <div className="py-2">
              <div className="text-gray-800 border border-x-0 border-t-0 w-full font-bold">Fuel</div>
            </div>

            <div className="py-1">
              <b>Main Fuel:</b> Type of fuel used to power central heating.
            </div>

            <div className="py-1">
              <b>Main Gas Flag:</b> Whether mains gas is available. Y means that there is a gas meter or a gas-burning appliance in the dwelling.
            </div>

            <div className="py-2">
              <div className="text-gray-800 border border-x-0 border-t-0 w-full font-bold">Thermodynamics</div>
            </div>

            <div className="py-1">
              <b>Number of Heated Rooms:</b> The number of heated rooms in the property.
            </div>

            <div className="py-1">
              <b>Heat Loss Corridor:</b> Indicates that the flat contains a corridor through which heat is lost. Heat loss corridor, one of: no corridor, heated corridor or unheated corridor.
            </div>

            <div className="py-1">
              <b>Unheated Corridor Length:</b> The total length of unheated corridor in the flat in m<sup>2</sup>.
            </div>

            <div className="py-2">
              <div className="text-gray-800 border border-x-0 border-t-0 w-full font-bold">Secondary Heating</div>
            </div>

            <div className="py-1">
              <b>Secondary Heating Description:</b> Description of property's secondary heating system.
            </div>

            <div className="py-1">
              <b>Secondary Heating Energy Efficiency:</b> Rating from 1-5 (5 being best, 0
              being worst), for secondary heating energy efficiency.
            </div>

          </div>
        );

    default:
      return null;
  }
}
