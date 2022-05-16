import React, { Dispatch, SetStateAction } from 'react';
import { GiWaterDrop, GiFireplace } from 'react-icons/gi';
import { BsLightbulb } from 'react-icons/bs';
import { epcCertificateObject, packagedAnalyticsObject } from '../../types';
import { AiFillQuestionCircle } from 'react-icons/ai';

interface props {
  data: epcCertificateObject['House']['costs'];
  analytics: packagedAnalyticsObject['cost'];
  setModalHandler: Dispatch<SetStateAction<string>>;
}

export default function CostSummary({
  data,
  analytics,
  setModalHandler,
}: props) {
  const tdStyle = 'border ';
  const titleStyle =
    'justify-center font-semibold text-base md:text-lg flex items-center gap-1';
  const headStyle = tdStyle + 'font-semibold md:text-lg';

  return (
    <div className="py-2 flex flex-col h-5/6 overflow-x-scroll">
      <table className="h-full text-center">
        <tr className="bg-gray-50">
          <td className="bg-white flex justify-center items-center h-full">
            <AiFillQuestionCircle
              size={24}
              className="hover:cursor-pointer"
              onClick={() => setModalHandler('costs')}
            />
          </td>
          <td className={headStyle}>Current Cost</td>
          <td className={headStyle}>Potential Cost</td>
          <td className={headStyle}>Area Average</td>
        </tr>

        <tbody>
          <tr>
            <td className={tdStyle}>
              <div className={titleStyle}>
                Heating <GiFireplace color="#eb6434" />
              </div>
            </td>
            <td className={tdStyle}>
              <b>£{data.heatingCostCurrent}</b>/year
            </td>
            <td className={tdStyle}>
              <b>£{data.heatingCostPotential}</b>/year
            </td>
            <td className={tdStyle}>
              <b>£{analytics?.meanCurrentHeatingCost}</b>/year
            </td>
          </tr>

          <tr className="bg-gray-50">
            <td className={tdStyle}>
              <div className={titleStyle}>
                Hot Water <GiWaterDrop color="#34bdeb" />{' '}
              </div>
            </td>
            <td className={tdStyle}>
              <b>£{data.hotWaterCostCurrent}</b>/year
            </td>
            <td className={tdStyle}>
              <b>£{data.hotWaterCostPotential}</b>/year
            </td>
            <td className={tdStyle}>
              <b>£{analytics?.meanCurrentHotWaterCost}</b>/year
            </td>
          </tr>

          <tr>
            <td className={tdStyle}>
              <div className={titleStyle}>
                Lighting <BsLightbulb color="#d4c328" />
              </div>
            </td>
            <td className={tdStyle}>
              <b>£{data.lightingCostCurrent}</b>/year
            </td>
            <td className={tdStyle}>
              <b>£{data.lightingCostPotential}</b>/year
            </td>
            <td className={tdStyle}>
              <b>£{analytics?.meanCurrentLightingCost}</b>/year
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
