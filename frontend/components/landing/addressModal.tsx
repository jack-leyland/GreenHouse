import React, { useState, useEffect } from "react";
import BackButton from "../../assets/arrow-left.svg";
import Lottie from 'react-lottie-player';
import loadingJson from '../../assets/animations/animation/loading.json';

type AddressObject = {
  address: string;
  lmkKey: string;
};

type Props = {
  data: Array<AddressObject>;
  isLoading: boolean;
  isError: boolean;
  backHandler: () => void;
  selectionHandler: (lmk: string) => void;
};

export default function AddressList({
  data,
  isLoading,
  isError,
  backHandler,
  selectionHandler,
}: Props) {
  const [loading, setLoading] = useState<boolean>(isLoading);
  const [err, setErr] = useState<boolean>(isError);
  const [addressData, setAddressData] = useState<Array<AddressObject>>([]);

  useEffect(() => {
    setLoading(isLoading);
  }, [isLoading]);

  useEffect(() => {
    setErr(isError);
  }, [isError]);

  useEffect(() => {
    if (data) {
      setAddressData(data);
    }
  }, [data]);

  return (
    <div className="h-[50vh] w-[35vw] max-w-[450px] rounded-default border-lightGrey bg-lightGrey drop-shadow-md">
      <div className="h-[45px] w-[100%] flex items-center justify-center cursor-pointer bg-lightGreen rounded-t-default font-bold font-logoFont">
        <BackButton
          className="h-[35px] w-[35px] fill-black absolute left-[10px] transistion-all duration-100 hover:h-[45px] hover:w-[45px]"
          onClick={backHandler}
        />
        Select your address
      </div>
      <div className=" h-[calc(100%-45px)] overflow-y-scroll scrollbar-track-lightGrey scrollbar-thumb-rounde">
        {loading ? (
          <div className="w-[100%] h-[100%] flex flex-col items-center justify-center">
            Loading Addresses...
            <Lottie
                loop
                animationData={loadingJson}
                play
                style={{ width: 150, height: 150 }}
            />
          </div>
        ) : null}
        {addressData && !isLoading
          ? addressData.map((item: AddressObject) => {
              return (
                <div
                  key={item.lmkKey}
                  className="h-[45px] w-[100%] pl-[10px] font- logoFont flex items-center rounded-default cursor-pointer hover:bg-lightGreen/25"
                  onClick={(e: React.MouseEvent<HTMLDivElement>): void => {
                    selectionHandler(item.lmkKey);
                  }}
                >
                  {item.address}
                </div>
              );
            })
          : null}
        {err ? (
          <div className="w-[100%] h-[100%] flex items-center justify-center text-center">
            Uh oh! Something went wrong fetching addresses
          </div>
        ) : null}
      </div>
    </div>
  );
}
