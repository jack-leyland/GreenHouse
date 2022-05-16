import React from "react";
import { Fragment } from 'react'
import { Menu, Transition } from '@headlessui/react'
import {IoIosArrowDropdown} from 'react-icons/io'

interface props {
  title: string;
  subtitle?: string;
  onClick?: React.MouseEventHandler;
  analysis?: boolean;
}

export default function PageTitle({ title, subtitle, onClick, analysis }: props) {
  return (
    <>
      <div className="px-2 py-8 flex h-full w-full">
        <div className="w-full flex items-center flex-row justify-between">
        <div className="flex items-center gap-4 text-xs md:text-base pl-6 text-gray-900 font-semibold">
            {
              analysis ? (
                <>
                <h1 className="text-4xl py-2">Cambridge</h1>
                  <Menu as="div" className="relative inline-block text-left w-20">
                        <div>
                          <Menu.Button className="flex items-center" >
                          <IoIosArrowDropdown size={20}/>
                          </Menu.Button>
                        </div>
      
                        <Transition
                          as={Fragment}
                          enter="transition ease-out duration-100"
                          enterFrom="transform opacity-0 scale-95"
                          enterTo="transform opacity-100 scale-100"
                          leave="transition ease-in duration-75"
                          leaveFrom="transform opacity-100 scale-100"
                          leaveTo="transform opacity-0 scale-95"
                        >
                          <Menu.Items className="origin-top-left z-10 absolute left-0 mt-2 w-36 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                            <div className="py-1">
                              {
                                  <Menu.Item>
                                    {({ active }) => (
                                      <a
                                        className={
                                          active ? 'bg-gray-100 text-gray-900 block px-4 py-2 text-sm' : 'text-gray-700 block px-4 py-2 text-sm'
                                        }
                                      >
                                        Cambridge
                                      </a>
                                    )}
                                  </Menu.Item>
                              }
                            </div>
                          </Menu.Items>
                        </Transition>
                      </Menu>
                </>
              )
                :
              <h3>{subtitle}</h3>
            }
          </div>
          <div className="relative mr-6">
            {
              !analysis ? (
                <button
                  className="bg-primary overflow-hidden text-xs md:text-base flex ml-auto text-white py-1 md:px-6 px-2 focus:outline-none rounded hover:bg-opacity-100 bg-opacity-90"
                  onClick={onClick}
                >
                  More Details
                </button>
              ) :
              <h3 className="mr-6 text-4xl text-orange-400">Beta</h3>
            }
          </div>
        </div>
      </div>
    </>
  );
}
