import React from 'react';
import Link from 'next/link';
interface props {
  type: string;
}

export default function HelpModal({ type }: props) {
  switch (type) {
    case 'epcChart':
      return (
        <div className="w-full flex flex-col p-2">
          <div className="font-bold text-lg pt-2 mb-2 w-full border border-x-0 border-t-0">
            EPC Ratings
          </div>
          <div className="py-1">
            Properties are given a Standard Assessment Procedure (SAP) score
            from 0-100 based on their energy efficiency. These scores broken
            down into bands from A-G (for more info and to see the boundaries{' '}
            <a
              className="text-blue-500 cursor-pointer"
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
            more information about the SAP calculation see{' '}
            <a
              className="text-blue-500 cursor-pointer"
              href="https://www.gov.uk/guidance/standard-assessment-procedure"
            >
              here
            </a>
            .
          </div>
        </div>
      );
    case 'currentRating':
      return (
        <div className="w-full flex flex-col">
          <div className="font-bold text-lg pt-2 mb-2 w-full border border-x-0 border-t-0">
            Current Rating
          </div>
          <div className="py-1">
            Your current rating is based on the SAP score your house was given
            in it&apos;s last inspection (See the <i>More Info</i> button at the
            top of this page!)
          </div>
        </div>
      );
    case 'potentialRating':
      return (
        <div className="w-full flex flex-col">
          <div className="font-bold text-lg pt-2 mb-2 w-full border border-x-0 border-t-0">
            Potential Rating
          </div>
          <Link href={'/recommendations'} passHref>
            <div className="py-1">
              Your potential rating is a projection of the SAP score you could
              achieve if you make all the suggested improvements to your house.
              To see more about your potential improvements, see our{' '}
              <a className="text-blue-500 cursor-pointer">recommendations</a>{' '}
              page!
            </div>
          </Link>
        </div>
      );
    case 'costs':
      return (
        <div className="w-full flex flex-col">
          <div className="font-bold text-lg pt-2 mb-2 w-full border border-x-0 border-t-0">
            Current Costs
          </div>
          <div className="py-1">
            Current costs are estimations based on the current efficiency of
            your house features and current energy prices (for more accurate
            cost estimations we advise using a smart meter!).
          </div>
          <Link href={'/recommendations'} passHref>
            <div className="py-1">
              Potential costs are projections of what your costs could be if you
              make all of the recommended improvements. To check out these
              improvements see our{' '}
              <a className="text-blue-500 cursor-pointer">recommendations</a>{' '}
              page!
            </div>
          </Link>
        </div>
      );
    case 'featureEfficiency':
      return (
        <div className="w-full flex flex-col">
          <div className="font-bold text-lg pt-2 mb-2 w-full border border-x-0 border-t-0">
            Feature Efficiency
          </div>
          <div className="py-1">
            All features in your house are given an environmental efficiency
            rating from 0-5 (5 being best, 0 being worst). Features which are
            less environmentally friendly are given a lower rating. Click on the
            house to see more about each feature!
          </div>
        </div>
      );

    case 'carbonProduction':
      return (
        <div className="w-full flex flex-col">
          <div className="font-bold text-lg pt-2 mb-2 w-full border border-x-0 border-t-0">
            Carbon Production
          </div>
          <div className="py-1">
            This is the estimated CO<sub>2</sub> production for your house in
            tonnes per year. This estimate is drawn from the estimated amount of
            energy your house uses for heating, lighting and hot water.
          </div>
        </div>
      );

    default:
      return null;
  }
}
