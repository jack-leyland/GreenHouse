import { ReactElement, useState, useEffect } from 'react';

type AddressObject = {
  address: string;
  lmk: string;
};

type Props = {
  data: Array<AddressObject>;
  isLoading: boolean;
  isError: boolean;
};

export default function AddressList({ data, isLoading, isError }: Props) {
  const [loading, setLoading] = useState<boolean>(isLoading);
  const [err, setErr] = useState<boolean>(isError);
  const [addressData, setAddressData] = useState<Array<AddressObject>>(data);

  //     useEffect(() => {
  //       setLoading(isLoading);
  //     }, [isLoading]);

  //   useEffect(() => {
  //     setLoading(isError);
  //   }, [isError]);

  //   useEffect(() => {
  //     setAddressData(addressData);
  //   }, [data]);

  return (
    <div className="border-2 h-[50vh] w-[35vw] max-w-[450px] rounded-sm border-lightGrey bg-lightGrey">
      {isLoading ? (
        <div className="w-[100%] h-[100%] flex items-center justify-center">
          Loading Addresses...
        </div>
      ) : null}
      {data && !isLoading
        ? data.map((item: AddressObject) => {
            return (
              <div
                key={item.lmk}
                className="h-[45px] w-[100%] border-2 border-b-darkGrey"
              >
                {item.address}
              </div>
            );
          })
        : null}
    </div>
  );
}
