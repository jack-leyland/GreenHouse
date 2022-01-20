import type { ReactElement } from 'react';
import Router from 'next/router';
import Layout from '../components/layout';
import { gql, useQuery } from '@apollo/client';
import Logo from '../assets/logo.svg';
import Leaf from '../assets/leaf.svg';
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
    <div className="absolute top-[25vh] w-full text-black font-logoFont font-black text-[6rem] text-center tracking-tight">GreenHouse</div>
    <div className='absolute top-[calc(50vh-7.5vh-27.5px)] w-full flex justify-center'>
      <SearchBar
        searchTextValue={'Search by Postcode'}
      />
    </div>
    </>
  );
};

Landing.getLayout = function getLayout(page: ReactElement) {
  return <Layout title={'GreenHouse'}>{page}</Layout>;
};

export default Landing;
