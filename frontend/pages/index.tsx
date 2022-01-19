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
    <div>
      <Logo className="pt-[5vh] block m-auto w-[45vw]" />
      <Leaf className="absolute bottom-[0] right-[calc(0%-4.5vw)] w-[35vw]" />
      <SearchBar
        searchTextValue={'Enter your postcode to see how you compare'}
      />
    </div>
  );
};

Landing.getLayout = function getLayout(page: ReactElement) {
  return <Layout title={'GreenHouse'}>{page}</Layout>;
};

export default Landing;
