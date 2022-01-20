import React, { ReactNode, useState } from 'react';
import SearchIcon from '../assets/search-icon.svg';

type Props = {
  searchTextValue: string;
  width: string;
};

export default function SearchBar({ searchTextValue, width }: Props) {
  const [searchText, setSearchText] = useState('');

  const containerStyling = 'flex ' + width;
  return (
    <div className={containerStyling}>
      <input
        maxLength={7}
        placeholder={searchTextValue}
        className="z-0 peer placeholder-darkGrey w-[75%] outline-0 h-[55px] bg-lightGrey rounded-l-sm pl-[15px] font-logoFont font-medium border-2 border-lightGrey focus:border-l-black focus:border-t-black focus:border-b-black"
      ></input>
      <button
        type="button"
        className="z-10 h-[55px] w-[25%] relative right-[2px] rounded-r-sm bg-black text-white font-logoFont font-normal"
      >
        Search
      </button>
    </div>
  );
}
