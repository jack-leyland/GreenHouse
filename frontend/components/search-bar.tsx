import React, { ReactNode, useState } from 'react';
import SearchIcon from '../assets/search-icon.svg';

type Props = {
  searchTextValue: string;
};

export default function SearchBar({ searchTextValue }: Props) {
  const [searchText, setSearchText] = useState('');

  //what to do when placeholder overflows? Pop prompt underneath
  return (
    <div className="flex">
      <input
        maxLength={6}
        placeholder={searchTextValue}
        className=" placeholder-darkGrey outline-0 w-[18vw] h-[55px] bg-lightGrey rounded-l-sm pl-[15px] font-logoFont font-medium"
      ></input>
      <button type="button" className="w-[6vw] h-[55px] rounded-r-sm bg-black text-white font-logoFont font-normal">
        Search
      </button>
    </div>
  );
}
