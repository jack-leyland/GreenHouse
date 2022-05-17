import React, { useState, useEffect } from "react";
import BackButton from "../../assets/arrow-left.svg";
import Lottie from "react-lottie-player";
import loadingJson from "../../assets/animations/animation/loading.json";
import SearchIcon from "../../assets/search-icon.svg";

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
  const [filteredData, setFilteredData] = useState<Array<AddressObject>>([]);
  const [showSearchBar, setShowSearchBar] = useState<Boolean>(false);
  const [searchBoxText, setSearchBoxText] = useState<string>("");

  useEffect(() => {
    setLoading(isLoading);
  }, [isLoading]);

  useEffect(() => {
    setErr(isError);
  }, [isError]);

  useEffect(() => {
    if (data) {
      setAddressData(data);
      setFilteredData(data);
    }
  }, [data]);

  const handleSearchChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    setSearchBoxText(event.target.value);
  };

  useEffect(() => {
    if (searchBoxText == "") {
      setFilteredData(addressData);
      return;
    }
    let filtered = addressData.filter((obj) => {
      let stripped_address = obj.address.toLowerCase().replace(/ /g, "");
      let stripped_search = searchBoxText.toLowerCase().replace(/ /g, "");
      return stripped_address.includes(stripped_search);
    });
    setFilteredData(filtered);
  }, [searchBoxText]);

  return (
    <div className="relative h-[50vh] w-[35vw] max-w-[450px] min-w-[250px] rounded-default border-lightGrey bg-gray-50 drop-shadow-md">
      <div className="h-[45px] w-[100%] flex items-center justify-center cursor-pointer bg-lightGreen rounded-t-default font-semibold font-logoFont">
        <BackButton
          className="h-8 w-8 fill-gray-900 absolute left-[10px] transition-all duration-100 hover:h-[45px] hover:w-[45px]"
          onClick={backHandler}
        />
        Select your address
      </div>
      <SearchIcon
        className="h-8 w-8 cursor-pointer stroke-2 stroke-gray-900 absolute right-[10px] top-[5px] transition-all duration-100 hover:h-[40px] hover:w-[40px]"
        onClick={() => setShowSearchBar(!showSearchBar)}
      />
      {showSearchBar ? (
        <input
          className="h-[45px] w-[100%] pl-[10px] font-logoFont border-b-2 text-gray-900 transition-all duration-100 outline-none"
          placeholder="Search for your address"
          value={searchBoxText}
          onChange={handleSearchChange}
        ></input>
      ) : null}
      <div
        className={
          "h-[calc(100%-45px)] overflow-y-scroll scrollbar-track-lightGrey scrollbar-thumb-rounded " +
          (showSearchBar ? "h-[calc(100%-90px)]" : "h-[calc(100%-45px)]")
        }
      >
        {loading ? (
          <div className="w-[100%] h-[100%] flex flex-col text-gray-900 items-center justify-center">
            Loading Addresses...
            <Lottie
              loop
              animationData={loadingJson}
              play
              style={{ width: 150, height: 150 }}
            />
          </div>
        ) : null}
        {filteredData && !isLoading
          ? filteredData.map((item: AddressObject) => {
              return (
                <div
                  key={item.lmkKey}
                  className="h-[45px] w-[100%] pl-[10px] font-logoFont flex items-center rounded-default cursor-pointer hover:bg-lightGreen/25"
                  onClick={(e: React.MouseEvent<HTMLDivElement>): void => {
                    selectionHandler(item.lmkKey);
                  }}
                >
                  {item.address
                    .split(" ")
                    .map(
                      (word: string) =>
                        word[0].toUpperCase() +
                        word.slice(1).toLowerCase() +
                        " "
                    )}
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
