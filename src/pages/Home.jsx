import React from "react";
import { Protected } from "../components/auth/Protected";

import { HeaderHome } from "../components/auth/homePage/HeaderHome";

export const Home = () => {
  
  return (
    <Protected>
      <>
        <HeaderHome />
      </>
    </Protected>
  );
};
