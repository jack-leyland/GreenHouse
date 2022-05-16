import type { Fragment, ReactElement } from "react";
import { useState, useEffect } from "react";
import House from "../../assets/house.svg";
import Link from "next/link";
import Router from "next/router";
import { useAppContext } from "../../context/state";

export default function StaticHeader() {
  const GlobalContext = useAppContext();
  const [hasCachedLmk, setHasCachedLmk] = useState<boolean>(false);

  useEffect(() => {
    if (GlobalContext.activeLmk || localStorage.activeLmk) {
      setHasCachedLmk(true);
    }
  }, []);

  return (
    <div className="w-full flex bg-gray-800 items-center">
      <Link href="/">
        <div className="flex-shrink-0 flex items-center px-4 cursor-pointer">
          <House className="h-12 w-12 mt-2 mb-2" />
          <h1 className="pl-2 text-3xl text-white font-medium hidden sm:block">
            GreenHouse
          </h1>
        </div>
      </Link>
      {hasCachedLmk ? (
        <Link href="/main">
          <h1 className="ml-3 cursor-pointer text-l mt-4 mb-2 font-medium text-white hover:underline">
            Go to your dashboard
          </h1>
        </Link>
      ) : (
        <Link href="/">
          <h1 className="ml-3 cursor-pointer text-l mt-4 mb-2 font-medium text-white hover:underline">
            Find your report
          </h1>
        </Link>
      )}
    </div>
  );
}
