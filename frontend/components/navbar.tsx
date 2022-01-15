import React from "react";
import Link from 'next/link';

export default function Navbar() {
    return (
        <div className="w-screen h-[70px] flex items-center border-2 border-gray-300">
            <span className="ml-[25px] text-3xl text-green-400 font-extrabold">Great App Name Inc.</span>
            <Link href="/">
                <a className="ml-[25px] text-blue-600 pt-[10px]">Go back to landing</a>
            </Link>
        </div>
    )
}