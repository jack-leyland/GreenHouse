import React, { ReactNode } from "react";
import Head from "next/head";
import Footer from "./footer";

type Props = {
  children: ReactNode;
  footerFixed: boolean;
  title?: string;
};

// Must pass Layout a title prop based on page it is being applied to
// This function wraps a page in the footer and applies the Head html
export default function Layout({ children, title }: Props) {
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta
          name="GreenHouse"
          content="Energy efficiency improvement recommendations for UK homeowners"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="h-full bg-gray-100">{children}</main>

      {/* <Footer /> */}
    </>
  );
}
