import { Fragment, useState } from 'react';
import { Dialog, Menu, Transition } from '@headlessui/react';
import {
  BsWrench,
  BsFillHouseFill,
  BsList,
  BsXLg,
  BsQuestionCircle,
  BsInfoCircle,
} from 'react-icons/bs';
import Image from 'next/image';
import PageTitle from './generic/pageTitle';
import House from '../assets/house.svg';
import Link from 'next/link';

interface props {
  children?: React.ReactChild | React.ReactChildren;
  pageTitle: string;
  subTitle: string;
  setModalContent: any;
  currentPage: string;
}

function classNames(...classes: any) {
  return classes.filter(Boolean).join(' ');
}

export default function DashboardWrapper({
  children,
  pageTitle,
  subTitle,
  setModalContent,
  currentPage,
}: props) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const navigation = [
    {
      name: 'Dashboard',
      href: '/main',
      icon: BsFillHouseFill,
      current: currentPage == 'Dashboard',
    },
    {
      name: 'Recommendations',
      href: '/recommendations',
      icon: BsWrench,
      current: currentPage == 'Recommendations',
    },
    {
      name: 'About us',
      href: '/about',
      icon: BsInfoCircle,
      current: currentPage == 'About us',
    },
    {
      name: 'FAQ',
      href: '/faq',
      icon: BsQuestionCircle,
      current: currentPage == 'FAQ',
    },
  ];
  return (
    <>
      <div>
        <Transition.Root show={sidebarOpen} as={Fragment}>
          {/* @ts-ignore */}
          <Dialog
            as="div"
            className="fixed inset-0 flex z-40 md:hidden"
            onClose={setSidebarOpen}
          >
            <Transition.Child
              as={Fragment}
              enter="transition-opacity ease-linear duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="transition-opacity ease-linear duration-300"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Dialog.Overlay className="fixed inset-0 bg-gray-600 bg-opacity-75" />
            </Transition.Child>
            <Transition.Child
              as={Fragment}
              enter="transition ease-in-out duration-300 transform"
              enterFrom="-translate-x-full"
              enterTo="translate-x-0"
              leave="transition ease-in-out duration-300 transform"
              leaveFrom="translate-x-0"
              leaveTo="-translate-x-full"
            >
              <div className="relative flex-1 flex flex-col max-w-xs w-full pt-5 pb-4 bg-gray-800">
                <Transition.Child
                  as={Fragment}
                  enter="ease-in-out duration-300"
                  enterFrom="opacity-0"
                  enterTo="opacity-100"
                  leave="ease-in-out duration-300"
                  leaveFrom="opacity-100"
                  leaveTo="opacity-0"
                >
                  <div className="absolute top-0 right-0 -mr-12 pt-2">
                    <button
                      type="button"
                      className="ml-1 flex items-center justify-center h-10 w-10 rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                      onClick={() => setSidebarOpen(false)}
                    >
                      <span className="sr-only">Close sidebar</span>
                      <BsXLg
                        className="h-6 w-6 text-white"
                        aria-hidden="true"
                      />
                    </button>
                  </div>
                </Transition.Child>
                {/* eslint-disable-next-line @next/next/link-passhref */}
                <Link href="/">
                  <div className="flex-shrink-0 flex items-center px-4 cursor-pointer">
                    <House className="h-12 w-12" />
                    <h1 className="pl-2 text-3xl text-gray-300 font-extralight">
                      GreenHouse
                    </h1>
                  </div>
                </Link>
                <div className="mt-5 flex-1 h-0 overflow-y-auto">
                  <nav className="px-2 space-y-1">
                    {navigation.map((item) => (
                      <a
                        key={item.name}
                        href={item.href}
                        className={classNames(
                          item.current
                            ? 'bg-gray-900 text-white'
                            : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                          'group flex items-center px-2 py-2 text-base font-medium rounded-md'
                        )}
                      >
                        <item.icon
                          className={classNames(
                            item.current
                              ? 'text-gray-300'
                              : 'text-gray-400 group-hover:text-gray-300',
                            'mr-4 flex-shrink-0 h-6 w-6'
                          )}
                          aria-hidden="true"
                        />
                        {item.name}
                      </a>
                    ))}
                  </nav>
                </div>
              </div>
            </Transition.Child>
            <div className="flex-shrink-0 w-14" aria-hidden="true">
              {/* Dummy element to force sidebar to shrink to fit close icon */}
            </div>
          </Dialog>
        </Transition.Root>

        {/* Static sidebar for desktop */}
        <div className="hidden md:flex md:w-64 md:flex-col md:fixed md:inset-y-0">
          {/* Sidebar component, swap this element with another sidebar if you like */}
          <div className="flex-1 flex flex-col min-h-0 bg-gray-800">
            {/* eslint-disable-next-line @next/next/link-passhref */}
            <Link href="/">
              <div className="flex items-center h-16 flex-shrink-0 px-4 bg-gray-800 cursor-pointer">
                <House className="h-12 w-12" />
                <h1 className="pl-2 text-3xl text-gray-300 font-extralight">
                  GreenHouse
                </h1>
              </div>
            </Link>
            <div className="flex-1 flex flex-col overflow-y-auto">
              <nav className="flex-1 px-2 py-4 space-y-1">
                {navigation.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    className={classNames(
                      item.current
                        ? 'bg-gray-900 text-white'
                        : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                      'group flex items-center px-2 py-2 text-sm font-medium rounded-md'
                    )}
                  >
                    <item.icon
                      className={classNames(
                        item.current
                          ? 'text-gray-300'
                          : 'text-gray-400 group-hover:text-gray-300',
                        'mr-3 flex-shrink-0 h-6 w-6'
                      )}
                      aria-hidden="true"
                    />
                    {item.name}
                  </a>
                ))}
              </nav>
            </div>
          </div>
        </div>
        <div className="md:pl-64 flex flex-col">
          <div className="sticky top-0 z-10 flex-shrink-0 flex h-16 bg-white shadow">
            <button
              type="button"
              className="px-4 border-r border-gray-200 text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500 md:hidden"
              onClick={() => setSidebarOpen(true)}
            >
              <span className="sr-only">Open sidebar</span>
              <BsList className="h-6 w-6" aria-hidden="true" />
            </button>
            <PageTitle
              title={pageTitle}
              subtitle={subTitle}
              onClick={() => setModalContent('address')}
            />
          </div>

          <section className="flex-1">
            <div className="py-2">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
                {children}
              </div>
            </div>
          </section>
        </div>
      </div>
    </>
  );
}
