import type { ReactElement } from "react";
import Layout from "../components/generic/layout";
import Footer from "../components/generic/footer";
import StaticHeader from "../components/generic/staticHeader";
import Link from "next/link";

const FAQ = () => {
  return (
    <div className="w-[80%] m-auto mt-4 overflow-y-scroll h-[80vh]">
      <h1 className="text-3xl font-medium text-gray-800">
        Frequently Asked Questions
      </h1>
      <br />
      <h2 className="pl-2 font-medium border-l-2 border-lightGreen bg-gray-200">
        What is an Energy Performance Certificate (EPC)?
      </h2>
      <br />
      <p className="pl-2">
        An EPC is a mandatory report published about the energy and
        environmental efficiency of a property. <br /> <br />
        It aggregates a detailed assessment of various characteristics of the
        property into an overall rating on a scale of A – G (A being the best
        and G the worst rating). This rating is also used to guide some of the
        latest environmental regulation from the government. <br />
        <br />
        Besides this, it also provides lots of helpful metrics on your
        property’s heating, lighting and energy costs, as well as some home
        improvement recommendations. Explore our website to find out more!{" "}
        <br />
        <br />
        <Link href="/">
          <a className=" underline text-blue-600 hover:text-blue-800 visited:text-purple-600">
            Find your report.
          </a>
        </Link>
      </p>
      <br />
      <h2 className="pl-2 font-medium border-l-2 border-lightGreen bg-gray-200">
        When do I need to get a new EPC?
      </h2>
      <br />
      <p className="pl-2">
        You’ll need to show a valid EPC whenever you build, sell or rent a
        property. However, once you have one, they’re valid for 10 years and can
        be used multiple times.
        <br /> <br />
        When your EPC report expires, it is not an automatic requirement to get
        it renewed until there is a catalyst event (i.e. you market your
        property for a sale or you wish to let your property to a new tenant).
      </p>
      <br />
      <h2 className="pl-2 font-medium border-l-2 border-lightGreen bg-gray-200">
        How do I get a new EPC?
      </h2>
      <br />
      <p className="pl-2">
        To get a new EPC, you need to get assessed by a accredited domestic
        energy assessor, which can be sourced through the government’s search
        tool{" "}
        <Link href="https://getting-new-energy-certificate.service.gov.uk/find-an-assessor/type-of-property">
          <a className=" underline text-blue-600 hover:text-blue-800 visited:text-purple-600">
            here.
          </a>
        </Link>
        <br /> <br />
        The assessment shouldn’t take more than 30-40 minutes.
        <br /> <br />
        Costs are variable and dependent on the size and characteristics of your
        property, but prices start at around £60.
      </p>
      <br />
      <h2 className="pl-2 font-medium border-l-2 border-lightGreen bg-gray-200">
        What if I don’t have a valid EPC report when asked?
      </h2>
      <br />
      <p className="pl-2">
        The current penalty is calculated based on a formula, set within the
        range of £500 - £5,000. This value is expected to increase to £30,000 by
        2025.
      </p>
      <br />
      <h2 className="pl-2 font-medium border-l-2 border-lightGreen bg-gray-200">
        What are the latest regulation for EPCs?
      </h2>
      <br />
      <p className="pl-2">
        <span className="font-bold">1st April 2018: </span>Minimum Energy
        Efficiency Standards (MEES) come into place stating that all properties
        being let or sold required an energy efficiency rating of E or above
        1st.
        <br /> <br />
        <span className="font-bold">April 2020:</span> MEES now applies to all
        tenancies – your property cannot be legally let beyond this date if its
        rating is below ‘E’. <br /> <br />
        <span className="font-bold">Dec 2020: </span> Government proposal that
        all rental properties will need to have a rating of ‘C’ or above by
        2025.
      </p>
    </div>
  );
};

FAQ.getLayout = function getLayout(page: ReactElement) {
  return (
    <Layout title={"GreenHouse | FAQ"}>
      <StaticHeader />
      {page}
      <Footer />
    </Layout>
  );
};

export default FAQ;
