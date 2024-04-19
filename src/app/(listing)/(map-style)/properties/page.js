import DefaultHeader from "@/components/common/DefaultHeader";

import MobileMenu from "@/components/common/mobile-menu";

import PropertyFilteringMapFive from "@/components/listing/map-style/map-v4/PropertyFilteringMapFive";

import React from "react";
import Footer from "@/components/common/default-footer";

export const metadata = {
  title: "MLS Assistant || Properties",
};

const MapV4 = () => {
  return (
    <>
      {/* Main Header Nav */}
      <DefaultHeader />
      <PropertyFilteringMapFive/>
      {/* Property Filtering */}
      {/* Start Our Footer */}
      <section className="footer-style1 pt60 pb-0">
        <Footer />
      </section>
      {/* End Our Footer */}
    </>
  );
};

export default MapV4;
