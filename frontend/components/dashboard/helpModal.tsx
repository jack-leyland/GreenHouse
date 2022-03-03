import React from "react";

interface props {
  type: string; 
}

export default function HelpModal({ type }: props) {
  switch(type) {
    case "epcChart":
        return (
            <div className="w-full flex flex-col">
                <div className="py-1">
                    Properties are given a Standard Assessment Procedure (SAP) score from 0-100 based on their energy efficiency. 
                    For easier readability, these scores are divided into ratings A-G (Higher scores e.g. those between 100-80, 
                    which are rated A, are more energy efficienct, than lower scores e.g. 0-20, which are rated G).
                </div>
                <div className="py-1">
                    SAP scores take into account a number of different factors including, but not limited to,
                    construction materials, heating systems, insulation, lighting, ventilation and air leakage. To see more information about 
                    the SAP procedure see <a href="https://www.gov.uk/guidance/standard-assessment-procedure">here</a>
                </div>
            </div>
        )
    case "currentRating":
        return (
            <div className="w-full flex flex-col">
                <div>
                    Your current rating is based on the SAP score your house was given in it&apos;s last inspection (view 
                    top of page for more information about your last EPC inspection).
                </div>
            </div>
        )
    case "potentialRating":
        return (
            <div className="w-full flex flex-col">
                <div>
                    Your potential rating is a projection of the SAP score you could achieve if you make all the 
                    suggested improvements to your house. To see more about your potential improvements, see our 
                    <a href={`${window.location.href}/recomendations`}>recomendations page</a>!
                </div>
            </div>
        )
    case "costs":
        return (
            <div className="w-full flex flex-col">
                <div>
                    Current costs are estimations based on the current efficiency of your house 
                    features and current energy prices (for more accurate cost estimations we advise using a smart meter!).
                </div>
                <div>
                    Potential costs are projections of what your costs could be if you make all of the recommended improvements. 
                    To check out these improvements see our <a href={`${window.location.href}/recomendations`}>recommendations page</a>!
                </div>
            </div>
        )
    
    default:
        return null
  }
}
