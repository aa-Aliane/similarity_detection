import React from "react";
import { useLayout } from "../store/LayoutState";

// components
import Nav from "../components/Nav";
import Filters from "../components/Filters";
import Interface from "./Interface";
import Results from "./Results";
import About from "./About";

const Home = () => {
  const current_layout = useLayout((state) => state.current_layout);
  return (
    <div>
      <Nav />
      <main>
        {(current_layout === "interface" || current_layout === "results") && (
          <Filters />
        )}
        {current_layout === "interface" && <Interface />}
        {current_layout === "results" && <Results />}
        {current_layout === "about" && <About />}
      </main>
    </div>
  );
};

export default Home;
