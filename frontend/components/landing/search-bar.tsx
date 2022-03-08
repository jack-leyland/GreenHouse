import React, { useState, useEffect } from 'react';
import SearchIcon from '../assets/search-icon.svg';

type Props = {
  searchTextValue: string;
  width: string;
  inputHandler: (inputValue: string) => void;
  submitHandler: () => void;
  isError: boolean;
};

export default function SearchBar({
  searchTextValue,
  width,
  isError,
  inputHandler,
  submitHandler,
}: Props) {
  const [searchText, setSearchText] = useState('');
  const [errorState, setErrorState] = useState(isError);

  useEffect(() => {
    setErrorState(isError);
  }, [isError]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setSearchText(event.target.value);
    inputHandler(event.target.value);
  };

  const containerStyling = 'flex min-w-[250px]' + width;
  const errorBorderStyling =
    'border-2 border-l-red-500 border-t-red-500 border-b-red-500 text-red-500';
  const defaultBorderStyling =
    'border-2 border-lightGrey focus:border-l-gray-900 focus:border-t-gray-900 focus:border-b-gray-900';
  return (
    <div className={containerStyling + (errorState ? ' animate-shake' : '')}>
      <input
        type="text"
        maxLength={10}
        placeholder={searchTextValue}
        value={searchText}
        onChange={(e: React.ChangeEvent<HTMLInputElement>): void =>
          handleChange(e)
        }
        onKeyPress={(e: React.KeyboardEvent<HTMLInputElement>): void => {
          if (e.key == 'Enter') {
            submitHandler();
          }
        }}
        className={
          'z-0 peer placeholder-darkGrey w-[75%] outline-0 h-[55px] rounded-l-default pl-[15px] font-logoFont font-medium bg-white rounded border border-gray-300 focus:border-lightGreen focus:ring-2 focus:ring-green-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out' +
          (errorState ? errorBorderStyling : defaultBorderStyling)
        }
      ></input>
      <button
        type="button"
        className="z-10 h-[55px] w-[25%] relative right-[2px] rounded-r-default bg-gray-900 text-white font-logoFont font-normal"
        onClick={submitHandler}
      >
        Search
      </button>
    </div>
  );
}
