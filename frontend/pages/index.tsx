import { ReactElement, useEffect, useState } from 'react';
import Router from 'next/router';
import Layout from '../components/layout';
import { gql, useLazyQuery } from '@apollo/client';
import Circle from '../assets/circle.svg';
import House from '../assets/house.svg';
import SearchBar from '../components/search-bar';
import AddressModal from '../components/address-list';

const GET_ADDRESSES = gql`
  query Address($queryFormattedPostcode: String!) {
    address(name: $queryFormattedPostcode)
  }
`;

const formatPostcode = (postcode: string): string => {
  let strippedPostcode = postcode.replace(/\s+/g, '');
  if (strippedPostcode.length < 5 || strippedPostcode.length > 7) return '';
  let arr = [...strippedPostcode];
  if (strippedPostcode.length == 5) {
    arr.splice(2, 0, ' ');
  } else if (strippedPostcode.length == 6) {
    arr.splice(3, 0, ' ');
  } else if (strippedPostcode.length == 7) {
    arr.splice(4, 0, ' ');
  }
  let formatted = arr.join('');
  return formatted;
};

const isValidPostcode = (postcode: string): boolean => {
  // allows some non-real postcodes: https://stackoverflow.com/questions/164979/regex-for-matching-uk-postcodes
  let formatted = formatPostcode(postcode);
  if (!formatted) return false;
  let postcodeRegex = new RegExp(
    '^([Gg][Ii][Rr] 0[Aa]{2})|((([A-Za-z][0-9]{1,2})|' +
      '(([A-Za-z][A-Ha-hJ-Yj-y][0-9]{1,2})|(([A-Za-z][0-9][A-Za-z])|([A-Za-z][A-Ha-hJ-Yj-y]' +
      '[0-9]?[A-Za-z])))) [0-9][A-Za-z]{2})$'
  );
  return postcodeRegex.test(formatted);
};

const Landing = () => {
  const [searchBoxText, setSearchBoxText] = useState<string>('');
  const [isInputError, setIsInputError] = useState<boolean>(false);
  const [isQueryError, setIsQueryError] = useState<boolean>(false);
  const [loadAddresses, { called, loading, error, data }] = useLazyQuery(
    GET_ADDRESSES,
    {
      fetchPolicy: 'no-cache',
    }
  );
  const [activeAddressModal, setActiveAddressModal] = useState<boolean>(false);

  const handleSubmit = (): void => {
    if (!isValidPostcode(searchBoxText)) {
      setIsInputError(true);
    } else {
      let formatted = formatPostcode(searchBoxText);
      let queryFormattedPostcode = formatted.replace(/\s+/g, '');
      setIsInputError(false);
      loadAddresses({ variables: { queryFormattedPostcode } });
      setActiveAddressModal(true);
    }
  };

  const handleSearchInput = (inputValue: string) => {
    setSearchBoxText(inputValue);
    if (!inputValue) setIsInputError(false);
  };

  //TODO:
  // Handle Loading State
  // How to deal with query errors?
  // Make Address component
  if (error) console.log(error);
  console.log(data);
  return (
    <>
      <div
        className={
          'w-full h-[100vh] flex-col content-center transistion-all duration-500 ' +
          (activeAddressModal ? 'mt-[2vh]' : 'mt-[calc(50vh-199px-7.5vh)]')
        }
      >
        <div className="text-black font-logoFont font-black text-[6rem] text-center tracking-tight">
          GreenHouse
        </div>
        <div className="flex justify-center">
          {activeAddressModal ? null : (
            <SearchBar
              searchTextValue={'Search by Postcode'}
              width={'w-[30vw] max-w-[325px]'}
              inputHandler={handleSearchInput}
              submitHandler={handleSubmit}
              isError={isInputError}
            />
          )}
          {activeAddressModal ? (
            <AddressModal
              isLoading={loading}
              isError={isQueryError}
              data={data?.address}
            />
          ) : null}
        </div>
        {isInputError ? (
          <div className="w-full flex justify-center mt-[2px] text-red-500 font-logoFont">
            Please enter a valid UK Postcode
          </div>
        ) : null}
      </div>
      {/* <House className="absolute z-10 left-[calc(50vw-75px)] top-[65vh] w-[150px] h-[150px]" /> */}
      <Circle
        className={
          'absolute top left-[calc(50%-40vw)] w-[80vw] fill-lightGreen transition-all duration-500 ' +
          (activeAddressModal ? 'top-[75vh]' : 'top-[55vh]')
        }
      />
    </>
  );
};

Landing.getLayout = function getLayout(page: ReactElement) {
  return <Layout title={'GreenHouse'}>{page}</Layout>;
};

export default Landing;
