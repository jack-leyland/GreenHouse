import React, { ReactElement, useState, useEffect } from 'react';
import BackButton from '../assets/arrow-left.svg';

type AddressObject = {
  address: string;
  lmk: string;
};

type Props = {
  data: string;
  isLoading: boolean;
  isError: boolean;
  backHandler: () => void;
  selectionHandler: (lmk: string) => void;
};

export default function AddressList({ data, isLoading, isError, backHandler, selectionHandler }: Props) {
  const [loading, setLoading] = useState<boolean>(isLoading);
  const [err, setErr] = useState<boolean>(isError);
  const [addressData, setAddressData] = useState<Array<AddressObject>>([]);

    useEffect(() => {
      if (data) {
        let parsedData = JSON.parse(data)
        setAddressData(parsedData);
      }
    }, [data]);

  return (
    <div className="border-2 h-[50vh] w-[35vw] max-w-[450px] rounded-sm border-lightGrey bg-lightGrey drop-shadow-md">
      <div className="h-[45px] w-[100%] flex items-center justify-center cursor-pointer bg-lightGreen rounded-t-sm font-bold font-logoFont">
        <BackButton 
          className="h-[35px] w-[35px] fill-black absolute left-[10px] transistion-all duration-100 hover:h-[45px] hover:w-[45px]"
          onClick={backHandler}
          />
        Select your address
      </div>
      <div className=" h-[calc(100%-45px)] overflow-y-scroll scrollbar-track-lightGrey scrollbar-thumb-rounde">
        {isLoading ? (
          <div className="w-[100%] h-[100%] flex items-center justify-center">
            Loading Addresses...
          </div>
        ) : null}
        {addressData && !isLoading
          ? addressData.map((item: AddressObject) => {
              return (
                <div
                  key={item.lmk}
                  className="h-[45px] w-[100%] pl-[10px] font- logoFont flex items-center rounded-sm cursor-pointer hover:bg-lightGreen/25"
                  onClick={(e: React.MouseEvent<HTMLDivElement>):void => {
                    selectionHandler(item.lmk)
                  }}
                >
                  {item.address}
                </div>
                
              );
            })
          : null}
          {isError ? <div className="w-[100%] h-[100%] flex items-center justify-center">
            Uh oh! Something went wrong fetching addresses
          </div> : null}
      </div>
    </div>
  );
}
