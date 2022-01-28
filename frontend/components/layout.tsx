import React, { ReactNode } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Footer from './footer';

type Props = {
  children: ReactNode;
  footerFixed: boolean;
  title?: string;
};

// Must pass Layout a title prop based on page it is being applied to
// This function wraps a page in the footer and applies the Head html
export default function Layout({ children, title, footerFixed }: Props) {
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

      <main>{children}</main>

      <footer>
        <Footer fixed={footerFixed} />
      </footer>
    </>
  );
}
