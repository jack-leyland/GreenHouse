import type { ReactElement } from 'react';
import Router from 'next/router';
import Layout from '../components/layout';
import { gql, useQuery } from '@apollo/client';
//import SemiCircle from '../assets/semi-circle.svg';
import Circle from '../assets/circle.svg';
import House from '../assets/house.svg';
import SearchBar from '../components/search-bar';

// test query
const GET_ADDRESSES = gql`
  {
    address(name: "SW50LA")
  }
`;

const Landing = () => {
  return (
    <>
      <div className="w-full h-[100vh] mt-[calc(50vh-199px-7.5vh)] flex-col content-center ">
        <div className="text-black font-logoFont font-black text-[6rem] text-center tracking-tight">
          GreenHouse
        </div>
        <div className="flex justify-center">
          <SearchBar
            searchTextValue={'Search by Postcode'}
            width={'w-[30vw] max-w-[325px]'}
          />
        </div>
      </div>
      <House className="absolute z-10 left-[calc(50vw-75px)] top-[65vh] w-[150px] h-[150px]" />
      <Circle className="absolute top-[55vh] left-[calc(50%-40vw)] w-[80vw] fill-lightGreen" />
    </>
  );
};

Landing.getLayout = function getLayout(page: ReactElement) {
  return <Layout title={'GreenHouse'}>{page}</Layout>;
};

export default Landing;
