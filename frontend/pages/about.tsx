import type { ReactElement } from 'react';
import Layout from '../components/generic/layout';
import Footer from '../components/generic/footer';
import StaticHeader from '../components/generic/staticHeader';
import Link from 'next/link';

const About = () => {
  return (
    <div className="w-[80%] m-auto mt-4 overflow-y-scroll h-[80vh]">
      <h1 className="text-2xl font-medium text-gray-800">About us</h1>
      <br />
      <p>
        GreenHouse was created to demystify the Energy Performance Certificate
        and help educate new and existing domestic homeowners, utilising the
        latest modern technology stack and public API access to impactfully
        improve the user experience. <br />
        <br /> We’ve also created helpful neighbourhood metrics to benchmark how
        your property compares to others in your area and help frame your
        understanding of otherwise potentially esoteric figures.
        <br /> <br /> In addition, our recommendation page provides an open
        platform for you to report details of any improvements you’ve recently
        made to your property, and interact with other homeowners like you to
        get an up-to-date view on the latest costs.
        <br /> <br />
        To learn more about EPC certificates, check out our{' '}
        <Link href="/faq">
          <a className=" underline text-blue-600 hover:text-blue-800 visited:text-purple-600">
            FAQ
          </a>
        </Link>
      </p>
      <br />
      <h1 className="text-2xl font-medium text-gray-800">
        The team behind GreenHouse
      </h1>
      <br />
      <p>
        GreenHouse was created by 6 Imperial College London students as part of
        the MSc Computing Group Project in the 2021-2022 Cohort. Links to their
        profiles are listed below: <br /> <br />
        Josh Cheng <br />
        Jarryd Cheso <br />
        Gen Hall <br />
        Jack Leyland <br />
        Jack Solomon <br />
        Will Thomson <br /> <br /> Contact us at g21mscproj10@gmail.com
      </p>
    </div>
  );
};

About.getLayout = function getLayout(page: ReactElement) {
  return (
    <Layout title={'GreenHouse | About us'}>
      <StaticHeader />
      {page}
      <Footer />
    </Layout>
  );
};

export default About;
