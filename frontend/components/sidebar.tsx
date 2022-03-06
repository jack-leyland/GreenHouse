import React from 'react';
import House from '../assets/house.svg';
import { BsWrench, BsFillHouseFill } from 'react-icons/bs';
import SidebarItem from './sidebarItem';
import Link from 'next/link';

export default function Sidebar() {
  return (
    <div className="flex flex-row min-h-screen text-gray-600 bg-gray-100">
      <div className="flex flex-col w-32 flex-shrink-0">
        <div className="flex-shrink-0 py-4 flex flex-row items-center justify-between">
          <nav className="flex-grow block pb-0 overflow-y-auto">
            <div className="min-w-[64px] min-h-[64px] pt-2 pb-6 px-6 mt-2">
              <Link href="/">
                <a>
                  <House />
                </a>
              </Link>
            </div>
            <SidebarItem
              label={'Overview'}
              link={'/main'}
              icon={<BsFillHouseFill size={30} />}
            />
            <SidebarItem
              label={'Recommendations'}
              link={'/recommendations'}
              icon={<BsWrench size={30} />}
            />
          </nav>
        </div>
      </div>
    </div>
  );
}
