import React, { ReactNode, useState } from 'react';
import SearchIcon from '../assets/search-icon.svg';

type Props = {
  searchTextValue: string;
};

export default function SearchBar({ searchTextValue }: Props) {
  const [searchText, setSearchText] = useState('');

  //what to do when placeholder overflows? Pop prompt underneath
  return (
    <div className="relative w-[30vw] h-[50px] border-2 border-darkGrey rounded-md left-[20vw] top-[20vh] flex focus-within:border-black">
      <input
        maxLength={6}
        placeholder={searchTextValue}
        className="peer order-last textGrey pl-[1%] outline-0 w-[calc(100%-36px)] rounded-md font-searchTextFont text-landingSearch"
      ></input>
      <SearchIcon className="w-[35px] pl-[1%] stroke-2 stroke-darkGrey peer-focus:stroke-black" />
    </div>
  );
}
